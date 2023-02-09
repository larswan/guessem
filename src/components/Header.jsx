import BackButton from "./BackButton"

const Header = ({user}) => {

    return(
        <div id='header' className='flex h-10 w-full bg-gray-400 text-white'>
            <BackButton />
            {
                user ? 
                    <div>
                        <h1>Current user: {user.name}</h1>
                        {/* <img src={user.image} className ="" /> */}
                    </div>
                 : null
            }
        </div>
    )
}
export default Header