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
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';

export function App() {
  // стейт для хранения карточек
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
   // стейт для хранения поискового запроса 
  const [searchQuery, setSearchQuery] = useState('');
  const debounceSearchQuery = useDebounce(searchQuery, 300)

  // console.log(debounceSearchQuery)
  
  
  function handleRequest() {
    // const filterCards = dataCard.filter(item => item.name.includes(searchQuery));cardState
    // setCards(filterCards);
    api.search(debounceSearchQuery)
      .then((dataSearch) => {
        setCards(dataSearch);
      })
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

  function handleUpdateUser(dataUserUpdate) {
      api.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) =>{
        setCurrentUser(updateUserFromServer)
      }

      )
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id)
    api.changeLikeProductStatus(product._id, like)
    .then((updateCard) => {
      const newProducts = cards.map(cardState => {
      return cardState._id === updateCard._id ? updateCard : cardState
      })
      setCards(newProducts)
    }

    )
}

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  useEffect(() => {

    api.getAllInfo()
    .then(([productsData, userInfoData]) => {
      setCurrentUser(userInfoData);
      setCards(productsData.products);
    })
    .catch(err => console.log(err))
    

},[])


  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <Logo />
        <Search
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />
      </Header>
      <main className='content container'>
        <Sort />
        <CardList goods={cards} onProductLike = {handleProductLike} currentUser = {currentUser}/>
      </main>
      <Footer />
    </>
  );
}


