import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import GameBoard from "./GameBoard"
import WaitingForOtherPlayer from "./WaitingForOtherPlayer"

const TurnRouter = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    let currentPlayer
    let otherplayer

    const backHandler = () => {
        navigate('/')
    }

    useEffect(()=>{
        let id = state.gameId
        console.log(id)
        const request = async () => {
            let req= await fetch(`http://localhost:3000/games/${id}`)
            let res = await req.json()
            console.log(res)

            //set the currentPlayer and otherPlayer
        }
        request()
    },[])

    return(
        <div>
            <img className="w-10 h-9 p-2 border-black" onClick={() => { backHandler() }} src="https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767523-1502427.png" />
            {
                // add boolean to choose which screen it goes to, based on whos turn it is (waiting or gameboard)
            }
            TurnRouter
        </div>
    )
}

export default TurnRouter