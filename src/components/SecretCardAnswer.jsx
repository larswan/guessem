import { useEffect } from "react"

const SecretCardAnswer = ({card}) => {

    // useEffect(()=>{
    //     console.log(card)
    // },[])

    return(
        <div className="w-4/5">
            <img src={card.image} />
        </div>
    )
}
export default SecretCardAnswer