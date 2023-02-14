import Header from '../components/Header'

const Wait = ({ gameData, setGameData, user, setPhase }) => {
    return (
        <div>
            <Header />
            <div className='Subheader'>Wait</div>
            <img className="w-full p-2" src="backend/app/assets/images/designAssetts/logo transparent.png"/>
        </div>
    )
}
export default Wait