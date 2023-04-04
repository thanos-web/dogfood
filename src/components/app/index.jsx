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
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../not-found';
import { NotFoundPage } from '../../pages/not-found-page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/card-context';
import { ThemeContext, themes } from '../../contexts/theme-context';


export function App() {
  // стейт для хранения карточек
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  // стейт для хранения поискового запроса 
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const debounceSearchQuery = useDebounce(searchQuery, 300);

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
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer)
      }

      )
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id)
    return api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })
        setCards(newProducts)
        return updateCard;
      })
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  useEffect(() => {
    setIsLoading(true);
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })


  }, [])

  function toggleTheme(){
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  }

  return (
    <ThemeContext.Provider value={{ theme,toggleTheme}}>
    <CardsContext.Provider value={{ cards, handleLike: handleProductLike }}>      
    <UserContext.Provider value={{currentUser,  onUpdateUser:handleUpdateUser}}>
      <Header user={currentUser}>
        <Routes>
          <Route path='/' element={
            <>
              <Logo />
              <Search
                handleFormSubmit={handleFormSubmit}
                handleInputChange={handleInputChange}
              />
            </>
          } />

          <Route path='*' element={<Logo href='/' />} />
        </Routes>

      </Header>
      <main className='content container' style = {{backgroundColor: theme.background}}>
        <Routes>
          <Route path='/' element={<CatalogPage cards={cards} handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading} />}></Route>
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/product/:productID' element={<ProductPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </UserContext.Provider>
    </CardsContext.Provider>
    </ThemeContext.Provider>


  );
}


