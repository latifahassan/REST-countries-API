import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import CountryDetails from './CountryDetails';
import CountryList from './CountryList';
import Filter from './Filter';

export default function App() {
  const [mode, setMode] = useState('light');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#1F2937', // Dark blue background color
        paper: '#374151', // Dark blue surface color
      },
      text: {
        primary: '#FFFFFF', // White text color
      },
    },
  });

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Where in the World?
            </Typography>

            <IconButton color="inherit" onClick={toggleMode}>
              {mode === 'light' ? <DarkModeOutlinedIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ margin: '36px' }}>
        <Filter
          selectedRegion={selectedRegion}
          handleRegionChange={handleRegionChange}
        />
      </div>
        <Routes>
          <Route
            path="/"
            element={
              <CountryList
                selectedCountry={selectedCountry}
                handleCountrySelect={handleCountrySelect}
                selectedRegion={selectedRegion}
              />
            }
          />
          <Route
            path="/:name"
            element={<CountryDetails selectedCountry={selectedCountry} />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
