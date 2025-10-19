from fastapi import APIRouter, HTTPException
from app.database import get_connection
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/notificaciones", tags=["Notificaciones"])

class Notificacion(BaseModel):
    UsuarioID: int
    Mensaje: str
    FechaEnvio: str
    Leida: Optional[bool] = False

@router.post("/")
def crear_notificacion(notificacion: Notificacion):
    conn = get_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")

    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO notificacion (UsuarioID, Mensaje, FechaEnvio, Leida)
        VALUES (%s, %s, %s, %s)
    """, (notificacion.UsuarioID, notificacion.Mensaje, notificacion.FechaEnvio, notificacion.Leida))
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Notificación creada correctamente"}

@router.get("/")
def obtener_notificaciones():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notificacion")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data
