import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const Login = ({}) => {
    const navigate = useNavigate()
    const clientId = import.meta.env.VITE_GAPI_CLIENT_ID
    const [userObj, setUserObj] = useState(null)
    
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
        // setUserObj(null);
        navigate("/")
    };

    const onSuccess = async (res) => {
        console.log(res)
        
        
        setUserObj(res.profileObj);
        navigate("/", {state: {
            user: userObj
        }})
        // console.log(res.profileObj.imageUrl)
    }
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    return (
        <div className="footerContainer">
            <div className="login">
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