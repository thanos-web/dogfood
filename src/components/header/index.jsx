import cn from 'classnames';
import s from './styles.module.css';
import { Button } from '../button';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import "./styles.css";
import { ThemeContext } from '../../contexts/theme-context';

export function Header({children}) {
  const {currentUser, onUpdateUser} = useContext(UserContext);
  const {toggleTheme} = useContext(ThemeContext)
  const handleClickButtonEdit = () => {
    onUpdateUser({ name: 'Татьяна', about: 'Студент' })
  }
  return (
    <>
      <header className={s.header}>
        <div className={cn('container', s.wrapper)}>
        {children}
        {/* <div className={s.user}>
        <span>{currentUser?.name}:{currentUser?.about}</span>
        <span>{currentUser?.email}</span>
        </div>

        <Button action = {handleClickButtonEdit}>
          Изменить
        </Button> */}
        <label className="wraper" form="something">
          <div className="switch-wrap">
            <input type="checkbox" id="something" onChange={toggleTheme} />
            <div className="switch"></div>
          </div>
        </label>
        </div>

      </header>
    </>
  );
}

