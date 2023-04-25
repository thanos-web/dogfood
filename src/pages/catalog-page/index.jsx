import { useContext } from "react"
import { Card } from "../../components/card"
import { CardList } from "../../components/card-list"
import { Carousel } from "../../components/carusel"
import { ContentHeader } from "../../components/content-header"
import { Sort } from "../../components/sort"
import { Spinner } from "../../components/spinner"
import { CardsContext } from "../../contexts/card-context"
import { TABS } from "../../utils/constants"

import s from './styles.module.css'

export const CatalogPage = () => {
    const { cards: goods } = useContext(CardsContext)
    return (
        <>
            <ContentHeader title="Каталог" textButton="Главная" to="/" />
            <Sort tabs={TABS} currentSort='discount' onChangeSort={(data) => console.log(data)} />
            <CardList goods={goods} />
            <Carousel items={goods } component={Card}perView={5}/>
        </>
    )

}