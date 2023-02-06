import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const Login = ({}) => {
    const navigate = useNavigate()
    const clientId = import.meta.env.GOOGLE__CLIENT_ID
    const [userObj, setUserObj] = useState()
    
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const logOut = () => {
        setProfile(null);
        navigate("/")
    };

    const onSuccess = async (res) => {
        console.log('success:', res);
        setUserObj(res.profileObj);
        console.log(res)
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
                {profile ? (<GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />) : (
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