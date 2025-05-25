import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface MenuItem {
    id: number; // Unique identifier for the menu item
    name: string; // Name of the menu item
    price: number; // Price of the menu item
    image: string; // URL of the menu item's image
}


export interface Restaurant {
    _id: number; // Unique identifier for the restaurant
    name: string; // Name of the restaurant
    image: string; // URL of the restaurant's image
    cuisine: string; // Type of cuisine offered by the restaurant
    rating: number; // Rating of the restaurant (out of 5)
    deliveryTime: string; // Estimated delivery time
    featured: boolean; // Whether the restaurant is featured or not
    menu: MenuItem[]; // Array of menu items offered by the restaurant
}
export interface cartItem {
    id: number; name: string; price: number; image: string, quantity: number
}

interface initialStatetype {
    res: Restaurant[] | null; // State to hold the restaurant data, initially null
    cart: cartItem[] | null // State to hold the cart data, initially null
}
const initialState:initialStatetype = {
    res: null,
    cart:null
    // Initialize the restaurant state to null
    // Add any other initial state properties you need
}


const resSlice = createSlice({
    name: "res",
    initialState,
    reducers: {
        setRes: (state, action: PayloadAction<Restaurant[]>) => {
            state.res = action.payload; // Set the restaurant state to the payload
        },
        clearRes: (state) => {
            state.res = null; // Clear the restaurant state by returning null
        },
        addToCart: (state, action: PayloadAction<cartItem>) => {
             state.cart =state.cart? [...state.cart,action.payload]:[action.payload] // Add the item to the cart state
            // Add the item to the cart (you can implement your own logic here)
            // For example, you might want to maintain a cart array in the state
            console.log("Item added to cart:", action.payload);
        },
        // removeFromCart: (state, action: PayloadAction<number>) => {
        //     // Remove the item from the cart (you can implement your own logic here)
        //     console.log("Item removed from cart:", action.payload);
        // },
        // clearCart: (state) => {
        //     // Clear the cart (you can implement your own logic here)
        //     console.log("Cart cleared");
        // }
    },

})


export const { setRes, clearRes, addToCart } = resSlice.actions; // Export the actions for use in components
export default resSlice.reducer; // Export the reducer to be used in the store
