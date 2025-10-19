# app/routers/recuperacion.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
import secrets, datetime

router = APIRouter(prefix="/recuperacion", tags=["Recuperacion"])

@router.post("/generar/{documento}")
def generar_token(documento:str, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.Documento==documento).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    token = secrets.token_urlsafe(32)
    expiracion = datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    rec = models.RecuperacionContrasena(IDUsuario=user.ID, Token=token, FechaExpiracion=expiracion)
    db.add(rec)
    db.commit()
    # Aquí deberías enviar el token por correo (no implementado)
    return {"mensaje":"Token generado", "token": token}
