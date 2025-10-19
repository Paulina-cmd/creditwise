# app/models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
import datetime

class Usuario(Base):
    __tablename__ = "usuario"
    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(150), nullable=False)
    Contrasena = Column(String(255), nullable=False)  # hashed
    Documento = Column(String(100), unique=True, index=True, nullable=False)
    PuntajeCrediticio = Column(Float, default=0)
    NivelProgreso = Column(Integer, default=0)
    #creado_en = Column(DateTime, default=datetime.datetime.utcnow)

class Mision(Base):
    __tablename__ = "mision"
    ID = Column(Integer, primary_key=True, index=True)
    Titulo = Column(String(200))
    Descripcion = Column(Text)
    Dificultad = Column(String(50))
    RecompensaPuntos = Column(Integer, default=0)
    Documento = Column(String(255), nullable=True)

class ProgresoUsuario(Base):
    __tablename__ = "progresousuario"
    ID = Column(Integer, primary_key=True, index=True)
    Estado = Column(String(100))
    PorcentajeCompletado = Column(Float, default=0)
    UsuarioID = Column(Integer, ForeignKey("usuario.ID"))
    MisionID = Column(Integer, ForeignKey("mision.ID"))
    creado_en = Column(DateTime, default=datetime.datetime.utcnow)

class Notificacion(Base):
    __tablename__ = "notificacion"
    ID = Column(Integer, primary_key=True, index=True)
    UsuarioID = Column(Integer, ForeignKey("usuario.ID"))
    Mensaje = Column(Text)
    FechaEnvio = Column(DateTime, default=datetime.datetime.utcnow)
    Leida = Column(Boolean, default=False)

class Evaluacion(Base):
    __tablename__ = "evaluacion"
    ID = Column(Integer, primary_key=True, index=True)
    Tipo = Column(String(100))
    Resultado = Column(Text)
    PuntajeObtenido = Column(Float)
    Feedback = Column(Text)
    Dificultad = Column(String(50))
    MisionID = Column(Integer, ForeignKey("mision.ID"))
    UsuarioID = Column(Integer, ForeignKey("usuario.ID"))
    creado_en = Column(DateTime, default=datetime.datetime.utcnow)

class DolarValor(Base):
    __tablename__ = "dolarvalor"
    ID = Column(Integer, primary_key=True, index=True)
    fecha = Column(String(50))
    valorVenta = Column(Float)
    fechaActualizacion = Column(String(50))
    fuente = Column(String(200))

class Actividad(Base):
    __tablename__ = "actividad"
    ID = Column(Integer, primary_key=True, index=True)
    Titulo = Column(String(200))
    Contenido = Column(Text)
    Categoria = Column(String(100))
    Dificultad = Column(String(50))
    MisionID = Column(Integer, ForeignKey("mision.ID"))


