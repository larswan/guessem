const NameBar = ({info}) => {
    return (
        <div key={info} className="border-black border-2 rounded p-1">
            <h1>{info}</h1>
        </div>
    )
}
export default NameBar