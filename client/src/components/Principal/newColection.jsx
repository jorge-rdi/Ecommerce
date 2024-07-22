import { Grid, Card, Typography } from "@mui/material"
import styles from "./page.module.css";
import Image from "next/image";
import pack from '/public/images/package.svg';
import service from '/public/images/service.svg';
import guarantee from '/public/images/guarantee.svg';

const Colection = () => {
    return (
        <Grid container spacing={3} sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: { lg: '30vh' }, mt: { md: 7, lg: 0, xs: 8 } }}>
            <Grid item xs={10} sm={10} md={3.5} sx={{ display: 'flex' }}>
                <Card sx={{ width: { xs: '80vw', sm: '80vw', md: '25vw' }, textAlign: 'center', boxShadow: 'none' }}>
                    <Image
                        className={styles.imageIcons}
                        src={pack}
                        alt="Image Background T-Shirt"
                    />
                    <Typography sx={{ fontWeight: 'bold' }}>
                        FAST AND FREE DELIVERY
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Free delivery for all orders over $140
                    </Typography>
                </Card>
            </Grid>
            <Grid item xs={10} sm={10} md={3.5} sx={{ display: 'flex' }}>
                <Card sx={{ width: { xs: '80vw', sm: '80vw', md: '25vw' }, textAlign: 'center', boxShadow: 'none' }}>
                    <Grid item sx={{ height: '100%', width: '100%', position: "relative" }}>
                        <Image
                            className={styles.imageIcons}
                            src={service}
                            alt="Image Background T-Shirt"
                        />
                        <Typography sx={{ fontWeight: 'bold' }}>
                            24/7 CUSTOMER SUPPORT
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Friendly 24/7 customer support
                        </Typography>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={10} sm={10} md={3.5} sx={{ display: 'flex' }}>
                <Card sx={{ width: { xs: '80vw', sm: '80vw', md: '25vw' }, textAlign: 'center', boxShadow: 'none' }}>
                    <Grid item sx={{ height: '100%', width: '100%', position: "relative" }}>
                        <Grid item sx={{ height: '100%', width: '100%', position: "relative" }}>
                            <Image
                                className={styles.imageIcons}
                                src={guarantee}
                                alt="Image Background T-Shirt"
                            />
                            <Typography sx={{ fontWeight: 'bold' }}>
                                MONEY BACK GUARANTEE
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Money return within 30 days
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Colection;