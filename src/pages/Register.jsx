import React, { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const [err, setErr] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                //TODO:Handle Percentage
                (error) => {
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        // create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });
                }
            );
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div>
            <div className="form-container">
                <div className="formWrapper">
                    <span className="logo">Lets Chat</span>
                    <span className="title">Register</span>

                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='display name' />
                        <input type="email" placeholder='email' />
                        <input type="password" placeholder='password' />
                        <input style={{ display: "none" }} type="file" id="file" />
                        <label htmlFor="file"><AddBoxIcon /><span>Add an image</span></label>
                        <button>SignUp</button>
                        {err && <span style={{ color: "red", fontSize: "14px" }}>Something went wrong</span>}
                    </form>
                    <Link to="/login"> <p>Lets signIn</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Register