import BackButton from "../components/BackButton"

const WinningScreen = ({ opponent, setPhase, gameData, user, player}) => {
    console.log(gameData)
    return (
        <div>
            <BackButton />
            Winning screen:  {gameData.game.winningUser} guessed {gameData.game.winningCard.name} off this question: {gameData.game.winningQuestion} {gameData.game.winningAnswer}
            <img src={gameData.winningCard.image} />
        </div>
        
    )
}
export default WinningScreen