const TopicDisplay = ({topic}) => {
    return(
        <div>
            <img className="drop-shadow-lg" alt={topic.topic} src={topic.cards[0].image}/>
            <h1 className="font-bold" >{topic.topic}</h1>
        </div>
    )
}
export default TopicDisplay