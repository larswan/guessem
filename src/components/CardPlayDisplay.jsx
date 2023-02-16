const CardSetDisplay = ({card, guessMode}) => {
    return(
        // <div className="border-2 border-lightBlackish position-relative">
        <div >
            <img className="cardPlayImage" src={card.faceUp ? card.image : "backend/app/assets/images/designAssetts/logo.png"} />
            { card.faceUp ? <h1 className="cardName">{card.name}</h1> : null }
        </div>
    )
}
export default CardSetDisplay