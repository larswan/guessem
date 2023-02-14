const AnswerDisplay = ({prevTurn, opponent}) => {

    return(
        <div className="py-3">
            <div className="flex"> 
                <h1 className="QAheader" >You asked: </h1>
                <h1 className="QAtext" > {prevTurn.question}</h1>
            </div>
            <div className="flex"> 
                <h1 className="QAheader" >{opponent.givenName} says: </h1>
                <h1 className="QAtext" > {prevTurn.answer}</h1>
            </div>
        </div>
    )
}
export default AnswerDisplay