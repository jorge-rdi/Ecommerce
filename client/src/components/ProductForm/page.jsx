'use client'
import Dropzone from "@/components/Dropzone/page";
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { usePostContext } from "../../app/context/PostContext";
import styles from "../UserForm/page.module.css";
import { newPost } from "@/app/api/route";
import Swal from "sweetalert2";
import Link from "next/link";

const ProductForm = () => {
    const { downloadURLs } = usePostContext();
    const router = useRouter();
    const [error, setErrors] = useState({});
    const [filesUploaded, setFilesUploaded] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            price: formData.get('price'),
            category: formData.get('category'),
            size: formData.get('size'),
            color: formData.get('color'),
            image: downloadURLs,
            stock: formData.get('stock'),
        }
        try {
            const result = await newPost(data);
            console.log(result);
            router.push("/");
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "se ha subido el producto correctamente",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.log(error);
            const valErrors = error.response.data.message.errors;
            setErrors({
                title: valErrors.title?.message ? valErrors.title.message : "",
                description: valErrors.description?.message ? valErrors.description.message : "",
                price: valErrors.price?.message ? valErrors.price.message : "",
                category: valErrors.category?.message ? valErrors.category.message : "",
                size: valErrors.size?.message ? valErrors.size.message : "",
                color: valErrors.color?.message ? valErrors.color.message : "",
                image: valErrors.image?.message ? valErrors.image.message : "",
                stock: valErrors.stock?.message ? valErrors.stock.message : ""
            });
            console.log(error);
        }
    };
    const sty = {
        color: '#FFFF',
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
        borderRadius: '20px',
    };
    const handleFilesUploaded = (uploaded) => {
        setFilesUploaded(uploaded);
    };
    return (
        <Fragment>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                className={styles.image}
            >
                <Container component="main" maxWidth="sm" disableGutters={true}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2.5,
                            mb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(0,0,0,.1)'
                        }}
                    >
                        <Container component="main" maxWidth="lg">
                            <Box component="form" onSubmit={handleSubmit} noValidate>
                                <Typography variant="h5" sx={{ color: "white", textAlign: 'center', mb: 4 }}>
                                    Agregar Producto
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <TextField
                                            required
                                            InputProps={{ className: styles.input }}
                                            InputLabelProps={{
                                                style: { color: '#fff' } // Cambia el color del placeholder aquí
                                            }}
                                            sx={sty}
                                            name="title"
                                            label="Título"
                                            fullWidth
                                            error={error?.title ? true : false}
                                            helperText={error?.title?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            required
                                            InputProps={{ className: styles.input }}
                                            InputLabelProps={{
                                                style: { color: '#fff' } // Cambia el color del placeholder aquí
                                            }}
                                            sx={sty}
                                            name="price"
                                            label="Precio"
                                            fullWidth
                                            type="number"
                                            error={error?.price ? true : false}
                                            helperText={error?.price?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            select
                                            sx={sty}
                                            InputProps={{ className: styles.input }}
                                            InputLabelProps={{
                                                style: { color: '#fff' } // Cambia el color del placeholder aquí
                                            }}
                                            defaultValue={'S'}
                                            name="size"
                                            label="Seleccione la talla"
                                            fullWidth
                                        >
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
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            select
                                            sx={sty}
                                            InputProps={{ className: styles.input }}
                                            InputLabelProps={{
                                                style: { color: '#fff' } // Cambia el color del placeholder aquí
                                            }}
                                            defaultValue={'Casual'}
                                            name="category"
                                            label="Seleccione la categoria"
                                            fullWidth
                                        >
                                            <MenuItem value="Casual">
                                                Casual
                                            </MenuItem>
                                            <MenuItem value="Deportivas">
                                                Deportivas
                                            </MenuItem>
                                            <MenuItem value="Street wear">
                                                Street wear
                                            </MenuItem>
                                            <MenuItem value="Formales">
                                                Formales
                                            </MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            multiline
                                            rows={4}
                                            InputProps={{ className: styles.input }}
                                            InputLabelProps={{
                                                style: { color: '#fff' } // Cambia el color del placeholder aquí
                                            }}
                                            sx={sty}
                                            name="description"
                                            label="Descripcion"
                                            fullWidth
                                            error={error?.description ? true : false}
                                            helperText={error?.description?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}  >
                                        <TextField
                                            required
                                            InputProps={{ className: styles.input }}
                                            InputLabelProps={{
                                                style: { color: '#fff' } // Cambia el color del placeholder aquí
                                            }}
                                            sx={sty}
                                            name="color"
                                            label="Color"
                                            fullWidth
                                            error={error?.color ? true : false}
                                            helperText={error?.color?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            required
                                            InputProps={{ className: styles.input }}
                                            InputLabelProps={{
                                                style: { color: '#fff' } // Cambia el color del placeholder aquí
                                            }}
                                            sx={sty}
                                            name="stock"
                                            label="stock"
                                            type="number"
                                            fullWidth
                                            error={error?.stock ? true : false}
                                            helperText={error?.stock?.message}
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Grid item xs={12} >
                                            <Dropzone onFilesUploaded={handleFilesUploaded} />
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            disabled={!filesUploaded}
                                            sx={{
                                                mt: 3,
                                                mb: 3,
                                                borderRadius: '50px',
                                                backgroundColor: '#946FB5',
                                                '&:hover': {
                                                    backgroundColor: '#946FB5',
                                                },
                                            }}
                                        >
                                            Publicar
                                        </Button>
                                    </Grid>
                                    <Grid item sx={{width:'100%',display:'flex', justifyContent:'flex-end'}}>
                                        <Link href={'/'} color="white" style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                            fontSize: 20,
                                        }}>Volver a Inicio</Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    </Box>
                </Container>
            </Box >
        </Fragment >
    )
}

export default ProductForm;