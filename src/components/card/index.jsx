import './styles.css';
import { ReactComponent as likeIcon } from './assets/save.svg';

export function Card({
  name,
  price,
  discount,
  weight,
  description,
  picture,
  ...props }) {

  const discount_price = Math.round(price - (price * discount) / 100);

  return (
    <article className='card'>
      <div className='card__sticky card__sticky_type_top_left'>
        {discount !== 0 && (
          <span className='card__discount'>{`-${discount}%`}</span>
        )}
        {/* discount !== 0 && условный рендеринг. Возвращает значение в спане если дискаунт не равен 0.
        если равен 0б то Возвращает false, а реакт не рендерит false, поэтому ничего не покажет если скидки нет */}
      </div>
      <div className='card__sticky card__sticky_type_top_right'>
        <button className='card__favorite'>
          <img src={likeIcon} alt="" className='card__favorite-icon' />
        </button>
      </div>
      <a href="#" className='card__link'>
        <img src={picture} alt={name} className="card__image" />

        <div className='card__desc'>
          {discount !== 0 ? (
            <>
              <span className='card__old-price'>{price}&nbsp;₽</span>
              <span className='card__price card__price_type_discount'>{discount_price}&nbsp;₽</span>
            </>
          ) : (
            <span className='card__price'>{price}&nbsp;₽</span>
          )}

          <span className='card__weight'>{weight}</span>
          <h3 className='card__name'>{name}</h3>
        </div>
      </a>
      <a href="#" className='card_cart btn btn_type_primary'> В корзину</a>

    </article>
  );
}


