export type Guitar = {
    id          : number;
    name        : string;
    image       : string;
    description : string;
    price       : number;
}

// export interface CartItem extends Guitar {
export type CartItem = Guitar & {
    quantity: number;
}
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number;
// }

// export type GuitarId = Pick<Guitar, 'id'>;
export type GuitarId = Guitar['id'];
