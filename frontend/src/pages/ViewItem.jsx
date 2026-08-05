import React, { useState, useEffect,  } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

import './ViewItem.css'

const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const ViewItem = () => {
    const { itemId } = useParams();
    const [name, setName] = useState("");
    const [error, setError] = useState(<h4 className="hidden">ERROR</h4>);
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");
    const [flag, setFlag] = useState(false);
    const nav = useNavigate();

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

    const EditPage = () => {
        nav(`/items/${itemId}/edit`);
    };

    const returnHome = () => {
        nav(`/`);
    }

    const showWarning = () => {
        setFlag(true);
    }

    const DeleteItem = async () => {
        try{
            let response = await fetch(`${apiUrl}/items/${itemId}`, {
                    method: 'DELETE',
            });
            if(!response.ok){
                const err = await response.json();
                throw err;
            }
            nav(`/`);
        }
        catch(err){
            setError(err.message);
        }
    }

    const ReturnPage = () => {
        setFlag(!flag);
    }

    return (
        <>
        {flag && (
            <div className='DeleteWarning'>
                <h3>Are you sure About Deleting</h3>
                <div className='buttonArea'>
                    <button onClick={DeleteItem}>Yes</button>
                    <button onClick={ReturnPage}>No</button>
                </div>
            </div>
        )}

        <div className="ItemContainer">
                <div className='ItemDisplay'>
                    <div className="resultRow">
                        <h3 className="resultLabel">ID:</h3>
                        <h3 className="resultResult"> {itemId}</h3>
                    </div>
                    <div className="resultRow">
                        <h3 className="resultLabel">Name:</h3>
                        <h3 className="resultResult"> {name}</h3>
                    </div>
                    <div className="resultRow">
                        <h3 className="resultLabel">Quantity:</h3>
                        <h3 className="resultResult"> {quantity}</h3>
                    </div>
                    <div className="resultRow">
                        <h3 className="resultLabel">Location:</h3>
                        <h3 className="resultResult"> {location}</h3>
                    </div>
               </div>
               <div className='ButtonDisplay'>
                <button onClick={EditPage}>Edit</button>
                <button onClick={showWarning}>Delete</button>
                <button onClick={returnHome}>Return</button>
               </div>
        </div>
        </>
    )
}

export default ViewItem;