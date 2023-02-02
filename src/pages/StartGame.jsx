import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import NameBar from "../components/NameBar"

const StartGame = () => {
    const navigate = useNavigate()
    const [friends, setFriends] = useState(null)

    // Stand in user ID
    const userId = 1

    // get all friends by user id
    useEffect(()=>{
        const request= async()=>{
        let req = await fetch(`http://localhost:3000/friendships/${userId}`)
        let res = await req.json()
        console.log(res)
        setFriends(res)
        }
        request()
    },[])


    return (
        <div className="p-3">
            <text className="font-black" >Choose a Friend:</text>
            {
                friends?.map((friend)=>{
                    return(
                        <div onClick={() => { navigate("/choose_a_topic", {user: userId, friend: friend})}}>
                            <NameBar info={friend.name}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default StartGame