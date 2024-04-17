import { Link, Navigate, Outlet, redirect, useNavigate } from "react-router-dom"
import { useStateContext } from "../context/contextprovider.jsx"
import { useEffect } from "react";
import axiosClient from "../axiosClient.js";

const DefaultLayout = () => {

    const { user, token, setToken, setUser } = useStateContext()
    const navigate = useNavigate()

    if (!token || token === undefined) {
        return <Navigate to='/site'/>
    }

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.delete('/logout').then(() => {
            setUser(null)
            setToken(null)
            return navigate('/site')
        })
    }

    if (token) {
        useEffect(() => {
            axiosClient.get('/user').then(({ data }) => {
                setUser(data)
            }).catch((err) => {
                return navigate('/')
            })
        }, [])

    }

    return (
        <>
            <div id="defaultLayout">
                <div className="content">
                    <header>
                        <div>
                            Header
                        </div>
                        <div>
                            {user?.name} &nbsp;
                            <Link to="/users" className="btn-logout">Users</Link>
                            <Link onClick={onLogout} className="btn-logout">Logout</Link>
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default DefaultLayout
