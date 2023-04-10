import { useContext } from "react"
import { CardList } from "../../components/card-list"
import { ContentHeader } from "../../components/content-header"
import { Spinner } from "../../components/spinner"
import { CardsContext } from "../../contexts/card-context"


import s from './styles.module.css'

export const FavoritesPage = ({ isLoading }) => {
    const { favorites: goods } = useContext(CardsContext)
    return (
        <>
            {/* {isLoading
                ? <Spinner />
                :
                <> */}
                    <ContentHeader title="Избранное" textButton="Назад" />
                    <CardList goods={goods} />
                {/* </>
            } */}
        </>



    )

}