'use server'
import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export async function middleware(request) {
    // Obtiene el token de usuario de las cookies
    const userToken = request.cookies.get('userToken');
    const response = NextResponse.next();
    if (userToken) {
        // Decodifica el token del usuario
        const decodedToken = jwtDecode(userToken?.value);
        console.log(decodedToken)
        // Verifica el rol del usuario
        if (decodedToken.rol !== 'admin') {
            return NextResponse.redirect(new URL('http://localhost:3000/', request.url));
        }
    } else {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
}

export const config = {
    matcher:'/newPost',
}
