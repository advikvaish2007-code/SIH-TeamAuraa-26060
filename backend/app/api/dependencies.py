from typing import Generator
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db

def get_db_session() -> Generator:
    yield from get_db()
