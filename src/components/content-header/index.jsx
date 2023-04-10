import { Link, useNavigate } from 'react-router-dom';
import s from './styles.module.css';
const PREV_PAGE = -1;

export function ContentHeader({title, children, to, textButton}) {
    // const navigate = useNavigate()
  return (
    <>
      <Link  className={s.buttonBack} to={to || PREV_PAGE}>
        {textButton}
      </Link>
      { /* или <a href="#" className={s.buttonBack} onClick={() => navigate(to || -1)}>{textButton}</a> */}
      <h1 className={s.title}>{title}</h1>
      {children}
    </>
  );
}
