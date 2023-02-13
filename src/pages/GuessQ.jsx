import Header from "../components/Header"
import { useState, useEffect } from "react"
import CardPlayDisplay from "../components/CardPlayDisplay"
import GuessModeButton from "../components/GuessModeButton"
import AnswerDisplay from "../components/AnswerDisplay"

const GuessQ = ({opponent, opponentSecret, setPhase, gameData, prevTurn, setGameData, user, secretCard, player, cards, setCards }) => {
    const [question, setQuestion] = useState('')
    const [guessMode, setGuessMode] = useState(false)
    
    const clickFlipCard = (card, i) => {
        let newCard = { ...card, "faceUp": !card.faceUp }
        let newCards = [...cards]
        newCards[i] = newCard
        setCards(() => { return [...newCards] })
    }

    const clickGuessCard = async (card, i) => {
        console.log("clickGuessedCard fired", card)
        
        // if right
        if (card.id==opponentSecret.id){
            console.log("WIN")
            setPhase("won")

        }
        else {
            console.log(card, opponentSecret)
        
            // flip card
            // if wrong
            // turn answered, question: Is it ${card.name}? "No"
            // player turn => opp
            // 
        }

    }

    const handleSendQuestion = async (e) => {
        e.preventDefault()
        console.log("sendQuestion ran. Question is: ", question)

        let req = await fetch("http://localhost:3000/sendQuestion",{ 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                turnId: gameData.turns[gameData.game.currentTurn].id,
                question: question,
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
        <div className='px-2'>
            <Header user={user} />
            {
                (gameData.game.currentTurn>1) ? 
                    <div>
                        <AnswerDisplay prevTurn={prevTurn}/>
                    </div>
                    : null
            }
            <div className="flex flex-column flex-wrap space-x-1 space-y-1 justify-center">
                {
                    cards?.map((card, i)=>{
                        return(
                            <div className="w-3/12" onClick={()=>{guessMode ? clickGuessCard(card, i) : clickFlipCard(card, i) }}>
                                <CardPlayDisplay  card={card} />
                            </div>
                        )
                    })
                }
            </div>
            <h1 className="font-black">MAKE A GUESS</h1>

            <form onSubmit={handleSendQuestion} className="py-2 flex justify-center">
                <input className="py-1" name="question" type="text" required placeholder="Ask a question..." value={question} onChange={(e) => { setQuestion(e.target.value) }}></input>
                <button className="font-black bg-blue py-1 px-2 text-white ml-2 rounded-sm" >ASK</button>
            </form>
            <h1 className="flex justify-center">or</h1>
            <GuessModeButton guessMode={guessMode} setGuessMode={setGuessMode} setQuestion={setQuestion} />
        </div>
    )
}
export default GuessQ