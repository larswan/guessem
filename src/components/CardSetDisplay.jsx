const CardSetDisplay = ({card}) => {
    return(
        <div className={card.faceUp ? "border-2 border-l-blackish" : "drop-shadow-2xl"}>
            <img  src={card.image} />
        </div>
    )
}
export default CardSetDisplay