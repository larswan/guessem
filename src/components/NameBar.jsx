

const NameBar = ({info, handleClick}) => {
    return (
        <div className="border-black border-2 rounded p-1" onClick={() => {handleClick}} >
            <text>{info}</text>
        </div>
    )
}
export default NameBar