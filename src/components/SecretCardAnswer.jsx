import { useEffect } from "react"


const SecretCardAnswer = ({card}) => {

    useEffect(()=>{
        console.log(card)
    },[])

    return(
        <div>
            <img src={card.image} />
        </div>
    )
}
export default SecretCardAnswer