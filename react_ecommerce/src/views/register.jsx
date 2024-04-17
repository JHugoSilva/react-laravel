import { useRef } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/contextprovider";
import axiosClient from "../axiosClient";

const register = () => {

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const { setUser, setToken } = useStateContext()

    const Submit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/register', payload).then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        }).catch(err => {
            const response = err.response
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
            console.log(err);
        })
    };
    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Create A New Acount</h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="text" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button type="submit" className="btn btn-block">Register</button>
                    <p className="message">
                       Already Have An Account?
                        <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default register;
