import Header from "../components/Header"
import { useState, useEffect } from "react"
import CardPlayDisplay from "../components/CardPlayDisplay"
import GuessModeButton from "../components/GuessModeButton"
import AnswerDisplay from "../components/AnswerDisplay"
import SecretCardQuestion from "../components/SecretCardQuestion"

const GuessQ = ({opponent, opponentSecret, gameData, prevTurn, setGameData, user, secretCard, cards, setCards }) => {
    const [question, setQuestion] = useState('')
    const [guessMode, setGuessMode] = useState(false)
    
    const clickFlipCard = (card, i) => {
        let newCard = { ...card, "faceUp": !card.faceUp }
        let newCards = [...cards]
        newCards[i] = newCard
        setCards(() => { return [...newCards] })
    }

    const clickGuessCard = async (card, i) => {
        const guessedQuestion = `Is it ${card.name}?`
        console.log("guessed: ", card)
        // if right
        if (card.id==opponentSecret.id){
            console.log("win! prevTurn is: ", prevTurn)
            let req = await fetch("http://localhost:3000/guessedRight", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    turnNumber: gameData.game.currentTurn,
                    gameId: gameData.game.id,
                    winningQuestion: prevTurn.question,
                    winningAnswer: prevTurn.answer,
                    winningUser: user.id,
                    winningCard: card.id,
                })
            })
            let res = await req.json()
            console.log("guessedRight ran heres the res ", res)
            setGameData(res)
        }
        else {
            console.log("guessedWrong about to fire. Guessed card:  ", card, "oppSecretCard: ", opponentSecret)

            let req = await fetch("http://localhost:3000/guessedWrong", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    turnNumber: gameData.game.currentTurn,
                    question: guessedQuestion,
                    gameId: gameData.game.id,
                    whosTurnNext: opponent.id,
                    cards: cards,
                    guessedCard: card.id,
                })
            })
            let res = await req.json()
            console.log("guessedWrong ran heres the res ", res)
            setGameData(res)
        }
    }

    const handleSendQuestion = async (e) => {
        e.preventDefault()

        let madeQuestion = question
        if (question.slice(-1) != "?") {madeQuestion = question + "?"}

        console.log("handle send ", gameData.game.id)

        let req = await fetch("http://localhost:3000/sendQuestion",{ 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                turnNumber: gameData.game.currentTurn,
                question: madeQuestion,
                gameId: gameData.game.id,
                whosTurnNext: opponent.id,
                cards: cards,
            })
        })
        let res = await req.json()
        console.log(res)
        setGameData(res)
    }

    return (
        <div>
            <Header user={user} text={"MAKE A GUESS"}/>
            <div className="PagePadder">
                <div className="cardBox">
                    {
                        cards?.map((card, i)=>{
                            return(
                                <div className="playCard" onClick={()=>{guessMode ? clickGuessCard(card, i) : clickFlipCard(card, i) }}>
                                    <CardPlayDisplay  card={card} />
                                </div>
                            )
                        })
                    }
                </div>
                {
                    (gameData.game.currentTurn > 1) && prevTurn ?
                        <div>
                            <AnswerDisplay prevTurn={prevTurn} opponent={opponent} />
                        </div> : null
                }

                <form onSubmit={handleSendQuestion} className="py-2 flex justify-center">
                    <input className="textForm" name="question" type="text" required placeholder="Ask a question..." value={question} onChange={(e) => { setQuestion(e.target.value) }}></input>
                    <button className="font-black bg-blue py-1 px-2 text-white ml-2 rounded-sm" >ASK</button>
                </form>
                {/* <h1 className="flex justify-center">or</h1> */}
                    <GuessModeButton guessMode={guessMode} setGuessMode={setGuessMode} setQuestion={setQuestion} />
                <div className="guessQBottomScreen">
                    <SecretCardQuestion secretCard={secretCard}/>
                </div>
            </div>
        </div>
    )
}
export default GuessQ