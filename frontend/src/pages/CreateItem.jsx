import React, { useEffect, useState} from 'react';
import ItemForm from '../components/ItemForm';
import { useNavigate} from 'react-router-dom';



const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';


const CreateItem = () => {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");
    const [error, setError] = useState(<h4 className="hidden">ERROR</h4>);
    const createItem = async () => {
        try{
            let response = await fetch(`${apiUrl}/items`, {
                method: "POST",

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

            nav(`/items/${data.id}`)
        }
        catch(err){
            setError(err.message)
        }
    };

    return (
        <div className='CreateContainer'>
            <ItemForm
                name={name}
                setName={setName}
                quantity={quantity}
                setQuantity={setQuantity}
                location={location}
                setLocation={setLocation}
                onSubmit={createItem}
                buttonText="Create Item"
            />

        </div>
    )
    
}

export default CreateItem;