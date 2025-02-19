import {createContext, useContext, useState, useEffect, Children} from "react";
import {api} from "../lib/api";
import exp from "constants";

type User={
    id: number;
    email: string;
    name: string;
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await api.post("/login", {email,password});
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.access_token);
        setUser(response.data);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth는 AuthProvider 내에서 사용해야 함");
    }
    return context;
};