import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import NameBar from "../components/NameBar"
import AddFriend from "../components/AddFriend"
import Cookies from 'js-cookie'
import BackButton from "../components/BackButton"

const StartGame = () => {
    const navigate = useNavigate()
    const [friends, setFriends] = useState()
    const [userId, setUserId] = useState()

    // get all friends by user id
    useEffect(()=>{
        let cookieUser = Cookies.get('user')

        if (!cookieUser) { navigate('/login') }
        else { setUserId(cookieUser) }      

        const request= async()=>{
            let req = await fetch(`http://localhost:3000/friendships/${userId}`)
            let res = await req.json()
            console.log(res)
            setFriends(res)
        }
        request()
    },[])

    const handleClick = (friend) => {
        navigate("/choose_a_topic", { state:{
            user: userId,
            friend: friend
        }
        })
    }


    return (
        <div className="p-3">
            <BackButton />
            <h1 className="font-black" >Choose a Friend:</h1>
            {/* {   
                friends?.map((friend)=>{
                    return(
                        <div onClick={() => {handleClick(friend)}} key={friend.id}>
                            <NameBar info={friend.name}/>
                        </div>
                    )
                })
            } */}
            <AddFriend />
        </div>
    )
}
export default StartGame