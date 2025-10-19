# app/routers/evaluaciones.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/evaluaciones", tags=["Evaluaciones"])

@router.get("/")
def listar_evaluaciones(db: Session = Depends(get_db)):
    return db.query(models.Evaluacion).all()

@router.post("/")
def crear_evaluacion(e: schemas.EvaluacionSchema, db: Session = Depends(get_db)):
    nueva = models.Evaluacion(**e.dict())
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return {"mensaje":"Evaluación creada","evaluacion":nueva}

