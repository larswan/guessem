const GameBar = ({game}) => {
    return (
        <div key={game.id} className="gameBar">
            <h1 className="font-black">vs. {game.opponentName}...  </h1>
            <h1> {game.topic}</h1>
            {/* <h1>whosTurn:  {game.whosTurn}</h1> */}
        </div>
    )
}
export default GameBar