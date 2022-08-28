import React from "react";
import { Card } from "./Card";
import { Cat } from "./models/Eshop.interface";
import { useShopData } from "./Eshop";

export const Cards: React.FC = () => {
  const { data, setData, error, loading } = useShopData();
  const updateFavorites = (id: number, favStatus: boolean) => {
    const newCats = [...data];
    const selectFavCat = data.findIndex((cat) => cat.id === id);
    // selectFavCat!.favoured = favStatus
    newCats[selectFavCat].favoured = favStatus;
    setData(newCats);
  };
  return (
    <div>
      <h1> {loading ? "Cats are loading..." : null}</h1>
      <h1> {error ? error : null}</h1>
      <div className="grid grid-cols-3 gap-2 w-auto">
        {data &&
          data.map((cat: Cat) => (
            <Card key={cat.id} cat={cat} updateFavorites={updateFavorites} />
          ))}
      </div>
    </div>
  );
};
