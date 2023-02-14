const CardSetDisplay = ({card, guessMode}) => {
    return(
        // <div className="border-2 border-lightBlackish position-relative">
        <div className="cardContainer">
            <img className="drop-shadow-md " src={card.faceUp ? card.image : "backend/app/assets/images/designAssetts/logo.png"} />
            <h1 className="cardName">{card.name}</h1>
        </div>
    )
}
export default CardSetDisplay