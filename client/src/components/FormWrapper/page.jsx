import { Fragment } from "react";
import { Avatar, Box, Container, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import styles from "../UserForm/page.module.css";

const FormWrapper = ({ children }) => {
    const Copyright = (value) => {
        return (
            <Typography variant="body2" color="text.secondary" align="center" style={{color:'#FFFF'}} {...value}>
                {'Copyright © '}
                <Link
                    color="#FFF"
                    href="/"
                    style={{
                        textDecoration: 'none',
                        color:'#FFFF'
                    }}>
                    Pistore
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography >
        );
    }
    return (
        <Fragment>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                className= {styles.image}
                >
                <Container component="main" maxWidth="xs" disableGutters={true}>{/**Coloca como un componente MAIN y lo dejo su maxWidth a xs O 12 */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',   
                            p:2.5,
                            padding: 5,
                            mb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius:'10px',
                            backgroundColor: 'rgba(0,0,0,.1)'
            }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#946FB5' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        {children}
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Container>
            </Box>
        </Fragment >
    )
}

export default FormWrapper;