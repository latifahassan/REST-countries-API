import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const FilterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
  marginLeft: 'auto', // Pushes the filter to the right
}));

const Filter = ({ selectedRegion, handleRegionChange }) => {
  return (
    <FilterContainer>
      <FormControl sx={{ pr: 2 }}>
        <InputLabel id="region-select-label">Filter by Region</InputLabel>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={selectedRegion}
          onChange={handleRegionChange}
          label="Filter by Region"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="africa">Africa</MenuItem>
          <MenuItem value="americas">Americas</MenuItem>
          <MenuItem value="asia">Asia</MenuItem>
          <MenuItem value="europe">Europe</MenuItem>
          <MenuItem value="oceania">Oceania</MenuItem>
        </Select>
      </FormControl>
    </FilterContainer>
  );
};

export default Filter;
