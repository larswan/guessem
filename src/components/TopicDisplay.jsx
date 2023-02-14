const TopicDisplay = ({topic}) => {
    return(
        <div className="topicContainer">
            <img className="topicImage" alt={topic.topic} src={topic.cards[0].image}/>
            <h1 className="topicText" >{topic.topic}</h1>
        </div>
    )
}
export default TopicDisplay