import { useNavigate } from "react-router-dom"

const BackButton = ()=>{
    const navigate = useNavigate()
    
    const backHandler = () => {
        navigate('/')
    }

    return(
        <div>
            <img className="w-10 h-9 p-2 border-black" onClick={() => { backHandler() }} src="https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767523-1502427.png" />
        </div>
    )
}
export default BackButton