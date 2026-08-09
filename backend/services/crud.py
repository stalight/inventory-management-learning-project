from backend.schemas import Item as ItemSchema
from backend.models import Item as ItemModel
from typing import Optional
import math


def get_items(db, page, limit):
    """
    This function queries the DB and returns all items

    args:
        - db: SQLAlchemy database session.
    
    Returns:
        - list[ItemModel]: A list of all items in the database.
    """
    item = db.query(ItemModel).offset((page - 1) * limit).limit(limit).all()
    total_items = db.query(ItemModel).count()
    total_pages = math.ceil(total_items / limit)
    res = dict()
    res["items"] = item
    res["totalItems"] = total_items
    res["totalPages"] = total_pages
    return res
    


def get_item(db, item_id: int):
    """
    Query the database for an item by its ID.

    Args:
        db: SQLAlchemy database session.
        item_id: ID of the item to retrieve.

    Returns:
        ItemModel: The matching item if found.
        None: If no item with the given ID exists.
    """
    return db.query(ItemModel).filter(ItemModel.id == item_id).first()

def get_item_name(db, name: str, page: int, limit: int):
    """
    Query the database for an item by its name.

    Args:
        db: SQLAlchemy database session.
        name: name of the item to retrieve.

    Returns:
        ItemModel: The matching item if found.
        None: If no item with the given ID exists.
    """


    
    item = db.query(ItemModel).filter(ItemModel.name.ilike(f"%{name}%")).offset((page - 1) * limit).limit(limit).all()
    total_items = db.query(ItemModel).filter(ItemModel.name.ilike(f"%{name}%")).count()
    total_pages = math.ceil(total_items / limit)
    res = dict()
    res["items"] = item
    res["totalItems"] = total_items
    res["totalPages"] = total_pages

    return res
def create_item(db, item: ItemSchema):
    """
    Creates a new Item and adds it to the Database.

    Args:
        db: SQLAlchemy database session.
        item: ItemSchema, a python class that packs the data needed to build
              a ItemModel for the Database

    Returns:
        ItemModel: The created Item.
    """
    db_item = ItemModel(
        name = item.name, 
        quantity=item.quantity, 
        location=item.location
        )
    res = db.query(ItemModel).filter(ItemModel.name == item.name).first()
    if res:
        return None
    
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_item(db, item_id: int, item: ItemSchema):
    """
    Updates a database item when provided with its id and the updated information

    Args:
        db: SQLAlchemy database session.
        item_id: ID of the item to retrieve.
        item: ItemSchema, a python class that packs the data needed to build
              a ItemModel for the Database

    Returns:
        ItemModel: The updated Item.
        None: If no item with the given ID exists.
    """
    db_item = db.query(ItemModel).filter(ItemModel.id == item_id).first()

    if db_item is None:
        return None

    db_item.name = item.name
    db_item.quantity = item.quantity
    db_item.location = item.location

    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db, item_id: int):
    """
    Deletes a database item when the ID is provided

    Args:
        db: SQLAlchemy database session.
        item_id: ID of the item to retrieve.


    Returns:
        ItemModel: The updated Item.
        None: If no item with the given ID exists.
    """
    item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if item is None:
        return None

    db.delete(item)
    db.commit()
    return item

def get_low_stock_item(db, page, limit):
    """
    Query the database for all the items that have quantity lesser than or equal to 3

    Args:
        db: SQLAlchemy database session.


    Returns:
        list[ItemModel]: A list of all items in the database that have quantity lesser
                         than or equal to 3.
    """
    item = db.query(ItemModel).filter(ItemModel.quantity <= 3).offset((page - 1) * limit).limit(limit).all()
    total_items = db.query(ItemModel).filter(ItemModel.quantity <= 3).count()
    total_pages = math.ceil(total_items / limit)
    res = dict()
    res["items"] = item
    res["totalItems"] = total_items
    res["totalPages"] = total_pages
    return res
