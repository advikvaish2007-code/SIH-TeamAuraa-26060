from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api.dependencies import get_db_session
from app.database import models
from app.schemas import Station, StationCreate

router = APIRouter()

@router.get("/", response_model=List[Station])
def read_stations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db_session)):
    stations = db.query(models.Station).offset(skip).limit(limit).all()
    return stations

@router.get("/{station_id}", response_model=Station)
def read_station(station_id: int, db: Session = Depends(get_db_session)):
    station = db.query(models.Station).filter(models.Station.id == station_id).first()
    if station is None:
        raise HTTPException(status_code=404, detail="Station not found")
    return station
