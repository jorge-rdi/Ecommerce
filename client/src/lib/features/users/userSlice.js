import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: "",
        logged: false,
        rol: "",
        firstName: "",
        lastName: "",
    },
    reducers: {
        userLogin: state => {
            state.logged = true;
        },
        userLogout: state => {
            state.logged = false;
        },
        setUser: (state, action) => {
            state.rol = action.payload.rol;
            state._id = action.payload._id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;

        },
        clearUser: state => {
            state.rol = "";
            state._id = "";
            state.firstName = "";
            state.lastName = "";
        },

    }
})

export const { userLogin, userLogout, setUser, clearUser } = userSlice.actions


export const selectLogged = (state) => state.user.logged
export const selectRol = (state) => state.user.rol
export const selectUser = (state) => state.user

export default userSlice.reducer