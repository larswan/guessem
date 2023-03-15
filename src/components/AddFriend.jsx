import { useState } from "react"

const AddFriend = ({user, setFriends}) =>{
    const [text, setText] = useState('')
    // const user = {id: 1}

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        // if (!emailRegex.test(text)) {
        //     alert("Email is not in the correct format");
        //     return;
        // }

        let req= await fetch("http://localhost:3000/friendships", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                p1Id: user.id,
                p2email: text
            })
        })
        let res = await req.json()
        console.log(req)
        if (req.ok){
            setFriends((prev)=>{return [...prev, res]})
        }
        else {
            alert(res.error)
        }
        setText('')
    }

    return(
        <div className="flex justify-center fixed bottom-2 left-0 right-0">
            <form className="py-2" onSubmit={handleSubmit} name="addFriend">
                <input  className="textForm" name="email" type="email" required placeholder="Add friend by e-mail" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                <button className="font-black rounded-sm text-white bg-blue py-1 px-2 ml-2">+ ADD</button>
            </form>        
        </div>
    )
}
export default AddFriend