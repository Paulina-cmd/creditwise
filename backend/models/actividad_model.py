from pydantic import BaseModel
from typing import Optional

class Actividad(BaseModel):
    ID: Optional[int] = None
    Titulo: str
    Contenido: Optional[str] = None
    Categoria: Optional[str] = None
    Dificultad: Optional[str] = None
    UsuarioID: Optional[int] = None  # 🔹 FK hacia usuario
    MisionID: Optional[int] = None   # 🔹 FK hacia mision
