from app.schemas import Item
from app.services import crud

PAGE = 1
LIMIT = 10

def test_create_item(db):
    """
    This test if item creation works

    After this function, the DB will look like this:
    Format: (Item ID, Item Name, Item Quantity, Item Location)
    [(1, Scissor, 10, A01)]
    """
    item = Item(name="Scissor", quantity=10, location="A01")

    created = crud.create_item(db, item)

    assert created.id == 1           # type: ignore //"# type: ignore" is
    assert created.name == "Scissor" # type: ignore // used to prevent
    assert created.quantity == 10    # type: ignore // vscode giving 
    assert created.location == "A01" # type: ignore // visual error when there's
                                     #              // supposed to be None.


def test_get_one(db):
    """
        This tests if we can get an item by inputting an ID

        After this function, the DB will look like this:
        Format: (Item ID, Item Name, Item Quantity, Item Location)
        [(1, Scissor, 10, A01)]
    """
    result = crud.get_item(db, 1)
    assert result.id == 1           # type: ignore
    assert result.name == "Scissor" # type: ignore
    assert result.quantity == 10    # type: ignore
    assert result.location == "A01" # type: ignore
    result2 = crud.get_item(db, 2)
    assert result2 == None


def test_create_item2(db):
    """
    This tests is used to create another item in the DB

    After this function, the DB will look like this:
    Format: (Item ID, Item Name, Item Quantity, Item Location)
    [(1, Scissor, 10, A01), (2, Ruler, 3, A11)]
    """
    item = Item(name="Ruler", quantity=3, location="A11")

    created = crud.create_item(db, item)

    assert created.id == 2           # type: ignore
    assert created.name == "Ruler" # type: ignore
    assert created.quantity == 3    # type: ignore
    assert created.location == "A11" # type: ignore


def test_print_all(db):
    """
    This tests is used to test if we can query all the items

    After this function, the DB will look like this:
    Format: (Item ID, Item Name, Item Quantity, Item Location)
    [(1, Scissor, 10, A01), (2, Ruler, 3, A11)]
    """
    results = crud.get_items(db, PAGE, LIMIT)
    assert len(results) == 2


def test_get_item_by_name(db):
    """
    This tests is used to test if we can query item by their name

    After this function, the DB will look like this:
    Format: (Item ID, Item Name, Item Quantity, Item Location)
    [(1, Scissor, 10, A01), (2, Ruler, 3, A11)]
    """
    result = crud.get_item_name(db, "Scissor")
    assert result.name == "Scissor"

    result2 = crud.get_item_name(db, "invalid")
    assert result2 == None


def test_update_item(db):
    """
    This tests is used to test if we can update item by inputting an id
    as well as the updated item

    After this function, the DB will look like this:
    Format: (Item ID, Item Name, Item Quantity, Item Location)
    [(1, Pen, 3, B01), (2, Ruler, 3, A11)]
    """
    update_item = Item(name="Pen", quantity=3, location="B01")

    result = crud.update_item(db, 1, update_item)
    assert result.id == 1           # type: ignore
    assert result.name == "Pen" # type: ignore
    assert result.quantity == 3    # type: ignore
    assert result.location == "B01" # type: ignore

    result2 = crud.update_item(db, 5, update_item)
    assert result2 == None


def test_get_low_stock_item(db):
    """
    This tests is used to test if we can query item that has quantity
    smaller or equal to 3

    After this function, the DB will look like this:
    Format: (Item ID, Item Name, Item Quantity, Item Location)
    [(1, Pen, 3, B01), (2, Ruler, 3, A11)]
    """
    result = crud.get_low_stock_item(db, PAGE, LIMIT)

    assert len(result) == 2


def test_delete_item(db):
    """
    This test is used to see if we can delete an item by providing an id

    After this function, the DB will look like this:
    Format: (Item ID, Item Name, Item Quantity, Item Location)
    [(2, Ruler, 3, A11)]
    """
    result = crud.delete_item(db, 1)
    assert result.id == 1 # type: ignore
    result = crud.get_item(db, 1)
    assert result == None
    result = crud.delete_item(db, 1)
    assert result == None
