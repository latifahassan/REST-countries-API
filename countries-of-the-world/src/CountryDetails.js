import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

export const API_URL_NAME = (name) =>
  `https://restcountries.com/v3.1/name/${name}`;

export const API_URL_CODE = (borders) =>
  `https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}`;

const Container = styled('div')({
  minHeight: '100vh',
  padding: '5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const FlagImage = styled('img')({
  width: '20%',
  minWidth: '300px',
  objectFit: 'cover',
  objectPosition: 'center center',
  marginBottom: '3rem',
  aspectRatio: '16 / 9',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const InformationWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'light' ? '#F5F5F5' : theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const Heading = styled('h3')({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '1.5rem',
  fontWeight: '600',
  marginBottom: '1rem',
  textAlign: 'center',
});

const Content = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '0.9rem',
  marginBottom: '0.8rem',
  textAlign: 'center',
}));

const BorderButton = styled(Button)(({ theme }) => ({
  padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  fontSize: '1rem',
  textTransform: 'none',
  margin: theme.spacing(1),
}));

const BorderButtonContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '6rem',
  left: '1rem',
  padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  fontSize: '1rem',
  textTransform: 'none',
}));

function CountryDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(API_URL_NAME(name));
        const data = await response.json();
        setCountryData(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountryData();
  }, [name]);

  useEffect(() => {
    if (countryData) {
      const { borders } = countryData;
      const fetchBorderCountries = async () => {
        try {
          if (Array.isArray(borders)) {
            const response = await fetch(API_URL_CODE(borders));
            const data = await response.json();
            setBorderCountries(data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchBorderCountries();
    }
  }, [countryData]);

  const handleBorderCountryClick = (border) => {
    navigate(`/${border.name.common}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (

    <Container>
      <BackButton variant="contained" onClick={handleGoBack}>
        Back
      </BackButton>

      {countryData && (
        <>
          <FlagImage src={countryData.flags.svg} alt={`${name} flag`} />
          <InformationWrapper>
            <Heading>General Information</Heading>
            <Content>
              <strong>Capital:</strong> {countryData.capital}
            </Content>
            <Content>
              <strong>Top Level Domain:</strong> {countryData.tld}
            </Content>
            <Content>
              <strong>Currency:</strong>{' '}
              {Object.entries(countryData.currencies || {}).map(([code, currency]) => (
                <span key={code}>
                  {currency.name} ({code})
                </span>
              ))}
            </Content>
            <Content>
              <strong>Language:</strong>{' '}
              {
                countryData.languages[
                  Object.keys(countryData.languages)[0]
                ]
              }
            </Content>
            <Content>
              <strong>Region:</strong> {countryData.region}
            </Content>
            <Content>
              <strong>Sub-region:</strong> {countryData.subregion}
            </Content>
            <Content>
              <strong>Native Name:</strong> {countryData.name.native?.eng || countryData.name.common}
            </Content>
            <Content>
              <strong>Population:</strong> {countryData.population}
            </Content>
          </InformationWrapper>
        </>
      )}

      {borderCountries.length > 0 && (
        <>
          <Heading>Border Countries:</Heading>
          <BorderButtonContainer>
            {borderCountries.map((border) => (
              <BorderButton
                key={border.cca3}
                variant="contained"
                onClick={() => handleBorderCountryClick(border)}
              >
                {border.name.common}
              </BorderButton>
            ))}
          </BorderButtonContainer>
        </>
      )}
    </Container>
  );
}

export default CountryDetails;
