const CardSetDisplay = ({card, guessMode}) => {
    return(
        <div className="border-2 border-black">
            <img src={card.faceUp ? card.image : "backend/app/assets/images/cardBack.jpg"} />
        </div>
    )
}
export default CardSetDisplay