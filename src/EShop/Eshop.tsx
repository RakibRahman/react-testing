
import { Cards } from './Cards'
import React, { useEffect, useState } from 'react'
import { useFetchProducts } from './utils/apiOperations'
import { Cat } from './models/Cards'
import { Filter } from './Filter'
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

        const result = data.filter((cat) => (genderValue === 'male' ? cat.gender === 'male' : genderValue === 'female' ? cat.gender === 'female' : cat) && (favoriteValue === 'unfavorite' ? cat.favoured === false : favoriteValue === 'favorite' ? cat.favoured === true : cat))



        // if (filterCat.gender === 'any' && filterCat.favorite === 'any') return data
        // if (filterCat.gender === 'male' && filterCat.favorite === 'any') return data.filter((value) => value.gender === 'male')
        // if (filterCat.gender === 'male' && filterCat.favorite === 'favorite') return data.filter((value) => value.gender === 'male' && value.favoured)
        // if (filterCat.gender === 'any' && filterCat.favorite === 'unfavorite') return data.filter((value) => value.gender === 'any' && !value.favoured)

        // return data.filter((value) => value.gender === filterCat.gender && filterCat.favorite === 'unfavorite' === !value.favoured)
        return result
    }

    return (
        <div className="flex justify-between w-full px-6">
            <Filter filterCat={filterCat} setFilterCat={setFilterCat} />
            <Cards data={catsData(filterCat.gender, filterCat.favorite)} loading={loading} error={error} />
        </div>
    )
}
