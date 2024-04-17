import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../context/contextprovider"
import axiosClient from "../axiosClient"


const login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [errorsUser, setErrorsUser] = useState(null)
    const [errors, setErrors] = useState(null)
    const { setUser, setToken } = useStateContext()

    const Submit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/login', payload).then(({ data }) => {
            setUser(data.user)
            setToken(data.token)
        }).catch(err => {
            const response = err.response
            console.log(response);
            if (response.status === 401) {
                setTimeout(() => {
                    setErrorsUser('');
                }, 3000)
            }
            if (response.status === 422) {
                setErrors(response.data.errors);
                setTimeout(() => {
                    setErrors('')
                }, 3000)
            }
            // console.log(err);
        })
    };

    return (
        <>
            <div className="login-signup-form animated fadeinDown">
                <div className="form">
                    <div className="animated fadeInDown">
                        {errors &&
                                <div className="alert">
                                    {Object.keys(errors).map(key => (
                                        <p key={key}>{errors[key][0]}</p>
                                    ))}
                                </div>
                            }
                            {
                                errorsUser &&
                                <div className="alert">
                                    <p>{errorsUser}</p>
                                </div>
                            }
                    </div>
                    <h1 className="title">Login to Your Acount</h1>
                    <form onSubmit={Submit}>
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <button className="btn btn-block">Login</button>
                        <p className="message">
                            Not Register? <Link to="/register">Create new account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default login
