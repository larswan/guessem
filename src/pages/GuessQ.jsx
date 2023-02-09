import Header from "../components/Header"
import { useState, useEffect } from "react"
import CardPlayDisplay from "../components/CardPlayDisplay"


const GuessQ = ({ gameData, setGameData, user, setPhase }) => {
    const [cards, setCards] = useState(gameData.game.cards)
    const [question, setQuestion] = useState('')
    const [guessMode, setGuessMode] = useState(false)

    useEffect(()=>{
        console.log(gameData.game.cards)
    },[])

    const handleClick = (card, i) => {
        let newCard = { ...card, "faceUp": !card.faceUp }
        let newCards = [...cards]
        newCards[i] = newCard
        setCards(() => { return [...newCards] })
    }

    const handleSubmit = () => {
        console.log(question)
    }

    return (
        <div className='px-2'>
            <Header user={user} />
            <h1 className="font-black">MAKE A GUESS</h1>

            <div className="flex flex-column flex-wrap space-x-1 space-y-1 justify-center">
                {
                    cards?.map((card, i)=>{
                        return(
                            <div className="w-3/12" onClick={() => {handleClick(card, i) }}>
                                <CardPlayDisplay  card={card} />
                            </div>
                        )
                    })
                }
            </div>
            <form className="py-2 flex justify-center">
                <input className="py-1" name="question" type="text" required placeholder="Ask a question..." value={question} onChange={(e) => { setQuestion(e.target.value) }}></input>
                <button className="font-black bg-green-600 py-1 px-2 text-white ml-2 rounded-sm" onSubmit={handleSubmit()}>ASK</button>
            </form>

        </div>
    )
}
export default GuessQ