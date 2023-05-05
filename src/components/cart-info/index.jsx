import { useSelector } from "react-redux";
import s from "./styles.module.css";


export function CartInfo() {
  const { totalCountProducts } = useSelector(state => state.cart);
  console.log(totalCountProducts)
  return (
    <div className={s.cartTitle}>
      <span>{totalCountProducts} товаров</span> в корзине
      
    </div>
  );
}