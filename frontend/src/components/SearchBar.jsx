import React, { useState, useEffect,  } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import './SearchBar.css'

const apiUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

function SearchBar({ query, setQuery, onSearch, placeholder = "Search..." }) {
  return (
    <div className="search-container">
      <input
        id='searchBox'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                onSearch();
            }
        }}
      />
    </div>
  );
}

export default SearchBar;