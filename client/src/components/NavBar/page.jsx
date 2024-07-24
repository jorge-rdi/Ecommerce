'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { Grid } from '@mui/material';
import { useCookies } from 'next-client-cookies';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectRol } from '@/lib/features/users/userSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import { clearCart } from '@/lib/features/carts/cartSlice';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/lib/features/users/userSlice';
const pages = ['Productos', 'Inicio'];
const settings = ['Cerrar Sesión', 'Iniciar Sesión'];
const href = ['/shop', '/',]

function NavBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const rol = useAppSelector(selectRol);
    const router = useRouter();
    const dispatch = useDispatch();
    const cookies = useCookies();
    const miCookie = cookies.get('userToken');
    console.log(miCookie);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/session/logout`, { withCredentials: true });
            const result = await response.data;
            console.error(result);
            router.push('/login');
            dispatch(clearCart());
            dispatch(clearUser());
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Has cerrado sesión correctamente",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogin = () => {
        router.push('/login')
    };

    return (
        <AppBar sx={{ bgcolor: 'transparent', boxShadow: 'none', color: 'green', background: 'rgba(255, 255, 255, 0.5)', backdropFilter: "blur(5px)" }}>
            <Container maxWidth="xl" position="sticky">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            color: '#A2A0D5'
                        }}
                    >
                        Pistore
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'flex', flexDirection: 'column', md: 'none' },
                            }}
                        >
                            {pages.map((page, idx) => (
                                <Grid item key={idx}>
                                    <Link key={page}
                                        href={href[idx]}
                                        sx={{
                                            textDecoration: 'none',
                                            my: 2, mx: 1,
                                            fontWeight: 400,
                                        }}
                                    >
                                        <Button
                                            sx={{
                                                textTransform: 'none',
                                                color: 'black',
                                                p: 2
                                            }}
                                            onClick={handleCloseNavMenu}
                                        >
                                            {page}
                                        </Button>
                                    </Link>
                                </Grid>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            color: '#A2A0D5'
                        }}
                    >
                        Pistore
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mr: 17 }}>
                        {pages.map((page, idx) => (
                            <Link key={page}
                                href={href[idx]}
                                sx={{
                                    textDecoration: 'none',
                                    my: 2, mx: 1,
                                    fontWeight: 400,

                                }}
                            >
                                <Button
                                    sx={{
                                        textTransform: 'none',
                                        color: 'black'
                                    }}
                                    onClick={handleCloseNavMenu}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Usuario">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" sx={{ color: '#946FB5', bgcolor: 'lightgray' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                miCookie && rol !== undefined ?
                                    <MenuItem onClick={() => { handleCloseUserMenu; handleLogout() }}>
                                        <Typography textAlign="center">{settings[0]}</Typography>
                                    </MenuItem> :
                                    <MenuItem onClick={()=>{handleCloseUserMenu; handleLogin()}}>
                                        <Typography textAlign="center">{settings[1]}</Typography>
                                    </MenuItem>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default NavBar;
