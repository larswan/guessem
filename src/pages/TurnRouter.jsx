import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import Cookies from 'js-cookie'
import GuessQ from "./GuessQ"
import Wait from "./Wait"
import AnswerQ from "./AnswerQ"
import Header from "../components/Header"

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
    const [opponentsTurn, setOpponentsTurn] = useState()

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

            console.log("GameId= ", gameId, " and at TurnRouter line 37 game object is vv")

            console.log(res)
            setGameData(res)   

            // setting opponents turn to the last 
            if (res.game.currentTurn > 0) { setOpponentsTurn(res.turns[(res.game.currentTurn - 1)]) }   
            //setting your last turn
            if (res.game.currentTurn > 1) { setPrevTurn(res.turns[(res.game.currentTurn - 2)]) }  
        }
        request()
    },[])

    // Once game state has settled, define phase and set player, cards, allCards and secretCards
    useEffect(()=>{
        if (gameData && user){
            console.log("turn router useEffect [gameData] use effect GAMEDATA: ", gameData)
            if (gameData.game.p1 == user.id) {
                setPlayer(gameData.p1);
                setOpponent(gameData.p2)
                setSecretCard(gameData.p1SecretCard)
                setOpponentSecret(gameData.game.p2SecretCard)
                // console.log('player set to 1');
            }
            else if (gameData.game.p2 == user.id) {
                setPlayer(gameData.p2);
                setOpponent(gameData.p1)
                setSecretCard(gameData.p2SecretCard)
                setOpponentSecret(gameData.game.p1SecretCard)
                // console.log('player set to 2')
            }
            else { console.log("cant tell which players turn it is. check GuessQ component. Gamedata.game.p1= ", gameData.game.p1, " and user.id= ", user.id) }
            
            setCards(gameData.turns[gameData.game.currentTurn].flippedCards)
            setAllCards(gameData.game.cards)
            setCurrentTurn(gameData.game.currentTurn)

            let yourTurn = (gameData.game.whosTurn == user.id)

            console.log("oppTurn", opponentsTurn)
                          
            if(!yourTurn){ setPhase("wait")}
            else if (gameData.game.currentTurn == 1){setPhase("guess")}
            else if (opponentsTurn.status=="asked") {setPhase('answer')}
            else if (opponentsTurn.status=="answered") {setPhase('guess')}
            else {setPhase(null)}
            }

            // if user.id == gameData.game.whosTurn && gameData.game.currentTurn == 1 => navigate(questionScreen)
            // elseif user.id == gameData.game.whosTurn navigate(answerScreen)
        }
    ,[gameData])

    switch (phase) {
        case 'wait':
            return <Wait opponent={opponent} secretCard={secretCard} player={player} cards={cards} gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'answer':
            return <AnswerQ opponent={opponent} allCards={allCards} opponentSecret={opponentSecret} secretCard={secretCard} player={player} cards={cards} gameData={gameData} opponentsTurn={opponentsTurn} setGameData={setGameData} user={user} setPhase={setPhase} />;
        case 'guess':
            return <GuessQ opponent={opponent} setCards={setCards} opponentSecret={opponentSecret} secretCard={secretCard} player={player} cards={cards}  gameData={gameData} setGameData={setGameData} user={user} setPhase={setPhase}/>;
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