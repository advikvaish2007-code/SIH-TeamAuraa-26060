import logging
from sqlalchemy.orm import Session
from app.database.database import SessionLocal, engine
from app.database.database import Base
from app.database import models
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    
    # Check if stations exist
    station_count = db.query(models.Station).count()
    if station_count == 0:
        logger.info("Seeding stations...")
        maitri = models.Station(name="Maitri", location="Schirmacher Oasis, Queen Maud Land", established="1989")
        bharati = models.Station(name="Bharati", location="Larsmann Hills, Princess Elizabeth Land", established="2012")
        db.add_all([maitri, bharati])
        db.commit()
        db.refresh(maitri)
        db.refresh(bharati)
        
        logger.info("Seeding alerts...")
        alert1 = models.Alert(
            station_id=maitri.id, title="Generator B Voltage Drop", 
            description="Voltage dropped below nominal levels for 5 minutes.",
            severity=models.AlertSeverity.WARNING, affected_system="Power",
            status=models.AlertStatus.OPEN
        )
        alert2 = models.Alert(
            station_id=bharati.id, title="Communications Array Misaligned", 
            description="High wind disrupted the dish alignment.",
            severity=models.AlertSeverity.CRITICAL, affected_system="Communications",
            status=models.AlertStatus.OPEN
        )
        logger.info("Seeding inventory...")
        inv1 = models.InventoryItem(
            station_id=maitri.id, item_name="Diesel Fuel", category="Fuel", 
            quantity=8000, minimum_quantity=2000, unit="L"
        )
        inv2 = models.InventoryItem(
            station_id=bharati.id, item_name="Diesel Fuel", category="Fuel", 
            quantity=5000, minimum_quantity=3000, unit="L"
        )
        db.add_all([alert1, alert2, inv1, inv2])
        db.commit()
        logger.info("Database seeded successfully.")
    else:
        logger.info("Database already seeded.")
    
    db.close()

if __name__ == "__main__":
    seed_database()
