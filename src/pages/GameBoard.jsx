import { useEffect, useState } from "react"

const GameBoard = ({turn}) => {
    const [flipCards, setFlipCards] = useState([])
    
    useEffect(()=>{
        let otherCards = [...turn.cards].filter((card)=>{if(card.id != turn.cards) return card})
        setFlipCards(otherCards)

    },[])

    return(
        <div>Game Board</div>
    )
}
export default GameBoard