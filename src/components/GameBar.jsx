const GameBar = ({game}) => {
    return (
        <div key={game.id} className="flex border-black border-2 rounded p-1 bg-white">
            <h1 className="font-black">vs. {game.opponentName} - </h1>
            <h1>topic:  {game.topic}</h1>
            {/* <h1>whosTurn:  {game.whosTurn}</h1> */}
        </div>
    )
}
export default GameBar