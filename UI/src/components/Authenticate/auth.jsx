
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(authStatus);
    }, []);

    const login = () => {
        sessionStorage.setItem("isAuthenticated", "true");
       
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
