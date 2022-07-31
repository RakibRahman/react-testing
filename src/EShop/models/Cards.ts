
export interface Cat {

    id: number,
    name: string,
    phone: string,
    email: string,
    image: {
        url: string,
        alt: string,
    },
    favoured: boolean,
    color: string,
    gender: string,

}

export type Cats = Cat[];