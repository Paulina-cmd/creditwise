# app/routers/usuarios.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.utils import hash_password, verify_password, create_access_token
from typing import Dict

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.post("/register", response_model=schemas.UsuarioOut)
def register(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Usuario).filter(models.Usuario.Documento == usuario.Documento).first()
    if existing:
        raise HTTPException(status_code=400, detail="Usuario ya existe")
    hashed = hash_password(usuario.Contrasena)
    nuevo = models.Usuario(
        Nombre=usuario.Nombre,
        Contrasena=hashed,
        Documento=usuario.Documento
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    # crear progreso inicial
    progreso = models.ProgresoUsuario(Estado="iniciado", PorcentajeCompletado=0, UsuarioID=nuevo.ID, MisionID=1)
    db.add(progreso)
    db.commit()
    return nuevo

@router.post("/login")
def login(data: schemas.LoginData, db: Session = Depends(get_db)) -> Dict:
    user = db.query(models.Usuario).filter(models.Usuario.Documento == data.Documento).first()
    if not user or not verify_password(data.Contrasena, user.Contrasena):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    token = create_access_token({"sub": str(user.ID), "documento": user.Documento})
    # traer progreso
    progreso = db.query(models.ProgresoUsuario).filter(models.ProgresoUsuario.UsuarioID == user.ID).first()
    return {"access_token": token, "token_type": "bearer", "usuario": user, "progreso": progreso}

@router.get("/{usuario_id}", response_model=schemas.UsuarioOut)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.ID == usuario_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.put("/{usuario_id}")
def actualizar_usuario(usuario_id: int, payload: schemas.UsuarioBase, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.ID == usuario_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    user.Nombre = payload.Nombre
    user.Documento = payload.Documento
    db.commit()
    db.refresh(user)
    return {"mensaje": "Usuario actualizado", "usuario": user}





