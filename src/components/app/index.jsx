import { useState, useEffect } from 'react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Logo } from '../logo';
import { Search } from '../search';
import { Sort } from '../sort';
import { CardList } from '../card-list';
import { dataCard } from '../../data';
// import './styles.css';
import s from "./styles.module.css";
import { Button } from '../button';

export function App() {

  // стейт для хранения карточек
  const [cards, setCards] = useState(dataCard);
  // стейт для хранения поискового запроса 
  const [searchQuery, setSearchQuery] = useState("");

  function handleRequest() {
    const filterCards = dataCard.filter(item => item.name.includes(searchQuery));
    console.log(filterCards);
    setCards(filterCards);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

  // useEffect(() => {
  //   handleRequest();
  // }, [searchQuery]);

  const margin = 40;
  const headerStyle = {
    color: "red",
    margin: `${margin}px`,
  }

  return (
    <>
      <Header>
        <Logo />
        <Search
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />
      </Header>
      <main className='content container'>
        {/* <h1 style={headerStyle}>Стилизованный заголовок</h1>
        <Button htmlType='button' type="primary" extraClass={s.button}>Купить</Button>
        <Button htmlType='button' type="secondary">Отложить</Button>
        <Button htmlType='button' type="error" extraClass={s.button}>Купить</Button> */}

        <Button htmlType='button'>Купить</Button>
        <Sort />
        <CardList goods={cards} />
      </main>
      <Footer />
    </>
  );
}


