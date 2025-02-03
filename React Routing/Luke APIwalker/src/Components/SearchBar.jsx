import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [resource, setResource] = useState('characters');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (resource === 'characters') {
      navigate(`/characters/${id}`);
    } else {
      navigate(`/planets/${id}`);
    }
  };

  return (
    <div className="search-bar">
        <select value={resource} onChange={(e) => setResource(e.target.value)}>
            <option value="characters">Characters</option>
            <option value="planets">Planets</option>
        </select>
        <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
        />
        <button onClick={handleSearch}>Search</button>
    </div>
);
};

export default SearchBar;