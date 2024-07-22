'use client'
import { getAll } from "@/app/api/route";
import { AppBar, Box, Button, Card, Container, Divider, Fab, Grid, Toolbar, Typography, styled } from "@mui/material";
import QueueIcon from '@mui/icons-material/Queue';
import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from '@/lib/hooks';
import { selectRol } from '@/lib/features/users/userSlice';
import { useRouter } from "next/navigation";
import tshirt from '/public/images/tshirt.png';
import styles from "./page.module.css";
import Image from "next/image";
import { Inter } from 'next/font/google';
import Colection from "./newColection";
import PopularProd from "./popularProducts";
import Foot from "../Footer/page";
const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -20,
    left: 0,
    right: 0,
    margin: '0 auto',
});
const CustomFont = Inter({
    weight: '400',
    subsets: ['latin'],
    fontStyle: "normal"
});


const Principal = () => {
    const [product, setProduct] = useState([]);
    const rol = useAppSelector(selectRol);
    const router = useRouter();
    console.log(rol);

    const getProduct = async () => {
        try {
            const result = await getAll();
            const limitResult = result.slice(0, 4)
            setProduct(limitResult);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    console.log(height);


    return (
        <Fragment>
            <Grid container maxWidth="100vw">
                {
                    rol === 'admin' ?
                        <AppBar color="transparent" sx={{ top: 'auto', bottom: 0, width: '0px', left: { sm: '85%', xs: '75%' }, boxShadow: 'none', display: 'flex' }}>
                            <Toolbar sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <StyledFab aria-label="add" variant="contained" sx={{
                                    p: 4,
                                    height: '50px', width: { xs: '50px', sm: '50px', md: '50px' },
                                    mb: 3,
                                    color: 'white',
                                    borderRadius: '50px',
                                    backgroundColor: '#946FB5',
                                    '&:hover': {
                                        backgroundColor: '#946FB5',
                                    },
                                }
                                }
                                    onClick={() => { router.push('/newPost') }}
                                >
                                    <QueueIcon sx={{ height: '30px', width: '30px' }} />
                                </StyledFab>
                                <Box sx={{ flexGrow: 1 }} />
                            </Toolbar>
                        </AppBar> : rol === 'user' || rol === ''  ?
                            <Grid></Grid> :
                            null
                }
                <Grid container sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item sx={{
                        height: { sm: '100%', md: '100%', xs: "100%" },
                        width: { sm: '100%', md: '50%', xs: "100%" },
                        display: 'flex',
                        p: { md: 10, xs: 5 },
                        justifyContent: 'center',
                        flexDirection: 'column',
                        height: '100vh',
                        background: { sm: 'transparent', md: '#EBE4F1', xs: "transparent" },
                        backdropFilter: "blur(2.5px)",

                    }}>
                        <Grid item sx={{ mb: { xs: 2, sm: 4, md: 2 } }}>
                            <Typography className={CustomFont.className} sx={{
                                fontSize: { xs: 40, sm: 40, md: 70 },
                                textAlign: 'initial'
                            }} >
                                WEAR YOUR ATITTUDE
                            </Typography>
                            <Typography className={CustomFont.className} sx={{
                                fontSize: { xs: 40, sm: 47, md: 50 },
                                textAlign: 'initial',
                                fontWeight: 'bolder',
                                color: '#4b494d'
                            }}>
                                EXPRESS YOUR STYLE!
                            </Typography>
                        </Grid>
                        <Grid item sx={{ width: 1, justifyContent: 'center' }}>
                            <Button sx={{
                                background: "#C2AFD4",
                                borderRadius: 3,
                                color: "white",
                                height: 50,
                                width: { sm: 150, xs: 200, md: 200 },
                                padding: "0 30px",
                                boxShadow: "0 3px 5px 2px #B8A2CD",
                                '&:hover': {
                                    backgroundColor: '#946FB5',
                                }
                            }}
                                onClick={() => { router.push('/shop') }}
                            >Shop Now</Button>
                        </Grid>
                    </Grid>
                    <Grid item sx={{
                        height: { sm: '100%', md: '100%', xs: "100%" },
                        width: { sm: '100%', md: '50%', xs: "100%" },
                        position: { xs: 'absolute', sm: 'absolute', md: 'inherit' },
                        zIndex: { xs: -1, sm: -1, md: 1 },
                        height: '100vh'
                    }}>
                        <Image
                            className={styles.image}
                            src={tshirt}
                            alt="Image Background T-Shirt"
                        />
                    </Grid>
                </Grid>
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Grid item sx={{
                        width: { md: '70%', sm: '50%', xs: "100%" },
                        height: { md: '70%', sm: '50%', xs: "100%" },
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                    </Grid>
                    <Colection />
                </Container>
            </Grid>
            <Grid>
                <Divider variant="middle" sx={{ my: { xs: 10, sm: 10, lg: 0 }, mt: { xs: 10, lg: 15, md: 10 } }} />
            </Grid>
            <Grid item sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',

            }}>
                <Grid item sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: { md: "30px" } }}>
                        MOST POPULAR T-SHIRTS
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        The most premium brand in your destination.
                    </Typography>
                </Grid>
                <Grid container sx={{ width: "100%", justifyContent: 'center', height: { lg: '50%', md: "50%", xs: '90vh' } }}>
                    {
                        product.map((item, idx) => {
                            return (
                                <PopularProd product={item} key={idx} />
                            )
                        })
                    }
                </Grid>
            </Grid>
            <Grid item sx={{ mt: { lg: 0, md: 0, sm: 35, xs: height <= 667 ? 195 : 170 } }}>
                <Foot />
            </Grid>
        </Fragment>
    )
}

export default Principal;