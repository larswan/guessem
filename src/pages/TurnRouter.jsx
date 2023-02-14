import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import Cookies from 'js-cookie'
import GuessQ from "./GuessQ"
import Wait from "./Wait"
import AnswerQ from "./AnswerQ"
import Header from "../components/Header"
import WinningScreen from "./WinningScreen"

// TBD
import GameBoard from "./GameBoard"
import WaitingForOtherPlayer from "./WaitingForOtherPlayer"
import BackButton from "../components/BackButton"

const TurnRouter = () => {
    const navigate = useNavigate()
    const { state } = useLocation();

    const [gameData, setGameData] = useState(null)
    const [cards, setCards] = useState()
    const [allCards, setAllCards] = useState()
    const [phase, setPhase] = useState("default")
    const [user, setUser] = useState()
    const [player, setPlayer] = useState()
    const [opponent, setOpponent] = useState()
    const [secretCard, setSecretCard] = useState()
    const [opponentSecret, setOpponentSecret] = useState()
    const [currentTurn, setCurrentTurn] = useState()
    const [prevTurn, setPrevTurn] = useState()

    let gameId

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
            setGameData(res)   
            
            // setting the current turn
            setCurrentTurn(res.turns.find(t => t.turn === (res.game.currentTurn)))
            //setting your last turn if a full round has elapsed
            if (res.game.currentTurn > 1) { 
                console.log("line 55 of turnrouter ran")
                setPrevTurn(res.turns.find(t => t.turn === (res.game.currentTurn-2)))
            }  
        }
        request()
    },[])

    // Once game state has settled, define phase and set player, cards, allCards and secretCards
    useEffect(()=>{
        if (gameData && user){
            // setting the current turn whenever a post req goes through
            setCurrentTurn(gameData.turns.find(t => t.turn === (gameData.game.currentTurn)))
            //setting your last turn if a full round has elapsed
            if (gameData.game.currentTurn >= 2) {
                setPrevTurn(gameData.turns.find(t => t.turn === (gameData.game.currentTurn - 2)))
            }  

            if (gameData.game.p1 == user.id) {
                setPlayer(gameData.p1);
                setOpponent(gameData.p2)
                setSecretCard(gameData.p1SecretCard)
                setOpponentSecret(gameData.p2SecretCard)
            }
            else if (gameData.game.p2 == user.id) {
                setPlayer(gameData.p2);
                setOpponent(gameData.p1)
                setSecretCard(gameData.p2SecretCard)
                setOpponentSecret(gameData.p1SecretCard)
            }
            else { console.log("error setting players on gameData useEffect: ", gameData)}
            
            setCards(gameData.turns[gameData.game.currentTurn].flippedCards)
            setAllCards(gameData.game.cards)

            let yourTurn = (gameData.game.whosTurn == user.id)

            
            if(!yourTurn){ setPhase("wait")}
            else if (gameData.game.phase == "guess"){setPhase("guess")}
            else if (gameData.game.phase=="respond") {
                setPhase('answer')
            }
            else if (gameData.game.phase=="won") {
                setPhase("won")
            }
            else {
                console.log("error setting phase on gaemData useEffect", gameData)
                setPhase(null)}
            }
        }
    ,[gameData])

    switch (phase) {
        case 'wait':
            return <Wait opponent={opponent} secretCard={secretCard} player={player} cards={cards} gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'answer':
            return <AnswerQ opponent={opponent} allCards={allCards} opponentSecret={opponentSecret} secretCard={secretCard} player={player} cards={cards} gameData={gameData} currentTurn={currentTurn} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'guess':
            return <GuessQ opponent={opponent} setCards={setCards} opponentSecret={opponentSecret} secretCard={secretCard} player={player} cards={cards} prevTurn={prevTurn} gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase}/>;
        case 'won':
            return <WinningScreen opponent={opponent} setCards={setCards} opponentSecret={opponentSecret} secretCard={secretCard} player={player} cards={cards} prevTurn={prevTurn} gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase}/>;
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