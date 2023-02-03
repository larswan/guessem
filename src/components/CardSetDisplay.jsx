const CardSetDisplay = ({card}) => {
    return(
        <div className={card.faceUp ? "border-2 border-black" : "border-2 border-l-indigo-50		"}>
            <img src={card.image} />
        </div>
    )
}
export default CardSetDisplay