import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { _id, title, image, price } = action.payload;
            //Check if the item already exist in state
            const existingItem = state.cart.find((item) => item._id === _id);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                state.cart.push({ _id, title, image, price, qty: 1 });
            }
            console.log(action.payload);
        },
        removeToCart: (state, action) => {
            const cartId = action.payload;
            state.cart = state.cart.filter((item) => item._id !== cartId);
        },
        incrementQty: (state, action) => {
            const cartId = action.payload;
            const existingItem = state.cart.find((item) => item._id === cartId);
            if (existingItem) {
                existingItem.qty += 1;
            }
        },
        decrementQty: (state, action) => {
            const cartId = action.payload;
            const existingItem = state.cart.find((item) => item._id === cartId);
            if (existingItem && existingItem.qty > 1) {
                existingItem.qty -= 1;
            }
        },
        clearCart: state => {
            state.cart=[];
        },
    }
})

export const { addToCart, removeToCart, incrementQty, decrementQty, clearCart } = cartSlice.actions


export const selectCart = (state) => state.cart

export default cartSlice.reducer