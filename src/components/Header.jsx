import BackButton from "./BackButton"

const Header = ({user}) => {

    return(
        <div id='header' className='flex h-10'>
            <BackButton />
            {
                user ? 
                    <div>
                        <h1>{user.name}</h1>
                        {/* <img src={user.image} className ="" /> */}
                    </div>
                 : null
            }
        </div>
    )
}
export default Header