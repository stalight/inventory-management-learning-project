from fastapi import FastAPI
from backend.routers import items
from backend.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)

Base.metadata.create_all(bind=engine)
@app.get("/")
def home():
    return {"message": "Inventory API"}


