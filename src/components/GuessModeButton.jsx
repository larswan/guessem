const GuessModeButton = ({guessMode, setGuessMode, setQuestion}) => {

    const handleClick =()=>{
        if (guessMode){
            setGuessMode(!guessMode)
            setQuestion("")
            console.log(guessMode)
        }
        else{
            setQuestion("Click a card!")
            setGuessMode(!guessMode)
            console.log(guessMode)
        }
    }

    return(
        <div className="flex justify-center">
            <div onClick={()=>{handleClick()}} className="font-black bg-lightBlackish ml-2 my-2 rounded-full w-1/4">
                <img src="backend/app/assets/images/designAssetts/logo trans grey color.png" className="drop-shadow-xl rounded-full" />
            </div>
        </div>
    )
}
export default GuessModeButton