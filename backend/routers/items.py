from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.schemas import Item
from typing import Optional
from backend.database import SessionLocal, get_db
from backend.services import crud

router = APIRouter()



"""
    Fetches the properties from the user input and create a new item
    Args: 
        Item: the Item class, for more info on what's inside, please see app/schemas.py 
    Returns: the created item
"""
@router.post("/items")
def create_item(item: Item, db: Session = Depends(get_db)):
    res = crud.create_item(db, item)
    if res:
        return res
    else:
        return {"error": "Item Already Exists"}    
    

"""
    Fetch the list of item
    Args: 
        - name: The name of the item
    Returns: Either the entire inventory or the searched item
"""
@router.get("/items")
def get_item(name: Optional[str] = None, page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    if name is None:
        return crud.get_items(db, page, limit)
    return crud.get_item_name(db, name, page, limit)

"""
    Fetch the list of item that are low on stock in the inventory
    Args: None
    Returns: items that are low on stock (Quantity < 3)
"""
@router.get("/items/low-stock")
def get_low_stock(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_low_stock_item(db, page, limit)


"""
    Fetch the item from the database based on the item id
    Args: 
        item_id: The id of the item
    Returns: the Item TODO
"""
@router.get("/items/{item_id}")
def get_itemid(item_id: int, db: Session = Depends(get_db)):
    return crud.get_item(db, item_id)




"""
    Fetches item_id and the edited Item class and update it to the database
    Args: 
        item_id: The id of the item
        Item: the Item class, for more info on what's inside, please see app/schemas.py 
    Returns: the updated item
"""
@router.put("/items/{item_id}")
def edit_item(item_id: int, item: Item, db: Session = Depends(get_db)):
    return crud.update_item(db, item_id, item)

"""
    Fetches item_id deletes the item from the database
    Args: 
        item_id: The id of the item
    Returns: Message indicating the deletion was successful
"""
@router.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    return crud.delete_item(db, item_id)


