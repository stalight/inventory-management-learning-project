
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
# Used for starting up a database and session

DATABASE_URL = "postgresql://stalight:inventory123@localhost:5432/inventory_db"

engine = create_engine(DATABASE_URL) # Creating a connection to the database so session can be ran
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine) # Session for creating calls to the database
Base = declarative_base() # Model inherit from this Base

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()