import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import GameBoard from "./GameBoard"
import WaitingForOtherPlayer from "./WaitingForOtherPlayer"
import BackButton from "../components/BackButton"
import Cookies from 'js-cookie'
import GuessQ from "./GuessQ"
import Wait from "./Wait"
import AnswerQ from "./AnswerQ"

const TurnRouter = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [gameData, setGameData] = useState()
    const [user, setUser] = useState()
    const [phase, setPhase] = useState()

    useEffect(()=>{
        // get user info
        let cookieUserId = Cookies.get('userId')
        let cookieUserName = Cookies.get('userName')
        let cookieUserImage = Cookies.get('userImage')
        if (!cookieUserId) { navigate('/login') }
        else { setUser({ id: cookieUserId, name: cookieUserName, image: cookieUserImage }) } 

        //get game info
        let gameId = state.gameId
        console.log(gameId)

        const request = async () => {
            let req= await fetch(`http://localhost:3000/games/${gameId}`)
            let res = await req.json()
            console.log(res)   
            setGameData(res)      
            }
        // if user.id == gameData.game.whosTurn && gameData.game.currentTurn == 1 => navigate(questionScreen)
        // elseif user.id == gameData.game.whosTurn navigate(answerScreen)
        request()
    },[])

    // define switch based on 

    switch (phase) {
        case 'wait':
            return <Wait gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'answer':
            return <AnswerQ gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'guess':
            return <GuessQ gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase}/>;
        default:
            return <DefaultPhase />;
    }

}

export default TurnRouter