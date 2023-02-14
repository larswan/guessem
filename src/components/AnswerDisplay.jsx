import { useEffect } from "react"


const AnswerDisplay = ({prevTurn}) => {
    useEffect(()=>{
        console.log(prevTurn)

    },[])

    return(
        <div>
            <h1>{prevTurn.question}</h1>
            <h1>{prevTurn.answer}</h1>
        </div>
    )
}
export default AnswerDisplay