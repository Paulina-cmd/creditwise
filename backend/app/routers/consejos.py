# app/routers/consejos.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter(prefix="/consejos", tags=["Consejos"])

@router.get("/recomendado/{usuario_id}")
def consejos_recomendados(usuario_id:int, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.ID==usuario_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    puntaje = user.PuntajeCrediticio or 0
    # regla simple: bajo, medio, alto
    if puntaje < 400:
        nivel = "bajo"
        consejos = db.query(models.ConsejoCrediticio).filter(models.ConsejoCrediticio.ID>0).limit(5).all()
    elif puntaje < 700:
        nivel = "medio"
        consejos = db.query(models.ConsejoCrediticio).all()[:5]
    else:
        nivel = "alto"
        consejos = db.query(models.ConsejoCrediticio).order_by(models.ConsejoCrediticio.ID.desc()).limit(5).all()
    return {"nivel":nivel, "consejos":consejos}
