import { useSelector } from "react-redux"
import { CardList } from "../../components/card-list"
import { ContentHeader } from "../../components/content-header"


export const FavoritesPage = () => {
    const goods = useSelector(state => state.products.favoriteProducts)
    return (
        <>
            <ContentHeader title="Избранное" textButton="Назад" />
            <CardList goods={goods} />
        </>
    )
}