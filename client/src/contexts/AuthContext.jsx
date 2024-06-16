import { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('user_data'))
        console.log('Stored Data:', storedData);
        if (storedData) {
            const { userToken, user } = storedData;
            const decodedToken = jwtDecode(userToken);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                // Token has expired
                localStorage.removeItem('user_data');
                setToken(null);
                setUserData(null);
                setIsAuthenticated(false);
            } else {
                setToken(userToken);
                setUserData(user);
                setIsAuthenticated(true);
            }
        }
        setIsLoading(false)
    }, [])

    const login = (newToken, newData) => {
        console.log('Login:', newToken, newData);
        setToken(newToken)
        setUserData(newData)
        setIsAuthenticated(true)
        setIsLoading(false)
        localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }))
        return true;
    }

    const logout = () => {
        setToken(null)
        setUserData(null)
        setIsAuthenticated(false)
        setIsLoading(false)
        localStorage.removeItem('user_data')
    }

    const updateUserData = (newData) => {
        setUserData(newData);
        const storedData = JSON.parse(localStorage.getItem('user_data'));
        if (storedData) {
            storedData.user = newData;
            localStorage.setItem('user_data', JSON.stringify(storedData));
        }
    };


    return (
        <AuthContext.Provider value={{ token, userData, isAuthenticated, login, logout, isLoading, updateUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)