

const WinningScreen = ({ opponent, opponentSecret, setPhase, gameData, prevTurn, setGameData, user, secretCard, player, cards, setCards }) => {
    console.log(gameData)
    return (
        <div>
            Winning screen:  {gameData.game.winningUser} guessed {gameData.game.winningCard.name} off this question: {gameData.game.winningQuestion} {gameData.game.winningAnswer}
            <img src={gameData.winningCard.image} />
        </div>
        
    )
}
export default WinningScreen