from database import SessionLocal

try:
    db = SessionLocal()
    print("✅ Conexión a la base de datos exitosa")
except Exception as e:
    print("❌ Error al conectar:", e)
finally:
    db.close()
