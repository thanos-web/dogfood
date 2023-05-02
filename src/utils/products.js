import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');


export const isLiked = (likes, userId) => likes?.some(id => id === userId)
export const calcDiscountPrice = (price, discount) => Math.round(price - (price * discount) / 100);


export function formattedDate(date) {
    const data = dayjs(date).format("DD MMM YYYY");
    console.log(data);
    return data.replace('.', "");
}