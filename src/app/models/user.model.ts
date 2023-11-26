export interface User{
    uid: string,
    email: string,
    password: string,
    name: string
}

export interface Product{
    id: number,
    name: string,
    type: string,
    description: string,
    price: Number,
    img: string,
}