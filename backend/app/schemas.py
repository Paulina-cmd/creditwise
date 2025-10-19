# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UsuarioBase(BaseModel):
    Nombre: str
    Documento: str

class UsuarioCreate(UsuarioBase):
    Contrasena: str

class UsuarioOut(UsuarioBase):
    ID: int
    PuntajeCrediticio: Optional[float]
    NivelProgreso: Optional[int]
    creado_en: datetime
    class Config:
        orm_mode = True

class LoginData(BaseModel):
    Documento: str
    Contrasena: str

class MisionSchema(BaseModel):
    Titulo: str
    Descripcion: str
    Dificultad: str
    RecompensaPuntos: int
    Documento: Optional[str] = None
    class Config:
        orm_mode = True

class ProgresoSchema(BaseModel):
    Estado: str
    PorcentajeCompletado: float
    UsuarioID: int
    MisionID: int
    class Config:
        orm_mode = True

class EvaluacionSchema(BaseModel):
    Tipo: str
    Resultado: str
    PuntajeObtenido: float
    Feedback: str
    Dificultad: str
    MisionID: int
    UsuarioID: Optional[int]
    class Config:
        orm_mode = True

class ActividadSchema(BaseModel):
    Titulo: str
    Contenido: str
    Categoria: str
    Dificultad: str
    MisionID: int
    class Config:
        orm_mode = True

class DolarSchema(BaseModel):
    fecha: str
    valorVenta: float
    fechaActualizacion: str
    fuente: str
    class Config:
        orm_mode = True


