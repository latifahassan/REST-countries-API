import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MenuItem,Select,FormControl,InputLabel } from '@mui/material';
import { styled } from '@mui/system';

export const API_URL_ALL = 'https://restcountries.com/v3.1/all';

export const API_URL_NAME = (name) =>
  `https://restcountries.com/v3.1/name/${name}`;

export const API_URL_REGION = (region) =>
  `https://restcountries.com/v3.1/region/${region}`;

export const API_URL_CODE = (borders) =>
  `https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}`;

  const CountryCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  }));
  
  const FlagImage = styled('div')(({ imageUrl }) => ({
    width: '100%',
    paddingBottom: '56.25%', // 16:9 aspect ratio (adjust as needed)
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${imageUrl})`,
  }));

  const FilterContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
    marginLeft: 'auto', // Pushes the filter to the right
  }));
  

const CountryList = () => {
  const [countryList, setCountryList]= useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        let url = API_URL_ALL;
        if (selectedRegion) {
          url = API_URL_REGION(selectedRegion);
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        const data = await response.json();

        // Log flag dimensions for each country
        data.forEach((country) => {
          const flagImage = new Image();
          flagImage.src = country.flags.svg;
          flagImage.onload = () => {
            console.log(
              `${country.name.common}: ${flagImage.width}px x ${flagImage.height}px`
            );
          };
        });

        setCountryList(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountryList();
  }, [selectedRegion]);

  return (
    <Box py={4} px={2} maxWidth="1200px" mx="auto">
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
      <Grid container spacing={4}>
        {loading ? (
          // Render skeleton or loading state here
          <p>Loading...</p>
        ) : (
          countryList.map((country) => (
            <Grid item key={country.name.common} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/${country.name.common}`} className="country-link">
                <CountryCard>
                <FlagImage imageUrl={country.flags.svg} paddingBottom={`${(885 / 726) * 100}%`} />
                  <CardContent>
                    <Typography variant="h5" component="div">{country.name.common}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Region: {country.region}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Capital: {country.capital}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Population: {country.population}</Typography>
                  </CardContent>
                </CountryCard>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default CountryList;
