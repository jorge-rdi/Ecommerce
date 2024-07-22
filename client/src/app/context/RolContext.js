"use client"
import React, { createContext, useContext, useState } from 'react';
// Crea un nuevo contexto llamado RolContext
const RolContext = createContext();

// Crea un proveedor de contexto que envuelve a los componentes hijos y proporciona el estado downloadURLs y la función setDownloadURLs
export const RolProvider = ({ children }) => {
    const [rol, setRol] = useState();

    // Retorna el proveedor de contexto con el valor del estado y la función para actualizarlo
    return (
        <RolContext.Provider value={{ rol, setRol }}>
            {children}
        </RolContext.Provider>
    );
};

// Crea un hook personalizado para acceder al contexto y obtener el estado y la función para actualizarlo
export const useRolContext = () => {
    return useContext(RolContext);
};
