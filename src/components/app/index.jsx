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
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFound } from '../not-found';
import { NotFoundPage } from '../../pages/not-found-page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/card-context';
import { ThemeContext, themes } from '../../contexts/theme-context';
import { FavoritesPage } from '../../pages/favorite-page';
import { TABS_ID } from '../../utils/constants';
import { Form } from '../form';
import { Modal } from '../modal';
import { Register } from '../register';
import { Login } from '../login';
import { ResetPassword } from '../reset-password';
import DnDPage from '../../pages/dnd-page';



export function App() {
  // стейт для хранения карточек
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  // стейт для хранения поискового запроса 
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [currentSort, setCurrentSort] = useState('');
  const [contacts, setContacts] = useState([])
  const [modalFormStatus, setModalFormStatus] = useState(false)
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  const navigate = useNavigate();

  // console.log(debounceSearchQuery)

  const onCloseModalForm = () => {
    setModalFormStatus(false)
  }
  const onCloseRoutingModal = () => {
    navigate(initialPath || '/', { replace: true })
  }

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

        if (!like) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

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

        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userInfoData._id))
        setFavorites(favoriteProducts)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })

  }, [])

  function sortedData(currentSort) {
    console.log(currentSort)

    switch (currentSort) {
      case (TABS_ID.CHEAP): setCards(cards.sort((a, b) => a.price - b.price)); break;
      case (TABS_ID.LOW): setCards(cards.sort((a, b) => b.price - a.price)); break;
      case (TABS_ID.DISCOUNT): setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default: setCards(cards.sort((a, b) => a.price - b.price));
    }
  }

  function toggleTheme() {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  }
  function addContact(dataInfo) {
    setContacts([...contacts, dataInfo]);
  }

  const cbSubmitFormLoginRegister = (dataForm) => {
    console.log('cbSubmitFormLoginRegister', dataForm);
  }
  const cbSubmitFormLogin = (dataForm) => {
    console.log('cbSubmitFormLogin', dataForm);
  }
  const cbSubmitFormResetPassword = (dataForm) => {
    console.log('cbSubmitFormResetPassword', dataForm);
  }

  const handleClickButtonLogin = (e) => {
    e.preventDefault();
    navigate('/login', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }
  const handleClickButtonReset = (e) => {
    e.preventDefault();
    navigate('/reset-password', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }

  const handleClickButtonRegister = (e) => {
    e.preventDefault();
    navigate('/register', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }

  // для страниц регистрации, восстановления пароля, логина
  const handleClickButtonResetNotModal = (e) => {
    e.preventDefault();
    navigate('/reset-password')
  }
  const handleClickButtonRegisterNotModal = (e) => {
    e.preventDefault();
    navigate('/register')
  }
  const handleClickButtonLoginNotModal = (e) => {
    e.preventDefault();
    navigate('/login')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CardsContext.Provider value={{
        cards,
        favorites,
        currentSort,
        handleLike: handleProductLike,
        isLoading,
        onSortData: sortedData,
        setCurrentSort
      }}>
        <UserContext.Provider value={{ currentUser, onUpdateUser: handleUpdateUser }}>
          <Header user={currentUser}>
            <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
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
          <main className='content container' style={{ backgroundColor: theme.background }}>
            <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
              <Route path='/' element={<CatalogPage cards={cards} handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading} />}></Route>
              <Route path='/favorites' element={<FavoritesPage />} />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/product/:productID' element={<ProductPage />} />
              <Route path='/dnd' element={<DnDPage/>}/>
              <Route path='/login' element={
                <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButtonRegisterNotModal} onNavigateReset={handleClickButtonResetNotModal} />
              } />
              <Route path='/register' element={
                <Register onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButtonLoginNotModal} />
              } />
              <Route path='/reset-password' element={
                <ResetPassword onSubmit={cbSubmitFormResetPassword} />
              } />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          {backgroundLocation && <Routes>
            <Route path='/login' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButtonRegister} onNavigateReset={handleClickButtonReset} />
              </Modal>
            } />
            <Route path='/register' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Register onSubmit={cbSubmitFormLoginRegister} onNavigatelogin={handleClickButtonLogin} />
              </Modal>
            } />
            <Route path='/reset-password' element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <ResetPassword onSubmit={cbSubmitFormResetPassword} />
              </Modal>
            } />
          </Routes>}


        </UserContext.Provider>
      </CardsContext.Provider>
    </ThemeContext.Provider>


  );
}


