const GuessModeButton = ({guessMode, setGuessMode, setQuestion}) => {

    const handleClick =()=>{
        if (guessMode){
            setGuessMode(!guessMode)
            setQuestion("")
            console.log(guessMode)
        }
        else{
            setQuestion("Press again to turn off guess mode...")
            setGuessMode(!guessMode)
            console.log(guessMode)
        }
    }

    return(
        <div className={guessMode ? "guessButtonOn" : "guessButtonOff" } >
            <button onClick={() => { handleClick() }} className="font-black bg-blackish w-full py-1 px-2 text-lightYellow my-4 rounded-sm" >{guessMode ? "CHOOSE A CARD!" :"GUESS A CARD"}</button>
            {/* <div onClick={()=>{handleClick()}} className="font-black bg-lightBlackish p-2 ml-2 my-2 rounded-lg w-1/4">
                <img src="backend/app/assets/images/designAssetts/logo trans grey color.png"  />
            </div> */}
        </div>
    )
}
export default GuessModeButton