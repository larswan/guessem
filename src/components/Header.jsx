import BackButton from "./BackButton"
import { useNavigate } from "react-router-dom"

const Header = ({user, text, home}) => {
    // console.log(user)
    
    return(
        <div id='header' className='flex h-10 w-full items-center relative bg-blackish p-2'>   
            {home&&user ? 
            <h1 className="Header">Welcome, {user.givenName}</h1> 
            : <BackButton /> }
        <div className="headerRightSide">
            <h1 className="Header">{text}</h1>        
        </div>
        </div>
    )
}
export default Header