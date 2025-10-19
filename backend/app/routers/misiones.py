# app/routers/misiones.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/misiones", tags=["Misiones"])

@router.get("/")
def listar_misiones(db: Session = Depends(get_db)):
    return db.query(models.Mision).all()

@router.post("/")
def crear_mision(mision: schemas.MisionSchema, db: Session = Depends(get_db)):
    nueva = models.Mision(**mision.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return {"mensaje": "Misión creada", "mision": nueva}

@router.post("/asignar/{mision_id}/{usuario_id}")
def asignar_mision(mision_id: int, usuario_id: int, db: Session = Depends(get_db)):
    # insertar progreso si no existe
    existing = db.query(models.ProgresoUsuario).filter(
        models.ProgresoUsuario.UsuarioID == usuario_id,
        models.ProgresoUsuario.MisionID == mision_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Misión ya asignada")
    prog = models.ProgresoUsuario(Estado="asignada", PorcentajeCompletado=0, UsuarioID=usuario_id, MisionID=mision_id)
    db.add(prog)
    db.commit()
    db.refresh(prog)
    return {"mensaje":"Misión asignada","progreso":prog}

@router.post("/completar/{progreso_id}")
def completar_mision(progreso_id:int, db: Session = Depends(get_db)):
    prog = db.query(models.ProgresoUsuario).filter(models.ProgresoUsuario.ID==progreso_id).first()
    if not prog:
        raise HTTPException(status_code=404, detail="Progreso no encontrado")
    prog.Estado = "completada"
    prog.PorcentajeCompletado = 100
    db.commit()
    # actualizar puntaje del usuario si quieres:
    mision = db.query(models.Mision).filter(models.Mision.ID==prog.MisionID).first()
    user = db.query(models.Usuario).filter(models.Usuario.ID==prog.UsuarioID).first()
    if mision and user:
        user.PuntajeCrediticio = (user.PuntajeCrediticio or 0) + (mision.RecompensaPuntos or 0)
        db.commit()
    return {"mensaje":"Misión completada", "progreso":prog}

