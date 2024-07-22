'use client'
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from "next/navigation";
const PopularProd = ({ product }) => {
    const router = useRouter();
    return (
        <Grid item sm={6} md={3} lg={2.5} xs={12} sx={{ width: '100vw', display: 'flex', justifyContent: 'center', mt:2 }}>
            <Card>
                <CardMedia
                    sx={{ width: { lg: '270px', md: '200px', sm: '260px', xs: '90vw' }, height: '350px' }}
                    component="img"
                    src={`${product?.image[0]}`}
                    alt="Product Image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {product?.category}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bolder' }}>
                        {product?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product?.price} $
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites"
                    onClick={() => { router.push('/shop')}}
                        sx={{
                            bgcolor: '#A2A0D5',
                            borderRadius: '50px',
                            color: 'white',
                            ":hover": { bgcolor: "#A2A0D5" }
                        }}>
                        <Typography>Go shopping</Typography>
                        <ArrowForwardIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default PopularProd;