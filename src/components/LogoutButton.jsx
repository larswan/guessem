import {  GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from "react-router-dom";


const LogoutButton = ({ userObj, setUserObj }) =>{
    const clientId = import.meta.env.VITE_GAPI_CLIENT_ID
    const navigate = useNavigate()

    const logOut = () => {
        setUserObj(null);
        navigate("/login")
    };

    return(
        <div>
            <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
        </div>
    )

}
export default LogoutButton