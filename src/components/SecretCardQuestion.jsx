import { useState } from "react"

const SecretCard = ({secretCard}) => {
    const [showSecret, setShowSecret] = useState(true)

    const handleClick = () => {
        setShowSecret(!showSecret)
    }

    
    return(
        <div className="flex-column">
            {/* <h1 className="Subheader">Your Card</h1> */}
            <img className="secretCardQuestion" onClick={() => { handleClick() }} src={showSecret ? secretCard.image : "backend/app/assets/images/designAssetts/logo alt color.png"} />
        </div>
    )
}
export default SecretCard