from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import mysql.connector
from datetime import datetime

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",    
            password="",     
            database="creditwise"
        )
        print("✅ Conexión a la base de datos exitosa")
        return connection
    except mysql.connector.Error as err:
        print(f"❌ Error de conexión a la base de datos: {err}")
        return None

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

# Endpoints de verificación
@app.get("/")
def read_root():
    return {"message": "API CreditWise funcionando correctamente"}

@app.get("/health")
def health_check():
    try:
        conn = get_connection()
        if conn and conn.is_connected():
            conn.close()
            return {"status": "healthy", "database": "connected"}
        else:
            return {"status": "unhealthy", "database": "disconnected"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}

# CRUD USUARIOS
@app.post("/usuarios")
def crear_usuario(usuario: Usuario):
    print(f"🔵 Intentando crear usuario: {usuario.Documento}")
    
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)

        # Verificar si el usuario existe
        cursor.execute("SELECT * FROM usuario WHERE Documento=%s", (usuario.Documento,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Usuario ya existe")

        # Insertar nuevo usuario
        cursor.execute(
            "INSERT INTO usuario (Nombre, Contrasena, Documento, PuntajeCrediticio, NivelProgreso) VALUES (%s, %s, %s, %s, %s)",
            (usuario.Nombre, usuario.Contrasena, usuario.Documento, usuario.PuntajeCrediticio, usuario.NivelProgreso)
        )
        conn.commit()
        user_id = cursor.lastrowid
        
        print(f"✅ Usuario creado exitosamente: ID {user_id}")
        return {
            "mensaje": "Usuario creado correctamente",
            "id": user_id,
            "nombre": usuario.Nombre
        }
        
    except mysql.connector.Error as err:
        print(f"❌ Error de MySQL: {err}")
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {err}")
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.get("/usuarios")
def obtener_usuarios():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario")
        data = cursor.fetchall()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.get("/usuarios/{id}")
def obtener_usuario(id: int):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario WHERE ID=%s", (id,))
        user = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.put("/usuarios/{id}")
def actualizar_usuario(id: int, usuario: Usuario):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE usuario SET Nombre=%s, Contrasena=%s, Documento=%s, PuntajeCrediticio=%s, NivelProgreso=%s WHERE ID=%s",
            (usuario.Nombre, usuario.Contrasena, usuario.Documento, usuario.PuntajeCrediticio, usuario.NivelProgreso, id)
        )
        conn.commit()
        return {"mensaje": "Usuario actualizado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.delete("/usuarios/{id}")
def eliminar_usuario(id: int):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor()
        cursor.execute("DELETE FROM usuario WHERE ID=%s", (id,))
        conn.commit()
        return {"mensaje": "Usuario eliminado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# LOGIN Y REGISTER
@app.post("/login")
def login(data: dict = Body(...)):
    documento = data.get("documento")
    contrasena = data.get("contrasena")

    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario WHERE Documento=%s AND Contrasena=%s", (documento, contrasena))
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=401, detail="Credenciales incorrectas")

        # Obtener progreso
        cursor.execute("SELECT * FROM progresousuario WHERE UsuarioID=%s", (user["ID"],))
        progreso = cursor.fetchone()

        return {
            "usuario": user,
            "progreso": progreso if progreso else {"PorcentajeCompletado": 0}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.post("/register")
def register(usuario: Usuario):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)

        # ¿Existe ya?
        cursor.execute("SELECT * FROM usuario WHERE Documento=%s", (usuario.Documento,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Usuario ya existe")

        # Insertar usuario nuevo
        cursor.execute(
            "INSERT INTO usuario (Nombre, Contrasena, Documento, PuntajeCrediticio, NivelProgreso) VALUES (%s, %s, %s, %s, %s)",
            (usuario.Nombre, usuario.Contrasena, usuario.Documento, 0, 0)
        )
        conn.commit()
        user_id = cursor.lastrowid

        # Crear progreso inicial en 0
        cursor.execute(
            "INSERT INTO progresousuario (Estado, PorcentajeCompletado, UsuarioID, MisionID) VALUES (%s, %s, %s, %s)",
            ("iniciado", 0, user_id, 1)
        )
        conn.commit()

        return {
            "mensaje": "Usuario registrado correctamente",
            "usuario": {
                "ID": user_id,
                "Nombre": usuario.Nombre,
                "Documento": usuario.Documento
            },
            "progreso": {"PorcentajeCompletado": 0}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# CRUD PROGRESO USUARIO
@app.post("/progresos")
def crear_progreso(progreso: ProgresoUsuario):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO progresousuario (Estado, PorcentajeCompletado, UsuarioID, MisionID) VALUES (%s, %s, %s, %s)",
            (progreso.Estado, progreso.PorcentajeCompletado, progreso.UsuarioID, progreso.MisionID)
        )
        conn.commit()
        return {"mensaje": "Progreso creado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.get("/progresos")
def obtener_progresos():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM progresousuario")
        data = cursor.fetchall()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# CRUD NOTIFICACION
@app.post("/notificaciones")
def crear_notificacion(notificacion: Notificacion):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO notificacion (UsuarioID, Mensaje, FechaEnvio, Leida) VALUES (%s, %s, %s, %s)",
            (notificacion.UsuarioID, notificacion.Mensaje, notificacion.FechaEnvio, notificacion.Leida)
        )
        conn.commit()
        return {"mensaje": "Notificación creada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.get("/notificaciones")
def obtener_notificaciones():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM notificacion")
        data = cursor.fetchall()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# CRUD MISION
@app.post("/misiones")
def crear_mision(mision: Mision):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO mision (Titulo, Descripcion, Dificultad, RecompensaPuntos, Documento) VALUES (%s, %s, %s, %s, %s)",
            (mision.Titulo, mision.Descripcion, mision.Dificultad, mision.RecompensaPuntos, mision.Documento)
        )
        conn.commit()
        return {"mensaje": "Misión creada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.get("/misiones")
def obtener_misiones():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM mision")
        data = cursor.fetchall()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# CRUD EVALUACION
@app.post("/evaluaciones")
def crear_evaluacion(evaluacion: Evaluacion):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO evaluacion (Tipo, Resultado, PuntajeObtenido, Feedback, Dificultad, MisionID) VALUES (%s, %s, %s, %s, %s, %s)",
            (evaluacion.Tipo, evaluacion.Resultado, evaluacion.PuntajeObtenido, evaluacion.Feedback, evaluacion.Dificultad, evaluacion.MisionID)
        )
        conn.commit()
        return {"mensaje": "Evaluación creada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.get("/evaluaciones")
def obtener_evaluaciones():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM evaluacion")
        data = cursor.fetchall()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# CRUD DOLARVALOR
@app.post("/dolarvalor")
def crear_dolarvalor(dolar: DolarValor):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO dolarvalor (fecha, valorVenta, fechaActualizacion, fuente) VALUES (%s, %s, %s, %s)",
            (dolar.fecha, dolar.valorVenta, dolar.fechaActualizacion, dolar.fuente)
        )
        conn.commit()
        return {"mensaje": "Valor dólar creado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.get("/dolarvalor")
def obtener_dolarvalores():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM dolarvalor")
        data = cursor.fetchall()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# CRUD ACTIVIDAD
@app.post("/actividades")
def crear_actividad(actividad: Actividad):
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO actividad (Titulo, Contenido, Categoria, Dificultad, MisionID) VALUES (%s, %s, %s, %s, %s)",
            (actividad.Titulo, actividad.Contenido, actividad.Categoria, actividad.Dificultad, actividad.MisionID)
        )
        conn.commit()
        return {"mensaje": "Actividad creada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

@app.get("/actividades")
def obtener_actividades():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        if conn is None:
            raise HTTPException(status_code=500, detail="Error de conexión a la base de datos")
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM actividad")
        data = cursor.fetchall()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
