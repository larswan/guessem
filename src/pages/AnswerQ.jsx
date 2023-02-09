import Header from "../components/Header"
import { useState, useEffect } from "react"

const AnswerQ = ({ gameData, setGameData, user, setPhase }) => {
    const [answer, setAnswer] = useState('')
    
    return (
        <div className="flex justify-center">
        <Header />
        <div>AnswerQ</div>
            <form className="py-2 ">
                <input className="p-1" name="answer" type="text" required placeholder="Answer..." value={answer} onChange={(e) => { setAnswer(e.target.value) }}></input>
                <button className="font-black bg-green-600 py-1 px-2 text-white ml-2 rounded-sm" onSubmit={handleSubmit()}>ASK</button>
            </form>

    </div>
    )
}
export default AnswerQ