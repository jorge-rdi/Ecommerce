'use client'
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Container, Fab, Grid, IconButton, InputAdornment, MenuItem, TextField, Toolbar, Typography, styled } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import QueueIcon from '@mui/icons-material/Queue';
import styles from "../UserForm/page.module.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAll } from "@/app/api/route";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
//-------------------REDUX-------------------------------->
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/page";
import ProductItem from "../ProductItem/page";
import Counter from "./counter";
import { useAppSelector } from '@/lib/hooks';
import { selectRol } from '@/lib/features/users/userSlice';
import { useRouter } from "next/navigation";
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -20,
    left: 0,
    right: 0,
    margin: '0 auto',
});
const ShopPage = () => {
    const rol = useAppSelector(selectRol);
    const router = useRouter();
    console.log(rol);
    const cartItems = useSelector((state) => state.cart.cart);
    const totalPrice = cartItems.reduce((acc, currentItem) => {
        return acc + (currentItem.price * currentItem.qty);
    }, 0)
    const dispatch = useDispatch();
    console.log(cartItems);
    const [product, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState('All');
    const [sizeFilter, setSizeFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [state, setState] = useState({
        left: false
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: Boolean(open) });
    };
    const list = (anchor) => (
        <Grid
            container
            sx={{ width: { lg: '30vw', md: '50vw', sm: '70vw', xs: '100vw' }, p: 2 }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <IconButton onClick={toggleDrawer(anchor, false)}>
                <ClearIcon fontSize="large" />
            </IconButton>
            <Grid item sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4">
                    Shopping Cart
                </Typography>
            </Grid>
            <Grid item sx={{ width: '100%', height: "100vh" }}>
                {
                    cartItems.length < 1 ?
                        <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 30 }}>
                            <ErrorOutlineOutlinedIcon fontSize="large" />
                            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                Aun no ha agregado nada
                            </Typography>
                        </Grid>
                        :
                        cartItems.map((item, idx) => {
                            return <CartItem cartItem={item} key={idx} />
                        })
                }
            </Grid>
            <Grid item sx={{ display: 'flex', width: '100%', bottom: 0, position: 'sticky', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Grid item sx={{ display: 'flex', width: '100%', justifyContent: 'center', color: 'white', bgcolor: '#A2A0D5', p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Total:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {totalPrice} $
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );

    const handleDeleteProduct = (productId) => {
        // Filtra los productos para excluir el eliminado
        const updatedProducts = product.filter(item => item._id !== productId);
        setProduct(updatedProducts);
    };
    const getProducts = async () => {
        try {
            const result = await getAll();
            console.log(result);
            setProduct(result);
            filterProducts(result);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    const filterProducts = (products) => {
        //asigna todo lo de producto a filtered
        let filtered = [...products];
        if (sizeFilter !== 'All') {
            filtered = filtered.filter(item => item.size === sizeFilter);
        }
        if (categoryFilter !== 'All') {
            filtered = filtered.filter(item => item.category === categoryFilter);
        }
        if (search !== '') {
            //Sirve para considerar coincidencias parciales
            const searchLower = search.toLowerCase(); //lo coloca en minuscula 
            filtered = filtered.filter(item => item.title.toLowerCase().includes(searchLower));
        }
        if (priceFilter === 'Lower') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (priceFilter === 'Highest') {
            filtered.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        getProducts();
    }, []);
    useEffect(() => {
        filterProducts(product);
    }, [priceFilter, sizeFilter, categoryFilter, product, search]);


    const handlePriceFilterChange = (event) => {
        setPriceFilter(event.target.value);
    };
    const handleSizeFilterChange = (event) => {
        setSizeFilter(event.target.value);
    };
    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };
    const handleSearchFilterChange = (event) => {
        setSearch(event.target.value);
    };

    const sty = {
        color: '#FFFF',
        '& label.Mui-focused': {
            color: 'black',
            borderColor: 'black'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                color: 'black',
                borderColor: 'black'
            }
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
        },
        width: { xs: '90vw', sm: '300px', md: "180px", lg: '250px' },
    };
    const styFil = {
        color: '#FFFF',
        '& label.Mui-focused': {
            color: 'black',
            borderColor: 'black'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                color: 'black',
                borderColor: 'black'
            }
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
        },
        width: "100%"
    };

    return (
        <Fragment>
            {
                rol === 'admin' ?
                    <AppBar color="transparent" sx={{ top: 'auto', bottom: 80, width: '0px', left: { sm: '85%', xs: '75%' }, boxShadow: 'none', display: 'flex' }}>
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
                    </AppBar> : rol != 'user' || rol === '' ?
                        null :
                        null
            }
            <Toolbar sx={{ height: '80px' }} />
            <Container maxWidth="xl">
                <Grid container sx=
                    {{
                        height: { sm: '15vh', xs: '12vh', md: '100vh' },
                        display: 'flex',
                        width: 1,
                        alignItems: { md: 'flex-start', sm: 'center', xs: 'center' },

                    }}>
                    <Grid item md={2.5} sm={12} xs={12}>
                        <Grid item sx={{
                            display: 'flex', position: { md: 'fixed', sm: 'inherit', xs: 'inherit' },
                            alignItems: 'center',
                            justifyContent: { md: 'center', sm: 'space-between' },
                            flexDirection: { md: 'column', sm: 'row-reverse', xs: 'column' }
                        }} >
                            <Grid item>
                                <TextField
                                    onChange={handleSearchFilterChange}
                                    InputProps={{
                                        className: styles.input,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={sty}
                                    name="search"
                                    label="Search"
                                />
                            </Grid>
                            <Grid item>
                                <Accordion sx={{
                                    width: { xs: '90vw', sm: '200px', md: "180px", lg: '250px' },
                                    mb: 2, mt: 2
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Filter
                                    </AccordionSummary>
                                    <AccordionDetails
                                    >
                                        <TextField
                                            select
                                            sx={styFil}
                                            defaultValue={'All'}
                                            name="size"
                                            label="Seleccione la talla"
                                            onChange={handleSizeFilterChange}
                                        >
                                            <MenuItem value="All">
                                                Select All
                                            </MenuItem>
                                            <MenuItem value="S">
                                                S
                                            </MenuItem>
                                            <MenuItem value="M">
                                                M
                                            </MenuItem>
                                            <MenuItem value="L">
                                                L
                                            </MenuItem>
                                            <MenuItem value="XL">
                                                XL
                                            </MenuItem>
                                        </TextField>
                                        <TextField
                                            select
                                            sx={styFil}
                                            style={{ marginTop: '20px' }}
                                            defaultValue={'All'}
                                            onChange={handleCategoryFilterChange}
                                            name="category"
                                            label="Categoria"
                                        >
                                            <MenuItem value="All">
                                                Select All
                                            </MenuItem>
                                            <MenuItem value="Casual">
                                                Casual
                                            </MenuItem>
                                            <MenuItem value="Deportivas">
                                                Deportiva
                                            </MenuItem>
                                            <MenuItem value="Street wear">
                                                Street Wear
                                            </MenuItem>
                                            <MenuItem value="Formales">
                                                Formal
                                            </MenuItem>
                                        </TextField>
                                        <TextField
                                            select
                                            sx={styFil}
                                            style={{ marginTop: '20px' }}
                                            defaultValue={'All'}
                                            name="price"
                                            label="Price"
                                            onChange={handlePriceFilterChange}
                                        >
                                            <MenuItem value="All">
                                                Select All
                                            </MenuItem>
                                            <MenuItem value="Lower">
                                                Lower
                                            </MenuItem>
                                            <MenuItem value="Highest">
                                                Highest
                                            </MenuItem>
                                        </TextField>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/**---------------------PRODUCTS SECTION-------------------------------------------> */}
                    <Grid item md={9.5} sm={12} xs={12} sx={{ height: '100vh', width: "100%" }}>
                        <Grid container sx={{ display: 'flex' }}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((item, idx) => {
                                    return (
                                        <ProductItem product={item} key={idx} onDelete={handleDeleteProduct} />
                                    )
                                })) : (
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 4 }}>
                                    No se han encontrado resultados.
                                </Typography>)
                            }
                        </Grid>
                        <AppBar color="transparent" sx={{ top: 'auto', bottom: 0, width: '0px', left: { sm: '85%', xs: '75%' }, boxShadow: 'none', display: 'flex' }}>
                            <Toolbar sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <StyledFab aria-label="add" variant="contained" sx={{ p: 4 }} onClick={toggleDrawer('right', true)}>
                                    <StyledBadge badgeContent={<Counter />} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </StyledFab>
                                <Box sx={{ flexGrow: 1 }} />
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            {list('right')}
                        </Drawer>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
}


export default ShopPage;
