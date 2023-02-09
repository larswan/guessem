import Header from "../components/Header"
import { useState, useEffect } from "react"
import CardPlayDisplay from "../components/CardPlayDisplay"


const GuessQ = ({ gameData, setGameData, user, setPhase }) => {
    const [cards, setCards] = useState(gameData.game.cards)
    const [question, setQuestion] = useState('')

    useEffect(()=>{
        console.log(gameData.game.cards)
    },[])

    const handleClick = (card) => {
        console.log("clicked ", card.name, " faceUp = ", card.faceUp)
    }

    const handleSubmit = () => {
        console.log(question)
    }

    return (
        <div>
            <Header user={user} />
            <h1 className="font-black">MAKE A GUESS</h1>

            <div className="flex flex-column flex-wrap space-x-1 space-y-1 justify-center">
                {
                    cards?.map((card)=>{
                        return(
                            <div className="w-3/12" onClick={() => {handleClick(card) }}>
                                <CardPlayDisplay  card={card} />
                            </div>
                        )
                    })
                }
            </div>
            <form>
                <input className="p-1" name="question" type="text" required placeholder="Ask a question..." value={question} onChange={(e) => { setQuestion(e.target.value) }}></input>
                <button className="bg-blue-600" onSubmit={handleSubmit()}>ASK</button>
            </form>

        </div>
    )
}
export default GuessQ