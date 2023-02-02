import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'

function Login() {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    useEffect(() => {
        let request = async () => {
            let req = await fetch(`http://localhost:3000/users`)
            let res = await req.json()
            setUsers(res)
        }
        request()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        users.some(user => {
            if (user.email === formData.email && user.password === formData.password) {
                setCurrentUser(user)
                console.log("welcome back!")
                navigate('/profile')
            } else {
                console.log('user not found', currentUser)
            }
        })
            ;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (
        <div className="grandparent-form-div">
            <h2 className="gallery-header">ENTER YOUR GALLERY</h2><br />
            <div className="parent-submit-div">
                <div className="" onSubmit={(e) => { handleSubmit(e) }}>
                    <h2 className="login-header">LOG IN</h2><br />
                    <form className="form">
                        <input className="input-field" type="email" value={formData.email} name='email' onChange={e => handleChange(e)} placeholder="EMAIL" /><br />
                        <input className="input-field" type="password" value={formData.password} name='password' onChange={e => handleChange(e)} placeholder="PASSWORD" /><br />
                        <div className="submit-button-div">
                            <input className="submit-button" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login