import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const storedData = JSON.parse(localStorage.getItem('user_data'))


    useEffect(() => {
        if (storedData) {
            const { userToken, user } = storedData;
            setToken(userToken)
            setUserData(user)
            setIsAuthenticated(true)
        }
    }, [])

    const login = (newToken, newData) => {

        setToken(newToken)
        setUserData(newData)
        setIsAuthenticated(true)
        localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }))
    }

    const logout = () => {
        setToken(null)
        setUserData(null)
        setIsAuthenticated(false)
        localStorage.removeItem('user_data')
    }


    return (
        <AuthContext.Provider value={{ token, userData, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)