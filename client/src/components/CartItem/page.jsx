'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CardMedia, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { decrementQty, incrementQty, removeToCart } from '@/lib/features/carts/cartSlice';

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch()
    const handleItemDelete = (cartId) => {
        dispatch(removeToCart(cartId));
    }
    const handleQtyIncrement = (cartId) => {
        dispatch(incrementQty(cartId));
    }
    const handleQtyDecrement = (cartId) => {
        dispatch(decrementQty(cartId));
    }
    return (
        <Card container sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                <CardContent sx={{ display: 'flex', width: 1, justifyContent: 'space-between' }}>
                    <Grid item>
                        <Typography component="div" variant="h5">
                            {cartItem.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Total: {cartItem.price}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={(e) => { e.preventDefault(); handleItemDelete(cartItem._id); }}>
                            <DeleteOutlineOutlinedIcon sx={{ color: '#FB88B4' }} />
                        </IconButton>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Grid item sx={{ display: 'flex', width: 1, alignItems: 'center', justifyContent: 'space-between', ml: 4 }}>
                        <IconButton onClick={(e) => { e.preventDefault(); handleQtyDecrement(cartItem._id); }}>
                            <DoDisturbOnOutlinedIcon />
                        </IconButton>
                        <Typography>
                            {cartItem.qty}
                        </Typography>
                        <IconButton onClick={(e) => { e.preventDefault(); handleQtyIncrement(cartItem._id); }} >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Grid>
                </CardContent>
            </Box>
            <Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    src={`${cartItem.image}`}
                    alt="Item cover"
                />
            </Box>
        </Card>
    );
}

export default CartItem;