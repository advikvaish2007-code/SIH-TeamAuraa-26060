from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base
import enum

class Station(Base):
    __tablename__ = "stations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    location = Column(String)
    established = Column(String)
    
    # Relationships
    personnel = relationship("Personnel", back_populates="station")
    alerts = relationship("Alert", back_populates="station")

class PersonnelStatus(str, enum.Enum):
    ON_DUTY = "ON_DUTY"
    OFF_DUTY = "OFF_DUTY"
    REST = "REST"
    MEDICAL = "MEDICAL"
    AWAY = "AWAY"

class Personnel(Base):
    __tablename__ = "personnel"
    id = Column(Integer, primary_key=True, index=True)
    station_id = Column(Integer, ForeignKey("stations.id"))
    name = Column(String)
    role = Column(String)
    department = Column(String)
    status = Column(SQLEnum(PersonnelStatus))
    current_assignment = Column(String)
    last_check_in = Column(DateTime, default=datetime.utcnow)
    contact_information = Column(String, nullable=True)
    
    station = relationship("Station", back_populates="personnel")

class AlertSeverity(str, enum.Enum):
    CRITICAL = "CRITICAL"
    WARNING = "WARNING"
    INFO = "INFO"

class AlertStatus(str, enum.Enum):
    OPEN = "OPEN"
    ACKNOWLEDGED = "ACKNOWLEDGED"
    RESOLVED = "RESOLVED"

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    station_id = Column(Integer, ForeignKey("stations.id"))
    title = Column(String)
    description = Column(String)
    severity = Column(SQLEnum(AlertSeverity))
    affected_system = Column(String)
    status = Column(SQLEnum(AlertStatus), default=AlertStatus.OPEN)
    created_at = Column(DateTime, default=datetime.utcnow)
    acknowledged_at = Column(DateTime, nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    
    station = relationship("Station", back_populates="alerts")

class InventoryItem(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    station_id = Column(Integer, ForeignKey("stations.id"))
    item_name = Column(String)
    category = Column(String)
    quantity = Column(Integer)
    minimum_quantity = Column(Integer)
    unit = Column(String)
    
    station = relationship("Station")
