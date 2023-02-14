import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import GuessQ from "./GuessQ"
import Wait from "./Wait"
import AnswerQ from "./AnswerQ"
import Header from "../components/Header"
import WinningScreen from "./WinningScreen"

const TurnRouter = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    
    let gameId
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

    useEffect(()=>{
        // get user info from cookies
        let cookieUserId = Cookies.get('userId')
        let cookieUserName = Cookies.get('userName')
        let cookieUserImage = Cookies.get('userImage')
        if (!cookieUserId) { navigate('/login') }
        else { setUser({ id: cookieUserId, name: cookieUserName, image: cookieUserImage }) } 
        
        // get gameId from navigation from home screen or newGame component 
        if (!gameId) {gameId = state.gameId}

        // fetch and set gameData 
        const request = async () => {
            let req= await fetch(`http://localhost:3000/games/${gameId}`)
            let res = await req.json()
            setGameData(res)   
            
            // set the turn that will be updated by the user
            setCurrentTurn(res.turns.find(t => t.turn === (res.game.currentTurn)))
            
            // set the previous turn questions and answers that will be displayed
            if (res.game.currentTurn > 1) { 
                setPrevTurn(res.turns.find(t => t.turn === (res.game.currentTurn-2)))
            }  
        }
        request()
    },[])

    // Redefine phase and set cards, allCards and secretCards when new gameData is returned
    useEffect(()=>{
        if (gameData && user){
            // setting the current turn whenever a gameData is updated by a post request
            setCurrentTurn(gameData.turns.find(t => t.turn === (gameData.game.currentTurn)))
            // set the previous turn questions and answers that will be displayed
            if (gameData.game.currentTurn > 1) {
                setPrevTurn(gameData.turns.find(t => t.turn === (gameData.game.currentTurn - 2)))
            }  

            setCards(gameData.turns[gameData.game.currentTurn].flippedCards)
            setAllCards(gameData.game.cards)

            if (gameData.game.p1 == user.id) {
                setPlayer(gameData.p1)
                setOpponent(gameData.p2)
                setSecretCard(gameData.p1SecretCard)
                setOpponentSecret(gameData.p2SecretCard)
            }
            else if (gameData.game.p2 == user.id) {
                setPlayer(gameData.p2)
                setOpponent(gameData.p1)
                setSecretCard(gameData.p2SecretCard)
                setOpponentSecret(gameData.p1SecretCard)
            }
            else { console.log("error setting players on gameData useEffect: ", gameData)}

            let yourTurn = (gameData.game.whosTurn == user.id)

            if(!yourTurn){ setPhase("wait")}
            else if (gameData.game.phase === "guess"){setPhase("guess")}
            else if (gameData.game.phase === "respond") {setPhase("answer")}
            else if (gameData.game.phase === "won") {setPhase("won")}
            else {
                console.log("Error setting phase on gameData useEffect.", gameData)
                setPhase(null)}
            }
        }
    ,[gameData])

    switch (phase) {
        case 'wait':
            return <Wait opponent={opponent} secretCard={secretCard} cards={cards} gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'answer':
            return <AnswerQ opponent={opponent} allCards={allCards} secretCard={secretCard} gameData={gameData} currentTurn={currentTurn} setGameData={setGameData} user={user}/>;
        case 'guess':
            return <GuessQ opponent={opponent} setCards={setCards} opponentSecret={opponentSecret} secretCard={secretCard} cards={cards} prevTurn={prevTurn} gameData={gameData} setGameData={setGameData} user={user}/>;
        case 'won':
            return <WinningScreen opponent={opponent} gameData={gameData} user={user} setPhase={setPhase}/>;
        default:
            return (
            <div>
                {
                    gameData? 
                    <div>
                        <Header />
                        <h1>Error setting phase</h1>
                        <h1>Whos turn: {gameData.game.whosTurn}</h1>
                        <h1>Turn #: {gameData.game.currentTurn}</h1>
                    </div> 
                    : <h1>Error: No gameData</h1> 
                }
            </div>
            );
    }
}

export default TurnRouter