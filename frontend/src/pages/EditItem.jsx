import React, { useEffect, useState} from 'react';
import ItemForm from '../components/ItemForm';
import { useNavigate, useParams} from 'react-router-dom';


const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const EditItem = () => {
    const nav = useNavigate();
    const [name, setName] = useState("Name");
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("Location");
    const [error, setError] = useState(<h4 className="hidden">ERROR</h4>);
    const { itemId } = useParams();

    useEffect(() => {
        const fetchItems = async () => {
            try{
                let response = await fetch(`${apiUrl}/items/${itemId}`, {
                    method: 'GET',
                });
                if(!response.ok){
                    const err = await response.json();
                    throw err;
                }
                const data = await response.json();

                setName(data.name);
                setQuantity(data.quantity);
                setLocation(data.location); 

                
            }
            catch(err){
                setError(err.message);
            }
        };

        fetchItems();
        
    }, [itemId]);


    const editItem = async () => {
        try{
             let response = await fetch(`${apiUrl}/items/${itemId}`, {
                method: "PUT",

                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    quantity: quantity,
                    location: location,
                }),
            });
            if(!response.ok){
                    const err = await response.json();
                    throw err;
                }
            const data = await response.json();

            
            nav(`/items/${data.id}`);
        }
        catch(err){
            setError(err.message);
        }

    }

    return (   
        <div className='CreateContainer'>
            <ItemForm
                name={name}
                setName={setName}
                quantity={quantity}
                setQuantity={setQuantity}
                location={location}
                setLocation={setLocation}
                onSubmit={editItem}
                buttonText="Edit Item"
            />

        </div>
    )
};

export default EditItem;