# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import usuarios, misiones, progreso, evaluaciones, actividades, consejos, dolar, recuperacion

# crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CreditWise API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(misiones.router)
app.include_router(progreso.router)
app.include_router(evaluaciones.router)
app.include_router(actividades.router)
app.include_router(consejos.router)
app.include_router(dolar.router)
app.include_router(recuperacion.router)

@app.get("/")
def root():
    return {"mensaje":"API CreditWise corriendo"}



