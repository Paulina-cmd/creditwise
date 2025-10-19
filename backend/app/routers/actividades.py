# app/routers/actividades.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/actividades", tags=["Actividades"])

@router.get("/")
def listar_actividades(db: Session = Depends(get_db)):
    return db.query(models.Actividad).all()

@router.post("/")
def crear_actividad(a: schemas.ActividadSchema, db: Session = Depends(get_db)):
    nueva = models.Actividad(**a.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return {"mensaje":"Actividad creada","actividad":nueva}

