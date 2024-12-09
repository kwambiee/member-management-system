"use client"

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface  AuthContextType {
    userId: string | null;
    token: string | null;
    isAuthenticated: boolean;
    registerUser: (userId: string, token: string) => void;
    loginUser: (userId: string, token: string) => void;
    logoutUser: () => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
const router = useRouter();


  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);
      setIsAuthenticated(true);
    }
  }, []);

 
   
    const registerUser =  (userId: string, token: string) => {
        setUserId(userId);
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        router.push("/profile");
    }
    

   const loginUser =  (userId: string, token: string) =>{
    setUserId(userId);
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        router.push("/dashboard");
   }


        const logoutUser =  ()=>{
            setUserId(null);
            setToken(null);
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            router.push("/login");
        }
        

        return (
        <AuthContext.Provider value={{ userId, token, isAuthenticated, registerUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
    
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// [context.userId, context.token, context.loading,context.isAuthenticated, context.registerUser, context.loginUser, context.logoutUser];



