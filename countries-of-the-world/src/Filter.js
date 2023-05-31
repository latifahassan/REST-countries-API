import React, { useState, useEffect } from 'react';
import { ReactComponent as ArrowUpIcon } from '@material-ui/icons/ExpandLess';
import { ReactComponent as ArrowDownIcon } from '@material-ui/icons/ExpandMore';
import styled from 'styled-components'; // or import styled from '@emotion/styled';

// Define your styled components
const Dropdown = styled.div`
  position: relative;
  width: 200px;
  background-color: var(--element);
  box-shadow: 0 0 12px -5px rgb(0 0 0 / 20%);
  border-radius: 5px;
`;

const DropdownLabel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(1.75)}px ${theme.spacing(2.5)}px`};
  cursor: pointer;

  span {
    color: var(--text);
    font-size: 14px;
    font-weight: 300;
  }
`;

const DropdownOptions = styled.div`
  position: absolute;
  top: 55px;
  width: 200px;
  background-color: var(--element);
  color: var(--text);
  box-shadow: 0 0 12px -5px rgb(0 0 0 / 20%);
  border-radius: 5px;
  z-index: 5;
  overflow: hidden;
`;

const Option = styled.div`
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(3.5)}px`};
  cursor: pointer;
  transition: background-color 250ms ease;

  &:hover {
    background-color: rgb(0 0 0 / 10%);
  }

  &:first-child {
    padding: ${({ theme }) => `${theme.spacing(2.5)}px ${theme.spacing(3.5)}px ${theme.spacing(1)}px ${theme.spacing(3.5)}px`};
  }

  &:last-child {
    padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(3.5)}px ${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`};
  }
`;


// Define your Filter component
const Filter = ({ state, handleFetchRegion }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function initListeners() {
      document.getElementById('dropdown').addEventListener('click', (e) => {
        fetchRegion(e.target.dataset.value);
        setOpen(false);
      });
    }

    initListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRegion = (region) => {
    handleFetchRegion(region);
  };

  const handleOpenDropdown = () => {
    setOpen(!open);
  };

  return (
    <Dropdown>
      <DropdownLabel onClick={handleOpenDropdown}>
        <span>Filter by Region</span>
        {open ? (
          <ArrowUpIcon
            fontSize="small"
            className={state === 'dark' ? 'darkIcon' : 'lightIcon'}
          />
        ) : (
          <ArrowDownIcon
            fontSize="small"
            className={state === 'dark' ? 'darkIcon' : 'lightIcon'}
          />
        )}
      </DropdownLabel>
      <DropdownOptions
        id="dropdown"
        style={open ? { display: 'block' } : { display: 'none' }}
      >
        <Option data-value="All">All</Option>
        <Option data-value="Africa">Africa</Option>
        <Option data-value="Americas">America</Option>
        <Option data-value="Asia">Asia</Option>
        <Option data-value="Europe">Europe</Option>
        <Option data-value="Oceania">Oceania</Option>
      </DropdownOptions>
    </Dropdown>
  );
};

export default Filter;
