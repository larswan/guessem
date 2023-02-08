import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import NameBar from "../components/NameBar"
import AddFriend from "../components/AddFriend"

const StartGame = () => {
    const navigate = useNavigate()
    const [friends, setFriends] = useState(null)

    // Stand in user
    const user = {id: 1, name: "Larson Collier", email: "collierlarson@gmail.com"}

    // get all friends by user id
    useEffect(()=>{
        const request= async()=>{
        let req = await fetch(`http://localhost:3000/friendships/${user.id}`)
        let res = await req.json()
        console.log(res)
        setFriends(res)
        }
        request()
    },[])

    const handleClick = (friend) => {
        let newGame = {p1Id: user.id, p2: friend.id}

        navigate("/choose_a_topic", { state:{
            user: user.id,
            friend: friend
        }
        })
    }


    return (
        <div className="p-3">
            <h1 className="font-black" >Choose a Friend:</h1>
            {
                friends?.map((friend)=>{
                    return(
                        <div onClick={() => {handleClick(friend)}} key={friend.id}>
                            <NameBar info={friend.name}/>
                        </div>
                    )
                })
            }
            <AddFriend />
        </div>
    )
}
export default StartGame