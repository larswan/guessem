const GuessModeButton = ({guessMode, setGuessMode}) => {

    const handleClick =()=>{
        setGuessMode(!guessMode)
        console.log(guessMode)
    }


    return(
        <div className="">
            <div onClick={()=>{handleClick()}} className="flex justify-center font-black bg-red py-1 px-2 text-white ml-2 my-2 rounded-full">
                Guess A Card!
            </div>
        </div>
    )
}
export default GuessModeButton