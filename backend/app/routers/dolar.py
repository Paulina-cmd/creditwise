# app/routers/dolar.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
import requests
import os

router = APIRouter(prefix="/dolar", tags=["Dólar"])

@router.get("/")
def obtener_valores(db: Session = Depends(get_db)):
    return db.query(models.DolarValor).all()

@router.post("/actualizar")
def crear_valor(d: schemas.DolarSchema, db: Session = Depends(get_db)):
    nuevo = models.DolarValor(**d.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return {"mensaje":"Valor dólar creado","valor":nuevo}

