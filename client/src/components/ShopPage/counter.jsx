'use client'
import { useSelector } from "react-redux"
const Counter = () =>{
    const cartItems = useSelector((state) => state.cart.cart);
    return(
        <span>{cartItems.length}</span>
    )
}


export default Counter;