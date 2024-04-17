import { useEffect, useState } from "react"
import axiosClient from "../axiosClient"
import { Link } from "react-router-dom"

const user = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getUsers()
    },[])

    const onDeleteClick = (userDelete) => {
        if (!window.confirm('Are You Sure want to delete this user ?')) {
            return
        }

        axiosClient.delete(`/user/${userDelete.id}`)
        .then(()=>{
            const newUser = users.filter((user) => user !== userDelete)
            setUsers(newUser);
        })
        .catch((err)=>{
            console.log(err.response);
        })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users').then(({ data }) => {
            setLoading(false)
            setUsers(data.data)
            console.log(data.data)
        }).catch(() => {
            setLoading(false)
        })
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
                        loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                   <td>{u.id}</td>
                                   <td>{u.name}</td>
                                   <td>{u.email}</td>
                                   <td><img width={90} src={import.meta.env.VITE_BASE_URL+'storage/images/'+u.photo} alt="" /></td>
                                   <td>
                                    <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                                    &nbsp;
                                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                                   </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

export default user
