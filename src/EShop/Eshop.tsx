import { createContext, useContext, useState } from "react";
import { Cards } from "./Cards";
import { Filter } from "./Filter";
import {
    Cat,
    ContextInterface,
    FilterByCategory,
} from "./models/Eshop.interface";
import { useFetchProducts } from "./utils/apiOperations";

const EshopContext = createContext({} as ContextInterface);

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

    return (
        <EshopContext.Provider
            value={{
                data: catsData(filterCat.gender, filterCat.favorite),
                setData,
                error,
                loading,
                filterCat,
                setFilterCat,
            }}
        >
            <div className="flex justify-between w-full px-6">
                <Filter />
                <Cards />
            </div>
        </EshopContext.Provider>
    );
};
