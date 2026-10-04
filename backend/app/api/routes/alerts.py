from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.api.dependencies import get_db_session
from app.database import models
from app.schemas import Alert, AlertCreate, AlertUpdate

router = APIRouter()

@router.get("/", response_model=List[Alert])
def read_alerts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db_session)):
    return db.query(models.Alert).offset(skip).limit(limit).all()

@router.post("/", response_model=Alert)
def create_alert(alert: AlertCreate, db: Session = Depends(get_db_session)):
    db_alert = models.Alert(**alert.model_dump())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

@router.patch("/{alert_id}", response_model=Alert)
def update_alert(alert_id: int, alert: AlertUpdate, db: Session = Depends(get_db_session)):
    db_alert = db.query(models.Alert).filter(models.Alert.id == alert_id).first()
    if not db_alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    update_data = alert.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_alert, key, value)
        
    db.commit()
    db.refresh(db_alert)
    return db_alert

@router.delete("/{alert_id}")
def delete_alert(alert_id: int, db: Session = Depends(get_db_session)):
    db_alert = db.query(models.Alert).filter(models.Alert.id == alert_id).first()
    if not db_alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    db.delete(db_alert)
    db.commit()
    return {"ok": True}
