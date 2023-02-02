import { useNavigate } from "react-router-dom"
import NameBar from "../components/NameBar"

const AllGames = () => {
    const navigate = useNavigate()

    const newGameNav = () => {
        navigate("/new_game")
    }

    return(
        <div className="p-3">
            <text className="font-black" >AllGames</text>

            <div onClick={() => { newGameNav() }}>
                <NameBar info="+ New Game" handleClick={newGameNav}/>
            </div>

            {
                //render current games
            }
            
        </div>
    )
}
export default AllGames