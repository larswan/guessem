import { useEffect } from "react"

const SecretCardAnswer = ({card}) => {

    return(
        <div className="w-4/5 py-3 pb-10 ">
            <div className="flex relative" >
                <img className="cardBig" src={card.image} />
                <h1 className="cardNameBig">{card.name}</h1>
            </div>
        </div>
    )
}
export default SecretCardAnswer