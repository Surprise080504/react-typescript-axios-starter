import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { findAllCats } from '../src/api/catsApi';

const Button = styled.button`
  background: purple;
  border-radius: 3px;
  border: none;
  color: white;
  padding: 10px;
  radius: 5px;
  cursor: pointer;
`;

function App() {

  const handleClick = async () => {
    const response = await findAllCats();
    console.log(response.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Cats Api with NestJS
        </p>
        <Button onClick={handleClick}>Find All Cats</Button>
      </header>
    </div>
  );
}

export default App;
