import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import NameBar from "../components/NameBar"
import AddFriend from "../components/AddFriend"
import Cookies from 'js-cookie'
import Header from "../components/Header"

const StartGame = () => {
    const navigate = useNavigate()
    const [friends, setFriends] = useState(null)
    const [user, setUser] = useState()

    // get all friends by user id
    useEffect(()=>{
        let cookieUserId = Cookies.get('userId')
        let cookieUserName = Cookies.get('userName')
        let cookieUserImage = Cookies.get('userImage')
        
        if (!cookieUserId) { navigate('/login') }
        else { setUser({
            id: cookieUserId, 
            name: cookieUserName, 
            image: cookieUserImage})}      

        const request= async()=>{
            let req = await fetch(`http://localhost:3000/friendships/${cookieUserId}`)
            let res = await req.json()
            // console.log(req.ok)
            if (req.ok) {
                setFriends(res);
                console.log(res)
            }
            else if (req.error)
            {alert(req.error)}
        }
        request()
    },[])

    const handleClick = (friend) => {
        navigate("/choose_a_topic", { state:{
            user: user.id,
            friend: friend
        }
        })
    }

    useEffect(()=>{

        console.log("friends change... now its: ", friends)
    },[friends])


    return (
        <div className="p-3">
            <Header user={user} text={"CHOOSE A FRIEND:"}/>
            <div className="PagePadder">
                {/* <h1 className="Subheader" >Choose a Friend:</h1> */}
                {friends ? (
                    friends.map((friend) => {
                        return (
                            <div onClick={() => handleClick(friend)} key={friend.id}>
                                <NameBar info={friend.name} />
                            </div>
                        );
                    })
                ) : (
                    <div>You don't have any friends.. and you never will... unless you add them by e-mail.</div>
                )}
                <AddFriend user={user} setFriends={setFriends}/>
            </div>
        </div>
    )
}
export default StartGame