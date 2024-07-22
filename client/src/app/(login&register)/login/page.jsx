'use client'

import { useRolContext } from "@/app/context/RolContext";
import UserForm from "@/components/UserForm/page";
import axios from "axios";
import Swal from 'sweetalert2';
import { useAppDispatch } from '@/lib/hooks';
import { setUser, userLogin } from '@/lib/features/users/userSlice';
const { Fragment } = require("react")

const Login = () => {
    const { setRol } = useRolContext();
    const dispatch = useAppDispatch();
    const createNewUser = async (data, onSuccess, onFail) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/session/login`, data, { withCredentials: true });// withCredentials, permite recibir y mandar cookies
            const result = await response.data;
            setRol(result.user.rol);
            dispatch(userLogin());
            dispatch(setUser(result.user));
            console.log(result.user);
            onSuccess(result); 
            Swal.fire({
                toast: true,
                icon: "success",
                iconColor: "white",
                position: "bottom",
                color: "white",
                title: "Has iniciado sesión correctamente",
                background: "#a5dc86",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        } catch (error) {
            onFail(error);
            console.log(error);
        }
    }
    return (
        <Fragment>
            <UserForm isSignUp={false} onSubmit={createNewUser} />
        </Fragment>
    )
}
export default Login;