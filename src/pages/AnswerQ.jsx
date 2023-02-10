import Header from "../components/Header"
import { useState, useEffect } from "react"
import SecretCardAnswer from "../components/SecretCardAnswer"

const AnswerQ = ({ opponentsTurn,opponentSecret, setPhase, gameData, setGameData, user, secretCard, player, cards }) => {
    const [answer, setAnswer] = useState('')
    const [allCards, setAllCards] = useState()

    useEffect(()=>{
        // console.log(secretCard)
        // console.log(currentTurn)
        // console.log(prevTurn)
        console.log(opponentsTurn)
    })

    const handleAnswer = async (e) => {
        e.preventDefault()
        console.log("handleAnswer ran. Answer is: ", answer)

        // post answerQuestion 
        // patch previous turn with answer, change status to answered
        let req = await fetch("http://localhost:3000/answerQuestion", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                turnId: opponentsTurn.id,
                answer: answer,
            })
        })
        let res = await req.json()
        console.log(res)

        // find a way to update gameData with new turn so that it moves to question screen
        // setGameData(res)
    }

    return (
        <div>
        <Header user={user}/>
        <h1 className="font-black">ANSWER THEM</h1>
        <h1> {opponentsTurn.question}</h1>
        {
            secretCard ?
            <div className=" flex justify-center">
                <SecretCardAnswer card={secretCard} />
            </div>    
            : null
        }

        <form onSubmit={handleAnswer} className="py-2 ">
            <input className="p-1" name="answer" type="text" required placeholder="Answer..." value={answer} onChange={(e)=>{setAnswer(e.target.value)}}></input>
            <button className="font-black bg-green-600 py-1 px-2 text-white ml-2 rounded-sm">SEND</button>
        </form>
    </div>
    )
}
export default AnswerQ