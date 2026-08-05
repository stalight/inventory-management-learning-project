import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './ItemForm.css'

const ItemForm = ({
        name,
        setName,
        quantity,
        setQuantity,
        location,
        setLocation,
        onSubmit,
        buttonText
    }) => {
        return (
            <>  
                <div className='FormRow'>
                    <h3>Name: </h3>
                    <input
                        id='formInput'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Item Name"
                    />
                </div>

                <div className='FormRow'>
                    <h3>Quantity: </h3>
                    <input
                        id='formInput'
                        type="number"
                        value={quantity !== 0 ? quantity : ""}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        placeholder="Quantity"
                    />
                </div>

                <div className='FormRow'>
                    <h3>Location: </h3>
                    <input
                        id='formInput'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                    />
                </div>
                <div className='buttonArea' id='buttonArea1'>
                    <div></div>
                    <button className='formButton' onClick={onSubmit}>
                        {buttonText}
                    </button>
                    <div></div>
                </div>

            </>
        );
};


export default ItemForm;