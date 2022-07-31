import React from 'react'
import { Card } from './Card'
import { Cat } from './models/Cards'

interface CardsProps {
    data: Cat[],
    loading: boolean
    error: string
}
export const Cards: React.FC<CardsProps> = ({ data, error, loading }) => {
    console.log(data)
    return (
        <div>
            <h1>  {loading ? 'Cats are loading...' : null}</h1>
            <h1> {error ? error : ""}</h1>
            <div className='grid grid-cols-3 gap-2 w-auto'>
                {data && data.map((cat: Cat) => (
                    <Card key={cat.id} cat={cat} />))
                }
            </div>
        </div>
    )
}
