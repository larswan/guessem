import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Cookies from 'js-cookie'

const Login = ({ userObj, setUserObj } ) => {
    const navigate = useNavigate()
    const clientId = import.meta.env.VITE_GAPI_CLIENT_ID
    
    // request token from google
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                client_id: clientId,
                redirect_uri: "http://localhost:5173",
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me'
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const logOut = () => {
        Cookies.remove('userId')
        Cookies.remove('userName')
        Cookies.remove('userImage')
        setUserObj(null);
        navigate("/login")
    };

    const onSuccess = async (res) => {
        setUserObj(res);
        // console.log(res)

        let request = async () => {
            let req = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: res.profileObj.email,
                    name: res.profileObj.name,
                    googleId: res.profileObj.googleId,
                    givenName: res.profileObj.givenName,
                    familyName: res.profileObj.familyName,
                    googleImageUrl: res.profileObj.imageUrl,
                    // token: "posted Token"
                })
            })
            let postRes = await req.json()
            console.log(postRes)

            // add user object cookie
            Cookies.set('userId', postRes.id)
            Cookies.set('userName', postRes.name)
            Cookies.set('userImage', postRes.googleImageUrl)
            navigate("/")
        }
        request()
    }

    const onFailure = (err) => {
        console.log('failed:', err);
    };

    return (
        <div className="Login">
            
            <img className="w-2/3" name="logo" alt="GuessDaMate Logo" src="backend/app/assets/images/designAssetts/logo.png"/>
            <div className="flex justify-center ">
                {userObj ? (<GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />) : (
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true} />
                )}
            </div>
        </div>
    )
}
export default Login