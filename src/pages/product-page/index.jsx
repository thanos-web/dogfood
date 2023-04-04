
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardsContext } from '../../contexts/card-context';
import { NotFound } from '../../components/not-found';
import Product from '../../components/product';
import { Spinner } from '../../components/spinner';
import api from '../../utils/api';
import { isLiked } from '../../utils/products';
import s from './styles.module.css';

// const ID_PRODUCT = '622c77e877d63f6e70967d22';
export const ProductPage = () => {

    const {productID} = useParams();
    const [product, setProduct] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] =useState(null);
    const {handleLike} = useContext(CardsContext)


    function handleProductLike(product) {
        // handleLike(product)
        handleLike(product).then(updateCard => {
            setProduct(updateCard)
        });
        
    }


    useEffect(() => {
        setIsLoading(true)
        api.getInfoProduct(productID)
            .then(([productData, userData]) => {
                setCurrentUser(userData);
                setProduct(productData);
            })
            .catch((err) => {
                setErrorState(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])
    return (
        <>
        { isLoading
        ? <Spinner/>
        : !errorState &&  <Product {...product} currentUser={currentUser} onProductLike={handleProductLike}/>
        }

        {!isLoading && errorState && <NotFound title='Товар не найден'/>}
        </>

    )

}