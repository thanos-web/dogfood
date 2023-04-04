import { useContext } from 'react';
import { Card } from '../card';
import { CardsContext } from '../../contexts/card-context';
import './styles.css';

export function CardList() {
  const {cards: goods} = useContext(CardsContext)
  return (
    <div className='cards content__cards'>
      {goods.map((dataItem, index) => (
        <Card key={index} {...dataItem}/>
      ))}
    </div>
  );
}


