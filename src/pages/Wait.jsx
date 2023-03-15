import Header from '../components/Header'

const Wait = ({ gameData, setGameData, user, setPhase, opponent }) => {
    return (
        <div>
            <Header text={"THEIR TURN"}/>
            <div className="PagePadder">

            <img className="w-full px-2" src="backend/app/assets/images/designAssetts/logo transparent.png"/>
            <div className='Subheader'>Waiting for {opponent.givenName} to play...</div>
            </div>
        </div>
    )
}
export default Wait