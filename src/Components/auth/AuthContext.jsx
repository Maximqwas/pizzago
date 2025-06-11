import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('userName');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userName) => {
        localStorage.setItem('userName', userName);
        setUser(userName);
    };

    const logout = () => {
        localStorage.removeItem('userName');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
