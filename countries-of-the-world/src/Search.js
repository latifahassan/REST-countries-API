import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { API_URL_ALL } from './api';

const Search = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchText.trim() !== '') {
      try {
        let url = `${API_URL_ALL}?name=${searchText}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        const data = await response.json();
        const foundCountry = data.find((country) =>
          country.name.common.toLowerCase() === searchText.toLowerCase()
        );
        if (foundCountry) {
          navigate(`/${foundCountry.name.common}`);
        } else {
          console.log('Country not found');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <form onSubmit={handleSearchSubmit}>
      <TextField
        label="Search Country"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </form>
  );
};

export default Search;
