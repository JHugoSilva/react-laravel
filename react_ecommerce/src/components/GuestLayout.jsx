import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/contextprovider.jsx"

const GuestLayout = () => {
    const { token } = useStateContext()
    if (token) {
        return <Navigate to='/' />
    }
    return (
        <>
             <div id="defaultLayout">
                <div className="content">
                    <header>
                        <Link to="/" className="btn btn-add">
                            Header
                        </Link>
                        <div>
                            <Link className="btn btn-add" to="/login">Login</Link>&nbsp;
                            <Link className="btn btn-add" to="/register">Register</Link>
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

export default GuestLayout
