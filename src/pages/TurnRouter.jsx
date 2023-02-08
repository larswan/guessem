import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import GameBoard from "./GameBoard"
import WaitingForOtherPlayer from "./WaitingForOtherPlayer"
import BackButton from "../components/BackButton"

const TurnRouter = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [gameData, setGameData] = useState()

    useEffect(()=>{
        let id = state.gameId
        console.log(id)
        const request = async () => {
            let req= await fetch(`http://localhost:3000/games/${id}`)
            let res = await req.json()
            console.log(res)   
            setGameData(res)      
            }

        // if user.id == gameData.game.whosTurn && gameData.game.currentTurn == 1 => navigate(questionScreen)
        // elseif user.id == gameData.game.whosTurn navigate(answerScreen)
        request()
    },[])

    return(
        <div>
            <BackButton />
            {
                // add boolean to choose which screen it goes to, based on whos turn it is (waiting or gameboard)
            }
            TurnRouter
        </div>
    )
}

export default TurnRouter