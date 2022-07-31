import React from 'react'

export const Filter = () => {
    return (
        <div>


            <div className='flex flex-col'>
                <label htmlFor="filterByGender">Filter by Gender</label>
                <select aria-label="filterByGender" id="filterByGender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="filterByGender">Filter by Favorite</label>
                <select aria-label="filterByFav" id="filterByFav">
                    <option value="fav">Favorite</option>
                    <option value="unfav">Unfavorite</option>
                </select>
            </div>
        </div>
    )
}
