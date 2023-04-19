import cn from 'classnames';
import s from './styles.module.css';
import { Button } from '../button';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import "./styles.css";
import { ThemeContext } from '../../contexts/theme-context';
import { CardsContext } from '../../contexts/card-context';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg';

export function Header({ children }) {
  const { currentUser, onUpdateUser } = useContext(UserContext);
  const { favorites } = useContext(CardsContext)
  const { toggleTheme } = useContext(ThemeContext)
  const handleClickButtonEdit = () => {
    onUpdateUser({ name: 'Татьяна', about: 'Студент' })
  }
  const location = useLocation();
  return (
    <>
      <header className={s.header}>
        <div className={cn('container', s.wrapper)}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{pathname: '/favorites'}}>
              <FavoriteIcon/>
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
            <Link to='/login' replace state={{backgroundLocation: location, initialPath: location.pathname}}>Войти</Link>
          </div>
          {/* <div className={s.user}>
        <span>{currentUser?.name}:{currentUser?.about}</span>
        <span>{currentUser?.email}</span>
        </div>

        <Button action = {handleClickButtonEdit}>
          Изменить
        </Button>
          <label className="wraper" htmlFor="something">
          <div className="switch-wrap">
            <input type="checkbox" id="something" onChange={toggleTheme} />
            <div className="switch"></div>
          </div>
        </label> */}
        </div>

      </header>
    </>
  );
}

