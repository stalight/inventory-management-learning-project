from sqlalchemy import Column, Integer, String
from backend.database import Base
# Mainly used for query and deleting datas

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    quantity = Column(Integer)
    location = Column(String)

    def __str__(self):
        return f"ID: {self.id}\nName: {self.name}\nQuantity: {self.quantity} \nLocation: {self.location}"