from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api.dependencies import get_db_session
from app.database import models
from app.schemas import InventoryItem, InventoryItemUpdate

router = APIRouter()

@router.get("/{station_id}", response_model=List[InventoryItem])
def get_inventory(station_id: int, db: Session = Depends(get_db_session)):
    return db.query(models.InventoryItem).filter(models.InventoryItem.station_id == station_id).all()

@router.patch("/{item_id}", response_model=InventoryItem)
def update_inventory(item_id: int, item: InventoryItemUpdate, db: Session = Depends(get_db_session)):
    db_item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db_item.quantity = item.quantity
    db.commit()
    db.refresh(db_item)
    return db_item
