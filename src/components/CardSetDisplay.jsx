const CardSetDisplay = ({card}) => {
    return(
        <div className={card.faceUp ? "cardContainerSelected" : "cardContainer"}>
            <img className="cardImage" src={card.image} />
            <h1 className="cardName">{card.name}</h1>

        </div>
    )
}
export default CardSetDisplay