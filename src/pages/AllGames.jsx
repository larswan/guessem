import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import NameBar from "../components/NameBar"
import LogoutButton from "../components/LogoutButton"
import Cookies from 'js-cookie'


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
                // console.log(res)
                setCurrentGames(res)
            }
            else {err=>{console.log(err)}}
        }   
        request()
    },[])

    const newGameNav = () => {
        navigate("/new_game")
    }

    const handleClick = (id) => {
        navigate("/play", {state: {
            gameId: id }})}

    return(
        <div className="p-3">
            {/* <h1 className="font-black" >AllGames</h1> */}
            <div onClick={() => { newGameNav() }}>
                <NameBar info="+ New Game" handleClick={newGameNav}/>
            </div>
            <h1 className="font-black" >Your Turn</h1>

            {
                //render current games (only if active, send back other users name, and game id)
                currentGames?.map((game)=>{
                    if(game.myTurn == true)
                    return(
                        <div onClick={() => { handleClick(game.id) }}>
                            <NameBar info={game.name} />
                        </div>
                    )
                })
            }
            <h1 className="font-black" >Their Turn</h1>

            {
                //render current games (only if active, send back other users name, and game id)
                currentGames?.map((game)=>{
                    if (game.myTurn == false)
                    return(
                        <div onClick={() => { handleClick(game.id) }}>
                            <NameBar info={game.name} />
                        </div>                    )
                })
            }
            <LogoutButton userObj={userObj} setUserObj={setUserObj} />
        </div>
    )
}
export default AllGames