const NameBar = ({info}) => {
    return (
        <div key={info} className="gameBar">
            <h1>{info}</h1>
        </div>
    )
}
export default NameBar