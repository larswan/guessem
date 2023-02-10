import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import GameBoard from "./GameBoard"
import WaitingForOtherPlayer from "./WaitingForOtherPlayer"
import BackButton from "../components/BackButton"
import Cookies from 'js-cookie'
import GuessQ from "./GuessQ"
import Wait from "./Wait"
import AnswerQ from "./AnswerQ"
import Header from "../components/Header"

const TurnRouter = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [gameData, setGameData] = useState(null)
    const [user, setUser] = useState()
    const [phase, setPhase] = useState()
    let gameId
    let opponentsTurn

    useEffect(()=>{
        // get user info
        let cookieUserId = Cookies.get('userId')
        let cookieUserName = Cookies.get('userName')
        let cookieUserImage = Cookies.get('userImage')
        if (!cookieUserId) { navigate('/login') }
        else { setUser({ id: cookieUserId, name: cookieUserName, image: cookieUserImage }) } 
        
        //get game info
        if (!gameId) {gameId = state.gameId}
        const request = async () => {
            let req= await fetch(`http://localhost:3000/games/${gameId}`)
            let res = await req.json()

            console.log("GameId= ", gameId, " and at TurnRouter line 37 game object is vv")
            console.log(res)

            setGameData(res)      
        }
        request()
    },[])

    // define phase
    useEffect(()=>{
        if (gameData && user){
            let yourTurn = (gameData.game.whosTurn == user.id)
            // console.log("Your turn? ", yourTurn)
            if (gameData.game.currentTurn>0){opponentsTurn = gameData.turns[(gameData.game.currentTurn - 1)]}             
            // console.log(gameData.turns[(gameData.game.currentTurn - 1)].status)
    
            if(!yourTurn){ setPhase("wait")}
            else if (gameData.game.currentTurn == 1){setPhase("guess")}
            else if (opponentsTurn.status=="asked") {setPhase('answer')}
            else if("still thinking on this") {setPhase(null)}
            else {setPhase(null)}
            }

            // if user.id == gameData.game.whosTurn && gameData.game.currentTurn == 1 => navigate(questionScreen)
            // elseif user.id == gameData.game.whosTurn navigate(answerScreen)
        }
    ,[gameData])

    switch (phase) {
        case 'wait':
            return <Wait gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'answer':
            return <AnswerQ gameData={gameData} opponentsTurn={opponentsTurn} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'guess':
            return <GuessQ gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase}/>;
        default:
            return (
            <div>
                {
                    gameData? 
                    <div>
                        <Header />
                        <h1> Whos turn: {gameData.game.whosTurn}</h1>
                        <h1>Current Player Id: {user.id}</h1>
                        <h1>Turn #: {gameData.game.currentTurn}</h1>
                    </div>
                    : null
                }
            </div>);
    }

}

export default TurnRouter