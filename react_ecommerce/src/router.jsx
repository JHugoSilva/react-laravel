import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import Login from './views/login'
import Register from './views/register'
import User from './views/user'
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from './components/GuestLayout'
import UserForm from './views/UserForm'
import Site from './views/site'

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/users',
                element: <User/>
            },
            {
                path: '/users/new',
                element: <UserForm key="UserCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="UserUpdate"/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/site',
                element: <Site/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    },
])

export default router
