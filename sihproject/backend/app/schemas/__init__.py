from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List
from app.database.models import PersonnelStatus, AlertSeverity, AlertStatus

# Station Schemas
class StationBase(BaseModel):
    name: str
    location: str
    established: str

class StationCreate(StationBase):
    pass

class Station(StationBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# Alert Schemas
class AlertBase(BaseModel):
    title: str
    description: str
    severity: AlertSeverity
    affected_system: str
    status: AlertStatus = AlertStatus.OPEN

class AlertCreate(AlertBase):
    station_id: int

class AlertUpdate(BaseModel):
    status: Optional[AlertStatus] = None
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[AlertSeverity] = None
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None

class Alert(AlertBase):
    id: int
    station_id: int
    created_at: datetime
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)

# Personnel Schemas
class PersonnelBase(BaseModel):
    name: str
    role: str
    department: str
    status: PersonnelStatus
    current_assignment: str
    contact_information: Optional[str] = None

class PersonnelCreate(PersonnelBase):
    station_id: int

class Personnel(PersonnelBase):
    id: int
    station_id: int
    last_check_in: datetime
    
    model_config = ConfigDict(from_attributes=True)

class InventoryItemBase(BaseModel):
    item_name: str
    category: str
    quantity: int
    minimum_quantity: int
    unit: str

class InventoryItemUpdate(BaseModel):
    quantity: int

class InventoryItem(InventoryItemBase):
    id: int
    station_id: int
    model_config = ConfigDict(from_attributes=True)
