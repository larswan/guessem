import Header from "../components/Header"
import { useState, useEffect } from "react"
import CardPlayDisplay from "../components/CardPlayDisplay"


const GuessQ = ({ gameData, setGameData, user, setPhase }) => {
    const [cards, setCards] = useState(gameData.game.cards)
    useEffect(()=>{

    },[])

    const handleClick = (card) => {
        console.log("clicked ", card.name, " faceUp = ", card.faceUp)
    }


    return (
        <div>
            <Header />
            <div>GuessQ
                {
                    cards?.map((card)=>{
                        return(
                            <div onClick={() => { handleClick(card) }}>
                                <CardPlayDisplay  card={card} />
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}
export default GuessQ