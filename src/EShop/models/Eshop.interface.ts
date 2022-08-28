import { Dispatch, SetStateAction } from "react";

export interface Cat {
  id: number;
  name: string;
  phone: string;
  email: string;
  image: {
    url: string;
    alt: string;
  };
  favoured: boolean;
  color: string;
  gender: string;
}

export type Cats = Cat[];

export interface ContextInterface {
  data: Cat[];
  setData: Dispatch<SetStateAction<Cat[]>>;
  loading: boolean;
  error: string;
  filterCat: FilterByCategory;
  setFilterCat: Dispatch<SetStateAction<FilterByCategory>>;
}

export type FilterByCategory = {
  gender: "male" | "female" | "any" | string;
  favorite: "any" | "favorite" | "unfavorite" | string;
};
