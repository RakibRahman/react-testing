import React from "react";
import { Cat } from "./models/Eshop.interface";
interface CardProp {
  cat: Cat;
  updateFavorites: (id: number, favStatus: boolean) => void;
}
export const Card: React.FC<CardProp> = ({ cat, updateFavorites }) => {
  const [isFavorite, setFavorite] = React.useState(cat.favoured);

  const toggleHeart = (id: number) => {
    setFavorite((prev) => {
      updateFavorites(id, !prev);
      return !prev;
    });
  };
  return (
    <div
      className="w-60 bg-gray-400 grid place-items-center relative"
      data-testid="card"
      role="article"
    >
      <button
        onClick={() => toggleHeart(cat.id)}
        className={`absolute top-0 right-0 ${
          isFavorite ? "icon-heart-fill" : "icon-heart-outline"
        }`}
      >
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="red"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>
      <img
        src={cat.image.url}
        alt={cat.image.alt}
        className="w-full object-cover h-44"
      />
      <h1>{cat.name}</h1>
      <p>{cat.color}</p>
      <p>{cat.gender}</p>
    </div>
  );
};
