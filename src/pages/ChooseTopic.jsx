import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import TopicDisplay from "../components/TopicDisplay.jsx"

const ChooseTopic = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [topics, setTopics] = useState([])

    useEffect(()=>{
        if(state == null) navigate("./new_game")
        console.log(state)
        
        const request = async() => {
            let req = await fetch(`http://localhost:3000/card_sets`)
            let res = await req.json()
            console.log(res)
            setTopics(res)
        }
        request()
    },[])        

    const handleClick = (topic) => {
        state.cards = topic.cards
        state.topic = topic.topic
        navigate("/select_cards", {state} )
    }


    
    return (
        <div>
            <h1 className="Subheader" >Pick A Topic</h1>
            <div className="p-3 flex-column justify-center">
                {
                    topics?.map((topic)=>{
                        return(
                            <div onClick={()=>{handleClick(topic)}} key={topic.id}>
                                <TopicDisplay topic={topic} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ChooseTopic