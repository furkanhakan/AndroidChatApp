import React, { useEffect, useState } from "react"
import auth from '@react-native-firebase/auth'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth().onAuthStateChanged(setUser);
        auth().onUserChanged(setUser)
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};