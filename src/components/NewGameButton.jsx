import { useNavigate } from "react-router-dom"

const NewGameButton = () => {
    const navigate = useNavigate()

    const newGameNav = () => {
        navigate("/new_game")
    }
    return(
        <div onClick={() => { newGameNav() }} className="font-black bg-green-600 py-1 px-2 text-white ml-2 my-2 rounded-full">
            + NEW GAME
        </div>
    )
}
export default NewGameButton