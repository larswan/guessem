import Header from "../components/Header"
import { useState, useEffect } from "react"
import CardPlayDisplay from "../components/CardPlayDisplay"
import GuessModeButton from "../components/GuessModeButton"


const GuessQ = ({ gameData, setGameData, user, setPhase }) => {
    const [cards, setCards] = useState(gameData.game.cards)
    const [question, setQuestion] = useState('')
    const [guessMode, setGuessMode] = useState(false)
    const [player, setPlayer ] = useState()

    useEffect(()=>{
        if (gameData.game.p1Id===user.id){setPlayer(1)}
        else if (gameData.game.p2Id === user.id){setPlayer(2)}
        else { console.log(gameData.game.p1Id, user.id)}

        setCards(gameData.turns[gameData.game.currentTurn].flippedCards)

        console.log(gameData)
        console.log(gameData.turns[gameData.game.currentTurn].flippedCards)
    },[])

    const clickFlipCard = (card, i) => {
        let newCard = { ...card, "faceUp": !card.faceUp }
        let newCards = [...cards]
        newCards[i] = newCard
        setCards(() => { return [...newCards] })
    }
    const clickGuessCard = async (card, i) => {
        console.log(card, i)
        // logic to see if winning

        // patch to game 

    }

    const handleSendQuestion = async () => {
        // console.log(question)

        let req = await fetch("http://localhost:3000/sendQuestion",{ 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                cards: cards,
                turnId: XXXXXXX,
                question: question,
            })
        })
        let res = await req.json()
        console.log(res)

        // setGameData
    }

    return (
        <div className='px-2'>
            <Header user={user} />
            <h1 className="font-black">MAKE A GUESS</h1>

            <div className="flex flex-column flex-wrap space-x-1 space-y-1 justify-center">
                {
                    cards?.map((card, i)=>{
                        return(
                            <div className="w-3/12" onClick={() => {guessMode ? clickGuessCard(card, i) :clickFlipCard(card, i) }}>
                                <CardPlayDisplay  card={card} />
                            </div>
                        )
                    })
                }
            </div>
            <form className="py-2 flex justify-center">
                <input className="py-1" name="question" type="text" required placeholder="Ask a question..." value={question} onChange={(e) => { setQuestion(e.target.value) }}></input>
                <button className="font-black bg-green-600 py-1 px-2 text-white ml-2 rounded-sm" onSubmit={()=>{handleSendQuestion()}}>ASK</button>
            </form>
            <h1 className="flex justify-center">or</h1>
            <GuessModeButton guessMode={guessMode} setGuessMode={setGuessMode} />
        </div>
    )
}
export default GuessQ