import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemTable.css';


const ItemTable = ( {items, selectedItems, setSelectedItems} ) => {
    const nav = useNavigate();
    const toggleSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(
                selectedItems.filter(itemId => itemId !== id)
            );
        } else {
            setSelectedItems([
                ...selectedItems,
                id
            ]);
        }
    };
    
    return (
        <table className='ItemTable'>
            <thead>
                <tr className='ItemTableHeader'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Select</th>
                </tr>
            </thead>
            <tbody className='ItemTableBody'>
                {items.map((item) => (
                <tr key={item.id}
                    onClick={() => nav(`/items/${item.id}`)}
                    style={{ cursor: "pointer"}}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.location}</td>
                        <td onClick={(e) => e.stopPropagation()}>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => toggleSelection(item.id)}
                            />
                        </td>
                </tr> 
                ))}
            </tbody>
        </table>
    )
}

export default ItemTable;