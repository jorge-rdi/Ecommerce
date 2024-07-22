'use client'
import { Fragment, useState } from "react";
import Box from '@mui/material/Box';;
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Container, CssBaseline, Grid, MobileStepper, TextField } from "@mui/material";
import { passwordReset, passwordResetToken } from "@/app/api/route";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
const steps = ['a', 'b', 'c'];
const PasswordResetForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = async () => {
        if (activeStep === 0) {
            try {
                const getToken = await passwordResetToken({ email: email });
                console.log(getToken);
                Swal.fire({
                    toast: true,
                    icon: "success",
                    iconColor: "white",
                    position: "bottom",
                    color: "white",
                    title: "Se ha enviado el correo correctamente",
                    background: "#a5dc86",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } catch (error) {
                console.log(error);
            }
        }
        else if (activeStep === 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
        else if (activeStep === 2) {
            try {
                const data = {
                    email: email,
                    password: password,
                    token: token
                }
                console.log(data);
                const updatePassword = await passwordReset(data);
                console.log(updatePassword);
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setTimeout(() => {
                    router.push("/login")
                }, 2000);

            } catch (error) {
                console.log(error);
            }
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const sty = {
        '& label.Mui-focused': {
            color: '#fff',
            borderColor: '#fff'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                color: '#fff',
                borderColor: '#fff'
            }
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
        },
        borderRadius: '20px'
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            className={styles.image}>
            <Container component="main" maxWidth="sm" disableGutters={true}>{/**Coloca como un componente MAIN y lo dejo su maxWidth a xs O 12 */}
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 5,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(0,0,0,.1)'
                    }}
                >
                    <Avatar sx={{ bgcolor: '#946FB5' }}>?</Avatar>
                    <Box sx={{ pt: 2, pb: 5 }}>
                        <Typography variant='h5' color={'white'}>
                            Solicita tu codigo
                        </Typography>

                    </Box>
                    {activeStep === steps.length ? (
                        <Box>
                            <Typography sx={{ mt: 2, mb: 1 }} color={'white'}>
                                Password Changed Succesfully
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </Box>
                    ) : (
                        <Fragment>

                            <Box sx={{
                                width: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 6,
                                py: 3
                            }}>
                                {
                                    activeStep === 0 &&
                                    <TextField
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email"
                                        InputProps={{ className: styles.input }}
                                        InputLabelProps={{
                                            style: { color: '#fff' } // Cambia el color del placeholder aquí
                                        }}
                                        sx={sty}
                                        fullWidth
                                    />
                                }
                                {
                                    activeStep === 1 &&
                                    <MuiOtpInput length={6} value={token} onChange={setToken} sx={sty} />
                                }
                                {
                                    activeStep === 2 &&
                                    <TextField
                                        variant="outlined"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="New Password"
                                        type="password"
                                        InputProps={{ className: styles.input }}
                                        InputLabelProps={{
                                            style: { color: '#fff' } // Cambia el color del placeholder aquí
                                        }}
                                        sx={sty}
                                        fullWidth
                                    />
                                }
                                <Container component="main" maxWidth="xs" disableGutters={true} >
                                    <MobileStepper
                                        variant="progress"
                                        steps={4}
                                        position="static"
                                        activeStep={activeStep}
                                        className={styles.input}
                                        sx={{ flexGrow: 1, pt: 8, bgcolor: 'transparent' }}
                                        nextButton={
                                            <Button size="small" onClick={handleNext} disabled={activeStep === 3} sx={{ color: '#FFF' }}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next >'}
                                            </Button>
                                        }
                                        backButton={
                                            <Button size="small" onClick={handleBack} sx={{ color: '#FFF' }} disabled={activeStep === 0 || activeStep === 1} >
                                                {activeStep === steps.length - 1 ? '< Back' : '< Back'}
                                            </Button>
                                        }
                                    />
                                </Container>
                            </Box>
                            <Grid container justifyContent="flex-end" sx={{ px: 5 }}>
                                <Grid item>
                                    <Grid Grid item xs={12} sm={12} >
                                        <Link href="/register" className={styles.link}>
                                            Volver al Registro?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )}
                </Box>
            </Container >
        </Box >
    );
}

export default PasswordResetForm;