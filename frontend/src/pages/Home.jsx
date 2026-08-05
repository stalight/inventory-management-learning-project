import { useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import LimitSelector from '../components/LimitSelector';
import ItemTable from '../components/ItemTable';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import './Home.css'


const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    let nav = useNavigate();

    const [error, setError] = useState(<h4 className="hidden">ERROR</h4>);
    const [items, setItems] = useState([]);

    const [totalPage, setTotalPage] = useState(1);
    const [lowStockFlag, setLowStock] = useState(false);
    const [lowStockButton, setlowStockButton] = useState("Show Low Stock Items");
    const [selectedItems, setSelectedItems] = useState([]);
    const [deletedFlag, setDeletedFlag] = useState(false);
    const [searchBar, setSearchBar] = useState(false);

    const [page, setPage] = useState(location.state?.page || searchParams.get("page") || 1);
    const [limit, setLimit] = useState(location.state?.limit || searchParams.get("limit") || 10);
    const [search, setSearch] = useState(location.state?.name || searchParams.get("name") || "");




    const goCreateItem = () => {
        nav(`/AddItem`)
    };

    // Function for Fetching Items and updates them to 'items', runs
    // everyime page or limit updates
    useEffect(() => {
        const fetchItems = async () => {
            try{
                const params = new URLSearchParams();
                let response = "";
                if(lowStockFlag){
                    response = await fetch(`${apiUrl}/items/low-stock?page=${page}&limit=${limit}`, {
                        method: 'GET',
                    });
                }
                else if(search.trim() !== ""){
                    response = await fetch(`${apiUrl}/items?name=${search}&page=${page}&limit=${limit}`, {
                        method: 'GET',
                    });

                }
                else{
                    response = await fetch(`${apiUrl}/items?page=${page}&limit=${limit}`, {
                        method: 'GET',
                    });
                }

                if(!response.ok){
                    const err = await response.json();
                    throw err;
                }
                const data = await response.json();
                
                setTotalPage(data.totalPages);
                setItems(data.items);
                
                params.set("page", page);
                params.set("limit", limit);
                
                if(search.trim() !== ""){
                    params.set("name", search);
                }
                else{
                    params.delete("name")
                }
                
                setSearchParams(params);
                
            }
            catch(err){
                setError(err.message);
            }
        };

        fetchItems();
        
    }, [page, limit, lowStockFlag, deletedFlag, searchBar]);


    // changes the limit to a new value
    const changeLimit = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
    };

    const lowStock = () => {
        if(lowStockFlag){
            setlowStockButton("Show Low Stock Item");
        }
        else{
            setlowStockButton("Show All Items");
        }
        setPage(1);
        setLimit(10);
        setLowStock(!lowStockFlag);

    }

    const deleteAllSelected = async () => {
        try {
            await Promise.all(
                selectedItems.map(async (itemId) => {
                    const response = await fetch(`${apiUrl}/items/${itemId}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        const err = await response.json();
                        throw err;
                    }
                })
            );

            setDeletedFlag(!deletedFlag);
        }
        catch (err) {
            setError(err.message);
        }
    };

    const queryItem = async () => {
        setSearchBar(!searchBar);
        setPage(1);
        setLimit(10);
        setSearchParams({
            name: search,
            page: "1",
            limit: "10",
        });
    }

    return (
        <div className="HomeContainer">
                <div className='ItemListTop'>
                    <button onClick={lowStock}>
                        {lowStockButton}
                    </button>
                    <button onClick={goCreateItem}>
                        Add Item
                    </button>
                    <SearchBar query={search} setQuery={setSearch} onSearch={queryItem} placeholder="Find Item..." />
                    <LimitSelector 
                        limit = {limit}
                        onLimitChange={changeLimit}
                    />
                </div>
            <div className='ItemListContainer'>

                <div className='ContentContainer'>
                <div className='ItemListMid'>
                    <ItemTable
                        items={items}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                    />
                </div>
                <div className='ItemListBot'>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPage={totalPage}
                    />
                    <button className='deleteButton' onClick={deleteAllSelected}>Delete Selected</button>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default Home;