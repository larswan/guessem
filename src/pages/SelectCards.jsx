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
        if (count == 3){
            let selectedCards = cards.filter((card)=>{if(card.faceUp == true){return card}})
            let bothSecretCards = randomTwoFromArray(selectedCards)
           
            // console.log(state)
            // let newGame = { ...state, whosTurn: state.user , cards: selectedCards, p1SecretCard: bothSecretCards[0].id, p2SecretCard: bothSecretCards[1].id, p1: state.user, p2: state.friend.id}
            // console.log(newGame)

            // post newGame to db
            const request = async () => {
                let req = await fetch(`http://localhost:3000/games`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        game: {p1: state.user, 
                        p2: state.friend.id,
                        p1SecretCard: bothSecretCards[0].id, p2SecretCard: bothSecretCards[1].id, 
                        inProgress: true,
                        whosTurn: state.user, 
                        currentTurn: 1,
                        cards: JSON.stringify({cards: selectedCards}), 
                        topic: state.topic}
                    })
                })
                let res = await req.json()
                // let cardShot = await res.cards.json()
                console.log(res.cards)
                // console.log(res.cards)
                // console.log(res)
                
                // return game Id from that post and when res.ok route to GameBoard/:GameId
                if(res.ok){
                    navigate('/play',{state:{
                        game: res
                    }})
                } else {
                    // console.log(res)
                }
            }
            request()
        }
    },[count])

    return (
        <div className="">
            <h1 className="font-black" >Select 12 Cards:</h1>
            <div className="flex flex-column flex-wrap space-x-1 space-y-1 justify-center">    
                {
                    cards?.map((card, i)=>{
                        return(
                            <div key={card.id} className="w-3/12" onClick={()=>{handleClick(card, i)}}>
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