import cn from 'classnames';
import s from './styles.module.css';
import { Button } from '../button';


export function Header({children, user, onUpdateUser}) {
  const handleClickButtonEdit = () => {
    onUpdateUser({ name: 'Татьяна', about: 'Студент' })
  }
  return (
    <>
      <header className={s.header}>
        <div className={cn('container', s.wrapper)}>
        {children}
        <div className={s.user}>
        <span>{user?.name}:{user?.about}</span>
        <span>{user?.email}</span>
        </div>

        <Button action = {handleClickButtonEdit}>
          Изменить
        </Button>
        </div>

      </header>
    </>
  );
}

