import React, { SetStateAction } from 'react'
import { FilterByCategory } from './Eshop'
interface Props {
    filterCat: FilterByCategory
    setFilterCat: React.Dispatch<SetStateAction<FilterByCategory>>
}
export const Filter: React.FC<Props> = ({ filterCat, setFilterCat }) => {


    return (
        <div>


            <div className='flex flex-col'>
                <label htmlFor="filterByGender">Filter by Gender</label>
                <select aria-label="filterByGender" id="filterByGender" onChange={(e) => setFilterCat({ ...filterCat, gender: e.target.value })}>
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="filterByGender">Filter by Favorite</label>
                <select aria-label="filterByFav" id="filterByFav" onChange={(e) => setFilterCat({ ...filterCat, favorite: e.target.value })}>
                    <option value="any">Any</option>
                    <option value="favorite">Favorite</option>
                    <option value="unfavorite">Unfavorite</option>
                </select>
            </div>
        </div>
    )
}
