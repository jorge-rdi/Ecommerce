'use client'
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/carts/cartSlice";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from "react";
import { useAppSelector } from '@/lib/hooks';
import { selectRol } from '@/lib/features/users/userSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { Delete } from "@/app/api/route";
import { useCookies } from 'next-client-cookies';
import Link from "next/link";



const ProductItem = ({ product, onDelete }) => {
    const dispatch = useDispatch();
    const cookies = useCookies();
    const miCookie = cookies.get('userToken');
    const [open, setOpen] = useState(false);
    const rol = useAppSelector(selectRol);
    console.log(rol);
    //---------------------CART STORAGE----------------------------------->
    const handleAddItemToCart = () => {
        dispatch(addToCart(product))
        console.log(product);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteProduct = async () => {
        try {
            // Llama a la función que elimina el producto
            await Delete(product._id);
            onDelete(product._id);
            dispatch(removeToCart(updatedProducts));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    const stock = Math.ceil(product.stock);

    return (
        <Grid item sm={6} md={4} lg={3} xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Card>
                <CardMedia
                    sx={{ width: { lg: '260px', md: '200px', sm: '260px', xs: '100vw' }, height: '350px' }}
                    component="img"
                    src={product.image[0]}
                    alt="Product Image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {product.category}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bolder' }}>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.price} $
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {
                        miCookie ?
                            <IconButton aria-label="add to favorites" onClick={handleAddItemToCart} >
                                <ShoppingCartCheckoutOutlinedIcon />
                            </IconButton> :
                            null
                    }
                    <IconButton aria-label="share" onClick={handleClickOpen}>
                        <RemoveRedEyeOutlinedIcon />
                    </IconButton>
                    {rol === "admin" && (
                        <IconButton onClick={handleDeleteProduct} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </CardActions>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ width: '100%', height: '100%', overflow: 'hidden' }}
            >
                <DialogContent sx={{ overflow: 'hidden' }}>
                    <Grid item sm={12} md={12} lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Card sx={{ boxShadow: 'none', display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'row' }, width: '700px' }}>
                            <Grid item>
                                <CardMedia
                                    sx={{ width: { lg: '260px', md: '200px', sm: '260px', xs: '100%' }, height: '350px' }}
                                    component="img"
                                    src={product.image[0]}
                                    alt="Product Image"
                                />
                            </Grid>
                            <Grid item sx={{ width: { md: '100vw', xs: '50', sm: '50vw' } }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mt={2}>
                                        {product.description} 
                                    </Typography>
                                    <Typography variant="h4" color="text.secondary" mt={2}>
                                        {product.price} $
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mt={2}>
                                        SIZE: {product.size}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" >
                                        {product.category}
                                    </Typography>
                                    <Grid item sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                                        <Typography variant="body2" color="text.secondary" >
                                            Color: {product.color}
                                        </Typography>
                                        <Grid item sx={{ display: 'flex' }}>
                                            <Typography variant="body2" color="text.secondary" >
                                                Disponibles:
                                            </Typography>
                                            <Grid sx={{ color: stock < 5 ? 'red' : stock <= 15 ? 'orange' : 'black' }}>{product.stock}</Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {miCookie ?
                                        <IconButton aria-label="add to favorites" onClick={handleAddItemToCart}
                                            sx={{
                                                bgcolor: '#A2A0D5',
                                                borderRadius: '50px',
                                                color: 'white',
                                                ":hover": { bgcolor: "#A2A0D5" }
                                            }}>
                                            <Typography>Add to cart</Typography>
                                            <ShoppingCartCheckoutOutlinedIcon />
                                        </IconButton> :
                                        <IconButton aria-label="add to favorites" onClick={handleAddItemToCart}
                                            sx={{
                                                bgcolor: '#A2A0D5',
                                                borderRadius: '50px',
                                                color: 'white',
                                                ":hover": { bgcolor: "#A2A0D5" }
                                            }}>
                                            <Link href={'/login'} color="white" style={{
                                                textDecoration: 'none',
                                                color: 'white',
                                                fontSize: 20,
                                            }}>Want to buy? Sing in</Link>
                                        </IconButton>
                                    }
                                </CardActions>
                            </Grid>
                        </Card>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Grid>
    )
}

export default ProductItem;