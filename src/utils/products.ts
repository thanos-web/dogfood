import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TProduct } from '../types';
dayjs.locale('ru');


export const isLiked = (likes: string[], userId: string) => likes?.some(id => id === userId)
export const calcDiscountPrice = (price: number, discount:number) => Math.round(price - (price * discount) / 100);


export function formattedDate(date: Date) {
    const data = dayjs(date).format("DD MMM YYYY");
    console.log(data);
    return data.replace('.', "");
}

export const checkProductInCart = (cartProducts: (TProduct & {quantity: number})[], idProduct: string) => {
    const productInCart  = cartProducts.find(item => item._id === idProduct)
    if (productInCart?.quantity) {
        return {quantity: productInCart.quantity, exist: true}
    } 
    return {quantity: 0, exist: false}
}