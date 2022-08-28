import { createContext, useContext, useState, useMemo } from "react";
import { Cards } from "./Cards";
import { Filter } from "./Filter";
import {
    Cat,
    ContextInterface,
    FilterByCategory,
} from "./models/Eshop.interface";
import { useFetchProducts } from "./utils/apiOperations";

export const EshopContext = createContext({} as ContextInterface);

export function useShopData() {
    return useContext(EshopContext);
}

export const Eshop = () => {
    const { data, error, loading, setData } = useFetchProducts<Cat>(
        "http://localhost:4000/cats"
    );
    const [filterCat, setFilterCat] = useState<FilterByCategory>({
        gender: "any",
        favorite: "any",
    });

    const catsData = (
        genderValue: string = "any",
        favoriteValue: string = "any"
    ) => {
        if (!data) return [];
        const result = data.filter(
            (cat) =>
                (genderValue === "any" ? cat : cat.gender === genderValue) &&
                (favoriteValue === "unfavorite"
                    ? cat.favoured === false
                    : favoriteValue === "favorite"
                        ? cat.favoured === true
                        : cat)
        );
        return result;
    };


    const contextValue = useMemo(() => ({
        data: catsData(filterCat.gender, filterCat.favorite),
        setData,
        error,
        loading,
        filterCat,
        setFilterCat,
    }), [data, error, loading, filterCat])

    return (
        <EshopContext.Provider
            value={contextValue}
        >
            <div className="flex justify-between w-full px-6">
                <Filter />
                <Cards />
            </div>
        </EshopContext.Provider>
    );
};
