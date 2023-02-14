import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import NameBar from "../components/NameBar"
import LogoutButton from "../components/LogoutButton"
import Cookies from 'js-cookie'
import GameBar from "../components/GameBar"
import NewGameButton from "../components/NewGameButton"


const AllGames = ({ userObj, setUserObj }) => {
    const navigate = useNavigate()
    const [currentGames, setCurrentGames] = useState([])
    const [user, setUser] = useState()

    useEffect(()=>{
        let cookieUserId = Cookies.get('userId')
        let cookieUserName = Cookies.get('userName')
        let cookieUserImage = Cookies.get('userImage')

        if (!cookieUserId) { navigate('/login') }
        else { setUser({ id: cookieUserId, name: cookieUserName, image: cookieUserImage }) } 
        
        const request = async()=>{
            let req = await fetch(`http://localhost:3000/active_games/${cookieUserId}`)
            let res= await req.json()
            if(req.ok) {
                setCurrentGames(res)
            }
            else {err=>{console.log(err)}}
        }   
        request()
    },[])

    const handleClick = (id) => {
        navigate("/play", {state: {
            gameId: id }})}

    return(
        <div className="p-3">
            {user?<h1>signed in as {user.name}</h1>: null}
            <h1 className="font-black" >Your Turn</h1>

            {
                //render current games (only if active, send back other users name, and game id)
                currentGames?.map((game)=>{
                    if(game.whosTurn == user.id)
                        return(
                            <div key={i} onClick={() => { handleClick(game.id) }}>
                                <GameBar game={game}/>
                            </div>
                        )
                })
            }
            <h1 className="font-black" >Their Turn</h1>

            {
                //render current games (only if active, send back other users name, and game id)
                currentGames?.map((game, i)=>{
                    if (game.whosTurn != user.id)
                        return(
                            <div key={i} onClick={() => { handleClick(game.id) }}>
                                <GameBar game={game} />
                            </div> )
                })
            }
            <NewGameButton />
            <div className="flex justify-center fixed bottom-2 left-0 right-0">
                <LogoutButton userObj={userObj} setUserObj={setUserObj} />
            </div>
        </div>
    )
}
export default AllGames