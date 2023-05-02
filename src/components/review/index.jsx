import s from "./styles.module.css";
import { formattedDate } from '../../utils/products';
import { Rating } from "../rating";


export function Review({ author, text, city, created_at, rating, _id, photos }) {
  return (
    <div className={s.review}>
      <div className={s.review__header}>
        <div className={s.review__name}>{author.name}</div>
        <div className={s.review__date}>{formattedDate(created_at)}</div>
      </div>
      <Rating currentRating={rating} />
      {city && <div className={s.review__city}>{city}</div>}
      <p className={s.review__text}>«{text}»</p>
    </div>
  );
}