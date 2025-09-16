from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import mysql.connector

app = FastAPI()



def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",    
        password="",     
        database="creditwise"
    )


class Usuario(BaseModel):
    Nombre: str
    Contrasena: str
    Documento: str
    PuntajeCrediticio: Optional[float] = 0
    NivelProgreso: Optional[int] = 0

class ProgresoUsuario(BaseModel):
    Estado: str
    PorcentajeCompletado: float
    UsuarioID: int
    MisionID: int

class Notificacion(BaseModel):
    UsuarioID: int
    Mensaje: str
    FechaEnvio: str
    Leida: Optional[bool] = False

class Mision(BaseModel):
    Titulo: str
    Descripcion: str
    Dificultad: str
    RecompensaPuntos: int
    Documento: Optional[str] = None

class Evaluacion(BaseModel):
    Tipo: str
    Resultado: str
    PuntajeObtenido: float
    Feedback: str
    Dificultad: str
    MisionID: int

class DolarValor(BaseModel):
    fecha: str
    valorVenta: float
    fechaActualizacion: str
    fuente: str

class Actividad(BaseModel):
    Titulo: str
    Contenido: str
    Categoria: str
    Dificultad: str
    MisionID: int


@app.post("/usuarios")
def crear_usuario(usuario: Usuario):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM usuario WHERE Documento=%s", (usuario.Documento,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    cursor.execute(
        "INSERT INTO usuario (Nombre, Contrasena, Documento, PuntajeCrediticio, NivelProgreso) VALUES (%s,%s,%s,%s,%s)",
        (usuario.Nombre, usuario.Contrasena, usuario.Documento, usuario.PuntajeCrediticio, usuario.NivelProgreso)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Usuario creado correctamente"}

@app.get("/usuarios")
def obtener_usuarios():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

@app.get("/usuarios/{id}")
def obtener_usuario(id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE ID=%s", (id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@app.put("/usuarios/{id}")
def actualizar_usuario(id: int, usuario: Usuario):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE usuario SET Nombre=%s, Contrasena=%s, Documento=%s, PuntajeCrediticio=%s, NivelProgreso=%s WHERE ID=%s",
        (usuario.Nombre, usuario.Contrasena, usuario.Documento, usuario.PuntajeCrediticio, usuario.NivelProgreso, id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Usuario actualizado"}

@app.delete("/usuarios/{id}")
def eliminar_usuario(id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuario WHERE ID=%s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Usuario eliminado"}

# ---------------- LOGIN ----------------
@app.post("/login")
def login(data: dict = Body(...)):
    documento = data.get("documento")
    contrasena = data.get("contrasena")

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE Documento=%s AND Contrasena=%s", (documento, contrasena))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # Obtener progreso
    cursor.execute("SELECT * FROM progresousuario WHERE UsuarioID=%s", (user["ID"],))
    progreso = cursor.fetchone()

    cursor.close()
    conn.close()

    return {
        "usuario": user,
        "progreso": progreso if progreso else {"PorcentajeCompletado": 0}
    }

# ---------------- REGISTER ----------------
@app.post("/register")
def register(usuario: Usuario):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # ¿Existe ya?
    cursor.execute("SELECT * FROM usuario WHERE Documento=%s", (usuario.Documento,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    # Insertar usuario nuevo
    cursor.execute(
        "INSERT INTO usuario (Nombre, Contrasena, Documento, PuntajeCrediticio, NivelProgreso) VALUES (%s,%s,%s,%s,%s)",
        (usuario.Nombre, usuario.Contrasena, usuario.Documento, 0, 0)
    )
    conn.commit()

    user_id = cursor.lastrowid

    # Crear progreso inicial en 0
    cursor.execute(
        "INSERT INTO progresousuario (Estado, PorcentajeCompletado, UsuarioID, MisionID) VALUES (%s,%s,%s,%s)",
        ("iniciado", 0, user_id, 1)
    )
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "mensaje": "Usuario registrado correctamente",
        "usuario": {
            "ID": user_id,
            "Nombre": usuario.Nombre,
            "Documento": usuario.Documento
        },
        "progreso": {"PorcentajeCompletado": 0}
    }

# ---------------- CRUD PROGRESO USUARIO ----------------
@app.post("/progresos")
def crear_progreso(progreso: ProgresoUsuario):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO progresousuario (Estado, PorcentajeCompletado, UsuarioID, MisionID) VALUES (%s,%s,%s,%s)",
        (progreso.Estado, progreso.PorcentajeCompletado, progreso.UsuarioID, progreso.MisionID)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Progreso creado"}

@app.get("/progresos")
def obtener_progresos():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM progresousuario")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

# ---------------- CRUD NOTIFICACION ----------------
@app.post("/notificaciones")
def crear_notificacion(notificacion: Notificacion):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO notificacion (UsuarioID, Mensaje, FechaEnvio, Leida) VALUES (%s,%s,%s,%s)",
        (notificacion.UsuarioID, notificacion.Mensaje, notificacion.FechaEnvio, notificacion.Leida)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Notificación creada"}

@app.get("/notificaciones")
def obtener_notificaciones():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notificacion")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

# ---------------- CRUD MISION ----------------
@app.post("/misiones")
def crear_mision(mision: Mision):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO mision (Titulo, Descripcion, Dificultad, RecompensaPuntos, Documento) VALUES (%s,%s,%s,%s,%s)",
        (mision.Titulo, mision.Descripcion, mision.Dificultad, mision.RecompensaPuntos, mision.Documento)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Misión creada"}

@app.get("/misiones")
def obtener_misiones():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM mision")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

# ---------------- CRUD EVALUACION ----------------
@app.post("/evaluaciones")
def crear_evaluacion(evaluacion: Evaluacion):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO evaluacion (Tipo, Resultado, PuntajeObtenido, Feedback, Dificultad, MisionID) VALUES (%s,%s,%s,%s,%s,%s)",
        (evaluacion.Tipo, evaluacion.Resultado, evaluacion.PuntajeObtenido, evaluacion.Feedback, evaluacion.Dificultad, evaluacion.MisionID)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Evaluación creada"}

@app.get("/evaluaciones")
def obtener_evaluaciones():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM evaluacion")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

# ---------------- CRUD DOLARVALOR ----------------
@app.post("/dolarvalor")
def crear_dolarvalor(dolar: DolarValor):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO dolarvalor (fecha, valorVenta, fechaActualizacion, fuente) VALUES (%s,%s,%s,%s)",
        (dolar.fecha, dolar.valorVenta, dolar.fechaActualizacion, dolar.fuente)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Valor dólar creado"}

@app.get("/dolarvalor")
def obtener_dolarvalores():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM dolarvalor")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

# ---------------- CRUD ACTIVIDAD ----------------
@app.post("/actividades")
def crear_actividad(actividad: Actividad):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO actividad (Titulo, Contenido, Categoria, Dificultad, MisionID) VALUES (%s,%s,%s,%s,%s)",
        (actividad.Titulo, actividad.Contenido, actividad.Categoria, actividad.Dificultad, actividad.MisionID)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"mensaje": "Actividad creada"}

@app.get("/actividades")
def obtener_actividades():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM actividad")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data
