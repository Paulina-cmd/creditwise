# app/routers/progreso.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/progresos", tags=["Progresos"])

@router.get("/usuario/{usuario_id}")
def obtener_progreso_usuario(usuario_id:int, db: Session = Depends(get_db)):
    return db.query(models.ProgresoUsuario).filter(models.ProgresoUsuario.UsuarioID==usuario_id).all()

@router.put("/{progreso_id}")
def actualizar_progreso(progreso_id:int, payload: schemas.ProgresoSchema, db: Session = Depends(get_db)):
    prog = db.query(models.ProgresoUsuario).filter(models.ProgresoUsuario.ID==progreso_id).first()
    if not prog:
        raise HTTPException(status_code=404, detail="Progreso no encontrado")
    prog.Estado = payload.Estado
    prog.PorcentajeCompletado = payload.PorcentajeCompletado
    db.commit()
    return {"mensaje":"Progreso actualizado","progreso":prog}

