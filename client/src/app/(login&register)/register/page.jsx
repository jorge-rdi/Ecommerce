'use client'

import UserForm from "@/components/UserForm/page";
import { Grid } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Swal from 'sweetalert2';

const { Fragment } = require("react")

const Register = () => {
    const createNewUser = async (data, onSuccess, onFail) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/new`, data);
            const result = await response.data;
            console.log(result);
            onSuccess(result);
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Se ha creado la cuenta correctamente",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (error) {
            onFail(error);
        }
    }
    return (
        <Fragment>
            <Grid item height={'100vh'}>
                <UserForm isSignUp={true} onSubmit={createNewUser} />
            </Grid>
        </Fragment>
    )
}
export default Register;