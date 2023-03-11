import { useState, useEffect } from 'react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Logo } from '../logo';
import { Search } from '../search';
import { Sort } from '../sort';
import { CardList } from '../card-list';
import { dataCard } from '../../data';
import './styles.css';

export function App() {
  
  // стейт для хранения карточек
  const [cards, setCards] = useState(dataCard);
  // стейт для хранения поискового запроса 
  const [searchQuery, setSearchQuery] = useState("");

  function handleRequest() {
    const filterCards = dataCard.filter(item => item.name.includes(searchQuery));
    console.log(filterCards);
    setCards( filterCards);
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
        <Sort />
        <CardList goods={cards} />
      </main>
      <Footer />
    </>
  );
}


