import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { findAllCats, createCat } from '../src/api/catsApi';
import { Cat } from './model/cat';

const Button = styled.button`
  background: purple;
  border-radius: 3px;
  border: none;
  color: white;
  padding: 10px;
  radius: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: space-between;
`;

function App() {

  const findAll = async () => {
    const response = await findAllCats();
    console.log(response.data);
  }

  const create = async () => {
    const newCat: Cat = {
      name: "Kitty",
      age: 3,
      breed: "Baby Kitty"
    }
    const response = await createCat(newCat);
    console.log(response.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Cats Api with NestJS
        </p>
        <Container>
          <Button onClick={findAll}>Find All Cats</Button>
          <Button onClick={create}>Create Cat</Button>
        </Container>
      </header>
    </div>
  );
}

export default App;
