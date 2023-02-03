import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CardSetDisplay from "../components/CardSetDisplay.jsx"

const SelectCards = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [cards, setCards] = useState([])
    const [count, setCount] = useState(0)

    function randomTwoFromArray(array) {
        let selected = [];
        let arrayCopy = [...array]
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * arrayCopy.length);
            selected.push(arrayCopy.splice(randomIndex, 1)[0]);
        }
        return selected;
    }

    useEffect(()=>{
        let facingCards = state.cards.map((card)=>{return {...card, faceUp: false}})
        console.log(facingCards)
        setCards(facingCards)
    }, [])

    const handleClick = (card, i) => {
        // console.log(card, "i: " + i)
        if (card.faceUp == true ){setCount(count - 1)}
        else {setCount(count + 1)}

        // create a duplicate card with a revered faceUp value
        let newCard = { ...card, "faceUp": !card.faceUp }

        // create a new card set
        let newCards = [...cards]

        // sub in the new card in a duplicate array
        newCards[i] = newCard
        setCards(() => {return [...newCards] })
    }

    useEffect(()=>{
        console.log("count: " + count)
        if (count == 6){
            let selectedCards = cards.filter((card)=>{if(card.faceUp == true){return card}})
            let bothSecretCards = randomTwoFromArray(selectedCards)
           
            console.log(state)
            let newGame = { ...state, "cards": selectedCards, p1SecretCard: bothSecretCards[0], p2SecretCard: bothSecretCards[1]}
            console.log(newGame)
            // remove cards from newGame array replace with selectedCards array
            //Add those numbers to the newGam object
            // post newGame to db
            // return game Id from that post and when res.ok route to GameBoard/:GameId
        }
    },[count])




    return (
        <div className="p-3">
            <h1 className="font-black" >Select 12 Cards:</h1>
            <div className="flex-grid">    
                {
                    cards?.map((card, i)=>{
                        return(
                            <div key={card.id} onClick={()=>{handleClick(card, i)}}>
                                <CardSetDisplay card={card} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default SelectCards