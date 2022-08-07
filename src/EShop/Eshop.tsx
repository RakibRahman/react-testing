
import { useState } from 'react'
import { Cards } from './Cards'
import { Filter } from './Filter'
import { Cat } from './models/Cards'
import { useFetchProducts } from './utils/apiOperations'
export type FilterByCategory = {
    gender: 'male' | 'female' | 'any' | string,
    favorite: 'any' | 'favorite' | 'unfavorite' | string
}
export const Eshop = () => {
    const { data, error, loading } = useFetchProducts<Cat>('http://localhost:4000/cats')
    const [filterCat, setFilterCat] = useState<FilterByCategory>({
        gender: 'any',
        favorite: 'any'
    })

    const catsData = (genderValue: string = 'any', favoriteValue: string = 'any') => {
        if (!data) return []
        const result = data.filter((cat) => (genderValue === 'any' ? cat : cat.gender === genderValue) && (favoriteValue === 'unfavorite' ? cat.favoured === false : favoriteValue === 'favorite' ? cat.favoured === true : cat))
        return result
    }

    return (
        <div className="flex justify-between w-full px-6">
            <Filter filterCat={filterCat} setFilterCat={setFilterCat} />
            <Cards data={catsData(filterCat.gender, filterCat.favorite)} loading={loading} error={error} />
        </div>
    )
}
