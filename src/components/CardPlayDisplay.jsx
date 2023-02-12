const CardSetDisplay = ({card, guessMode}) => {
    return(
        <div className="border-2 border-lightBlackish">
        {/* <div> */}
            <img className="drop-shadow-md" src={card.faceUp ? card.image : "backend/app/assets/images/designAssetts/logo.png"} />
        </div>
    )
}
export default CardSetDisplay