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

// {
//     "Ca": "106319424501130968820",
//         "xc": {
//         "token_type": "Bearer",
//             "access_token": "ya29.a0AVvZVsrrfK95bz7iZl1xPR7HQzYZD2kRgGkD8NaY_XBF61KTk8YCfn8yFZDEPDxpkmqN2sS6eUJdBLAIT4jdJInDl5-H8XqzLkrw2j-B8LQyp4g2okOsaw61qW3yzzkp8mvQHb0MReHQ2XbzvDPJ9gNiWZBOUwaCgYKAT8SARMSFQGbdwaIkyt3aWSeIG1RrLywISiTrg0165",
//                 "scope": "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
//                     "login_hint": "AJDLj6JUa8yxXrhHdWRHIV0S13cA2fM-bXr5LgqKNWgCZs9Liyjk9d0-fiL6boyeKC_fUWK-Y2xMBtXLr546wOgfgvYE3bB0Cw",
//                         "expires_in": 3599,
//                             "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI0OWM1MDYyZDg5MGY1Y2U0NDllODkwYzg4ZThkZDk4YzRmZWUwYWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDE5OTAzMTA0NzU1LTgwdGlndnZyYnFzbzM3YTVsOXFudGU1aTh1bGdoOTRtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDE5OTAzMTA0NzU1LTgwdGlndnZyYnFzbzM3YTVsOXFudGU1aTh1bGdoOTRtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MzE5NDI0NTAxMTMwOTY4ODIwIiwiZW1haWwiOiJjb2xsaWVyLmxhcnNvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc1dDkwcG1uZWFDek1mZmE3MUoyalEiLCJuYW1lIjoiTGFyc29uIENvbGxpZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNWE0ZFl3dzhOZlllaXYtU1daZ3FMLUw1R1VlQVRfRTNHem5wUFdHQW89czk2LWMiLCJnaXZlbl9uYW1lIjoiTGFyc29uIiwiZmFtaWx5X25hbWUiOiJDb2xsaWVyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2NzU4MTQwNDAsImV4cCI6MTY3NTgxNzY0MCwianRpIjoiZjIwNzVkN2ZlYTYyMDQ1M2Y3MTE2MWNmZDY2MDM3OTk0MzY2NTc3MyJ9.e4n2g38q2zdswKwdBIIJll5M9uFsrf9nLdhKkz7kwlhBe9ZFiFPgASU_hfuE9btshmO2zUpqJ3M4jAk58Lvk1Tefzm3ZHfi7BSCBzzoWp37h_VDuDEtwNG3ntQkpvuZ4dPDIi7C9Gaxqoe_sGadOLckqdaLPRJR5Fj1hj8lWoobH6IW4Q6juFM03r9AuHtEc6s7uEA7PlOdHF14NIve0il8YkM8KYii-M6WN5-jhEZMMmSzg_Fv6I03uqW828HF3_o3tbGBPujXAgebbs6aqFzfPp95iMYSWNBKp5G0m4P2MTYXquSQuaAGtxG9MKoUrhC3eqpMZkNb5Dqv6zV0Eeg",
//                                 "session_state": {
//             "extraQueryParams": {
//                 "authuser": "0"
//             }
//         },
//         "first_issued_at": 1675814038558,
//             "expires_at": 1675817637558,
//                 "idpId": "google"
//     },
//     "wt": {
//         "NT": "106319424501130968820",
//             "Ad": "Larson Collier",
//                 "rV": "Larson",
//                     "uT": "Collier",
//                         "hK": "https://lh3.googleusercontent.com/a/AEdFTp5a4dYww8NfYeiv-SWZgqL-L5GUeAT_E3GznpPWGAo=s96-c",
//                             "cu": "collier.larson@gmail.com"
//     },
//     "googleId": "106319424501130968820",
//         "tokenObj": {
//         "token_type": "Bearer",
//             "access_token": "ya29.a0AVvZVsrrfK95bz7iZl1xPR7HQzYZD2kRgGkD8NaY_XBF61KTk8YCfn8yFZDEPDxpkmqN2sS6eUJdBLAIT4jdJInDl5-H8XqzLkrw2j-B8LQyp4g2okOsaw61qW3yzzkp8mvQHb0MReHQ2XbzvDPJ9gNiWZBOUwaCgYKAT8SARMSFQGbdwaIkyt3aWSeIG1RrLywISiTrg0165",
//                 "scope": "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
//                     "login_hint": "AJDLj6JUa8yxXrhHdWRHIV0S13cA2fM-bXr5LgqKNWgCZs9Liyjk9d0-fiL6boyeKC_fUWK-Y2xMBtXLr546wOgfgvYE3bB0Cw",
//                         "expires_in": 3599,
//                             "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI0OWM1MDYyZDg5MGY1Y2U0NDllODkwYzg4ZThkZDk4YzRmZWUwYWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDE5OTAzMTA0NzU1LTgwdGlndnZyYnFzbzM3YTVsOXFudGU1aTh1bGdoOTRtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDE5OTAzMTA0NzU1LTgwdGlndnZyYnFzbzM3YTVsOXFudGU1aTh1bGdoOTRtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MzE5NDI0NTAxMTMwOTY4ODIwIiwiZW1haWwiOiJjb2xsaWVyLmxhcnNvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc1dDkwcG1uZWFDek1mZmE3MUoyalEiLCJuYW1lIjoiTGFyc29uIENvbGxpZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNWE0ZFl3dzhOZlllaXYtU1daZ3FMLUw1R1VlQVRfRTNHem5wUFdHQW89czk2LWMiLCJnaXZlbl9uYW1lIjoiTGFyc29uIiwiZmFtaWx5X25hbWUiOiJDb2xsaWVyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2NzU4MTQwNDAsImV4cCI6MTY3NTgxNzY0MCwianRpIjoiZjIwNzVkN2ZlYTYyMDQ1M2Y3MTE2MWNmZDY2MDM3OTk0MzY2NTc3MyJ9.e4n2g38q2zdswKwdBIIJll5M9uFsrf9nLdhKkz7kwlhBe9ZFiFPgASU_hfuE9btshmO2zUpqJ3M4jAk58Lvk1Tefzm3ZHfi7BSCBzzoWp37h_VDuDEtwNG3ntQkpvuZ4dPDIi7C9Gaxqoe_sGadOLckqdaLPRJR5Fj1hj8lWoobH6IW4Q6juFM03r9AuHtEc6s7uEA7PlOdHF14NIve0il8YkM8KYii-M6WN5-jhEZMMmSzg_Fv6I03uqW828HF3_o3tbGBPujXAgebbs6aqFzfPp95iMYSWNBKp5G0m4P2MTYXquSQuaAGtxG9MKoUrhC3eqpMZkNb5Dqv6zV0Eeg",
//                                 "session_state": {
//             "extraQueryParams": {
//                 "authuser": "0"
//             }
//         },
//         "first_issued_at": 1675814038558,
//             "expires_at": 1675817637558,
//                 "idpId": "google"
//     },
//     "tokenId": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI0OWM1MDYyZDg5MGY1Y2U0NDllODkwYzg4ZThkZDk4YzRmZWUwYWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDE5OTAzMTA0NzU1LTgwdGlndnZyYnFzbzM3YTVsOXFudGU1aTh1bGdoOTRtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDE5OTAzMTA0NzU1LTgwdGlndnZyYnFzbzM3YTVsOXFudGU1aTh1bGdoOTRtLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MzE5NDI0NTAxMTMwOTY4ODIwIiwiZW1haWwiOiJjb2xsaWVyLmxhcnNvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc1dDkwcG1uZWFDek1mZmE3MUoyalEiLCJuYW1lIjoiTGFyc29uIENvbGxpZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNWE0ZFl3dzhOZlllaXYtU1daZ3FMLUw1R1VlQVRfRTNHem5wUFdHQW89czk2LWMiLCJnaXZlbl9uYW1lIjoiTGFyc29uIiwiZmFtaWx5X25hbWUiOiJDb2xsaWVyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2NzU4MTQwNDAsImV4cCI6MTY3NTgxNzY0MCwianRpIjoiZjIwNzVkN2ZlYTYyMDQ1M2Y3MTE2MWNmZDY2MDM3OTk0MzY2NTc3MyJ9.e4n2g38q2zdswKwdBIIJll5M9uFsrf9nLdhKkz7kwlhBe9ZFiFPgASU_hfuE9btshmO2zUpqJ3M4jAk58Lvk1Tefzm3ZHfi7BSCBzzoWp37h_VDuDEtwNG3ntQkpvuZ4dPDIi7C9Gaxqoe_sGadOLckqdaLPRJR5Fj1hj8lWoobH6IW4Q6juFM03r9AuHtEc6s7uEA7PlOdHF14NIve0il8YkM8KYii-M6WN5-jhEZMMmSzg_Fv6I03uqW828HF3_o3tbGBPujXAgebbs6aqFzfPp95iMYSWNBKp5G0m4P2MTYXquSQuaAGtxG9MKoUrhC3eqpMZkNb5Dqv6zV0Eeg",
//         "accessToken": "ya29.a0AVvZVsrrfK95bz7iZl1xPR7HQzYZD2kRgGkD8NaY_XBF61KTk8YCfn8yFZDEPDxpkmqN2sS6eUJdBLAIT4jdJInDl5-H8XqzLkrw2j-B8LQyp4g2okOsaw61qW3yzzkp8mvQHb0MReHQ2XbzvDPJ9gNiWZBOUwaCgYKAT8SARMSFQGbdwaIkyt3aWSeIG1RrLywISiTrg0165",
//             "profileObj": {
//         "googleId": "106319424501130968820",
//             "imageUrl": "https://lh3.googleusercontent.com/a/AEdFTp5a4dYww8NfYeiv-SWZgqL-L5GUeAT_E3GznpPWGAo=s96-c",
//                 "email": "collier.larson@gmail.com",
//                     "name": "Larson Collier",
//                         "givenName": "Larson",
//                             "familyName": "Collier"
//     }
// }