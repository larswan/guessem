import { useState } from "react"

const SecretCard = ({secretCard}) => {
    const [showSecret, setShowSecret] = useState(false)
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setShowSecret(!showSecret)
    }

    
    return(
        <div className={showSecret ? "PlayerCardActive" :"PlayerCard"}>
            {/* <h1 className="Subheader">Your Card</h1> */}
            <img className="secretCard" onClick={() => { handleClick() }} src={showSecret ? secretCard.image : "backend/app/assets/images/designAssetts/logo black card.png"} />
            {
                showSecret? 
                <h1 className="topicText" >{secretCard.name}</h1>
                : null
            }

        </div>
    )
}
export default SecretCard