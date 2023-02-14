import BackButton from "./BackButton"
import { useNavigate } from "react-router-dom"

const Header = ({user, text, home}) => {
    
    return(
        <div id='header' className='flex h-10 w-full items-center'>   
            { home ? null : <BackButton /> }
            <h1 className="Subheader">{text}</h1>        
        </div>
    )
}
export default Header