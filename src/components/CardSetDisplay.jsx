const CardSetDisplay = ({card}) => {
    return(
        <div className={card.faceUp ? "cardContainerSelected" : "cardContainer"}>
            <img className="cardImage" src={card.image} />
            <div className="cardNameDiv">
                <h1 className="cardName">{card.name}</h1>
            </div>

        </div>
    )
}
export default CardSetDisplay