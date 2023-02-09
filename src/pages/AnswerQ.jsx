import Header from "../components/Header"
import { useState, useEffect } from "react"
import SecretCardAnswer from "../components/SecretCardAnswer"

const AnswerQ = ({ gameData, setGameData, user, setPhase, opponentsTurn }) => {
    const [answer, setAnswer] = useState('')
    const [player, setPlayer] = useState()
    const [secretCard, setSecretCard] = useState()
    const [allCards, setAllCards] = useState()

    useEffect(() => {
        if (gameData.game.p1 == user.id) {
            setPlayer(1);
            setSecretCard(gameData.game.p1SecretCard)
            console.log('player set to 1');
        }
        else if (gameData.game.p2 == user.id) {
            setPlayer(2);
            setSecretCard(gameData.game.p2SecretCard)
            console.log('player set to 2')
        }
        else { console.log("cant tell which players turn it is. check GuessQ component. Gamedata.game.p1= ", gameData.game.p1, " and user.id= ", user.id) }

        setAllCards(gameData.game.cards)
    }, [])

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
        <h1 className="font-black">MAKE A GUESS</h1>

        <SecretCardAnswer card={secretCard} />

        <form onSubmit={handleAnswer} className="py-2 ">
            <input className="p-1" name="answer" type="text" required placeholder="Answer..." value={answer} onChange={(e)=>{setAnswer(e.target.value)}}></input>
            <button className="font-black bg-green-600 py-1 px-2 text-white ml-2 rounded-sm">SEND</button>
        </form>
    </div>
    )
}
export default AnswerQ