from pydantic import BaseModel
# Mainly used for recieving inputs from users and converting them to database models

class Item(BaseModel):
    name: str
    quantity: int
    location: str
    