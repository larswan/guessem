import Header from "../components/Header"
import { useState, useEffect } from "react"
import SecretCardAnswer from "../components/SecretCardAnswer"

const AnswerQ = ({ opponent, currentTurn, gameData, setGameData, user, secretCard}) => {
    const [answer, setAnswer] = useState('')
    const [allCards, setAllCards] = useState()

    const handleAnswer = async (e) => {
        e.preventDefault()

        let req = await fetch("http://localhost:3000/answerQuestion", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                turnNumber: gameData.game.currentTurn,
                answer: answer,
                gameId: gameData.game.id
            })
        })
        let res = await req.json()

        if (req.ok){
            console.log("handle answer response ", res)
            setGameData(res)
        }
    }

    return (
        <div>
        <Header user={user}/>
        <h1 className="Subheader">ANSWER THEM</h1>
        <h1>{opponent.givenName} asked "{currentTurn.question}"</h1>
        {
            secretCard ?
            <div className=" flex justify-center">
                <SecretCardAnswer card={secretCard} />
            </div>    
            : null
        }

        <form onSubmit={handleAnswer} className="py-2 ">
            <input className="textForm" name="answer" type="text" required placeholder="Answer..." value={answer} onChange={(e)=>{setAnswer(e.target.value)}}></input>
            <button className="font-black bg-blue py-1 px-2 text-white ml-2 rounded-sm">SEND</button>
        </form>
    </div>
    )
}
export default AnswerQ