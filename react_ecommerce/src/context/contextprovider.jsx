import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie'

const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [token, _setToken] = useState(Cookies.get('ACCESS_TOKEN'))

    const setToken = (token) => {
        _setToken(token)

        if (token) {
            Cookies.set('ACCESS_TOKEN', token, { expires: 1 })
        } else {
            Cookies.remove('ACCESS_TOKEN')
        }
    }

    return (<stateContext.Provider value={{
        user,
        token,
        setUser,
        setToken
    }}>
        { children }
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext)
