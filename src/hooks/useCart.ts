import { useEffect, useMemo, useState } from 'react';
import { db } from '../data/db';
import type { CartItem, Guitar } from '../types';

const useCart = () => {

    // arrow function inline
    // const initialCart = ():Guitar[] => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [];

    const initialCart = ():CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return  localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [guitars] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])

    const addToCart = (item:Guitar) => {

        const itemExists = cart.findIndex(guitar => guitar.id === item.id);

        if (itemExists >= 0) { // Si el item ya existe en el carrito

            if (cart[itemExists].quantity >= MAX_ITEMS) return;

            const updatedCart = [ ...cart ];
            updatedCart[itemExists].quantity += 1;
            setCart(updatedCart);
        } else {

            // const newItem:CartItem = { ...item, quantity: 1 };
            // setCart([ ...cart, newItem ]);

            setCart([...cart, { ...item, quantity: 1 }]);
        }
    }

    const removeFromCart = (id:Guitar['id']) => {
        // const guitarsUpdated = cart.filter(guitar => guitar.id !== id);
        // setCart( guitarsUpdated );

        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
    }

    const increaseQuantity = (id:Guitar['id']) => {
        // const updatedCart = cart.map( item => {
        //     if (item.id === id && item.quantity < MAX_ITEMS) {
        //         return {
        //             ...item,
        //             quantity: item.quantity + 1
        //         }
        //     }
        //         return item;
        // })
        // setCart( updatedCart );

        setCart(prevCart => prevCart.map(item => item.id === id && item.quantity < MAX_ITEMS ? { ...item, quantity: item.quantity + 1 } : item));
    }

    const decreaseQuantity = (id:Guitar['id']) => {
        // const updatedCart = cart.map( item => {
        //     if (item.id === id && item.quantity > MIN_ITEMS) {
        //         return {
        //             ...item,
        //             quantity: item.quantity - 1
        //         }
        //     }
        //         return item;
        // });
        // setCart( updatedCart );

        setCart(prevCart => prevCart.map(item => item.id === id && item.quantity > MIN_ITEMS ? { ...item, quantity: item.quantity - 1 } : item));

    }

    const emptyCart = () => setCart([]);

    // State derived from props
    const isEmpty = useMemo( () => cart.length === 0, [ cart ]);
    const cartTotal = useMemo( () => cart.reduce((acc, item) => acc + ( item.quantity * item.price ), 0) || 0, [ cart ]);

    return {
        // properties
        cart,
        guitars,

        // methods
        addToCart,
        decreaseQuantity,
        emptyCart,
        increaseQuantity,
        removeFromCart,

        // derived state
        cartTotal,
        isEmpty,
    }
}

export default useCart;