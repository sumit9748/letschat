import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    const [err, setErr] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            //Create user
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")

        } catch (err) {
            setErr(true);
        }
    };
    return (
        <div>
            <div className="form-container">
                <div className="formWrapper">
                    <span className="logo">Lets Chat</span>
                    <span className="title">Login</span>

                    <form action="" onSubmit={handleSubmit}>
                        <input type="email" placeholder='email' />
                        <input type="password" placeholder='password' />
                        <button>SignIn</button>
                        {err && <span style={{ color: "red", fontSize: "14px" }}>Something went wrong</span>}


                    </form>
                    <Link to="/register"> <p>Lets Register First</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Login