import { useState } from "react"

const AddFriend = ({user}) =>{
    const [text, setText] = useState('')
    // const user = {id: 1}

    const handleSubmit = async (e) => {
        e.preventDefault()

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
        console.log(res)
        setText('')
    }

    return(
        <div>
            <form onSubmit={handleSubmit} name="addFriend">
                <input  name="email" type="email" placeholder="Add friend by e-mail" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
                <button className="font-black  text-white bg-green-600">+ ADD</button>
            </form>        
        </div>
    )
}
export default AddFriend