import { useSelector } from "react-redux"
import { CardList } from "../../components/card-list"
import { Carousel } from "../../components/carusel"
import { ContentHeader } from "../../components/content-header"
import { Sort } from "../../components/sort"
import { TABS } from "../../utils/constants"


export const CatalogPage = () => {

    const goods = useSelector(state => state.products.data)
    return (
        <>
            <ContentHeader title="Каталог" textButton="Главная" to="/" />
            <Sort tabs={TABS} currentSort='discount' onChangeSort={(data) => console.log(data)} />
            <CardList goods={goods} />
            {/* <Carousel items={goods } component={Card}perView={5}/> */}
        </>
    )

}