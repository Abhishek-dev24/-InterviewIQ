import { createContext, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";


// Context is created locally so this file only exports components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const register = async (userData) => {
        return await registerUser(userData);
    };


    const login = async (credentials) => {
        const response = await loginUser(credentials);
        const jwtToken = response.access_token;
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
        return response;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const value = {
        token,
        register,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
