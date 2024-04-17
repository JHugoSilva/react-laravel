import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axiosClient"

const UserForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    if (id) {
        useEffect(() => {
            setLoading(true)
            getUser(id)
        }, [])
    }

    const getUser = (id) => {
        axiosClient.get(`user/${id}`)
            .then(({ data }) => {
                setLoading(false)
                setUser(data.data)
            }).catch(() => {
                setLoading(false)
            })
    }

    const store = () => {
        const formData = new FormData()
        formData.append('name', user.name)
        formData.append('email', user.email)
        formData.append('password', user.password)
        formData.append('image', image)

        axiosClient.post('user', formData)
            .then(() => {
                navigate('/users')
            }).catch((err) => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })

    }

    const update = (id) => {
        const formData = new FormData()
        formData.append('name', user.name)
        formData.append('email', user.email)
        formData.append('password', user.password)
        formData.append('image', image)
        console.log(formData);
        axiosClient.post(`user/${id}`, formData).then(() => {
                navigate('/users')
            }).catch((err) => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (user.id) {
            update(user.id)
        } else {
            store()
        }
    }

    const fileInputRef = useRef();
    //simulate click on this input  -attach ref to input
    // to put value in state we need to put onChange

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            //reader.readAsArrayBuffer <-  arraybuffer
            reader.readAsDataURL(image); //represented as a base64string
        } else {
            setPreview(null);
        }
    }, [image]);

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                        <button className="btn"
                            onClick={(event) => {
                                event.preventDefault();
                                fileInputRef.current.click();
                            }}
                        >
                            Add Image
                        </button>
                        <br />
                        <br />
                        {(preview) ? <img src={preview} width={250} /> : <img src={import.meta.env.VITE_BASE_URL + 'storage/images/' + user.photo} width={250} />}
                        <br />
                        <input
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={(event) =>
                                setImage(event.target.files[0])
                            }
                        />
                        <input type="text" value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Name" />
                        <input type="email" value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email" />
                        <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}


export default UserForm
