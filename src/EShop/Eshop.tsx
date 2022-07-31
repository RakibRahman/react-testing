
import { Cards } from './Cards'
import React, { useEffect } from 'react'
import { useFetchProducts } from './utils/apiOperations'
import { Cat } from './models/Cards'
import { Filter } from './Filter'
export const Eshop = () => {
    const { data, error, loading } = useFetchProducts<Cat>('http://localhost:4000/cats')

    return (
        <div className="flex justify-between w-full px-6">
            <Filter />
            <Cards data={data} loading={loading} error={error} />
        </div>
    )
}
