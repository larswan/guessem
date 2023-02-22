import BackButton from "../components/BackButton"
import Header from "../components/Header"

const WinningScreen = ({ opponent, setPhase, gameData, user, player}) => {
    console.log(gameData, user)
    const youWon = (gameData.game.winningUser == user.id)

    return (
        <div>
            <Header />
            <div className="PagePadder">
                {
                    youWon ? <h1 className="victoryText">YOU WON!</h1> : <h1 className="victoryText">you lost...</h1>
                }
                <img className="cardBig" src={gameData.winningCard.image} />            
                <div className="flex">
                    <h1 className="QAheader" >{user.name} knew it was {gameData.winningCard.name} from this question: </h1>
                </div>
                <h1 className="QAtext" >{gameData.game.winningQuestion}</h1>
                <h1 className="Subheader" >{gameData.game.winningAnswer}</h1>
            </div>
        </div>
    )
}
export default WinningScreen