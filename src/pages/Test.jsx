import { useEffect, useState } from 'react'
import InstagramLogin from 'react-instagram-login';
import FacebookLogin from 'react-facebook-login';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from '@cloudinary/url-gen';
import { Cloudinary } from '@cloudinary/url-gen'


const Test = () => {

    // const igClientId = import.meta.env.REACT_APP_INSTAGRAM_APP_ID
    // const fbClientId = import.meta.env.REACT_APP_FACEBOOK_APP_ID
    // const responseInstagram = (response) => {
    //     console.log(response);
    // };
    // useEffect( async ()=>{
    //   let req = await fetch(`https://api.instagram.com/oauth/authorize?client_id=${igClientId}&redirect_uri=${"https://localhost:5173"}&response_type=token`)
    //   let res = await req.json()
    //   console.log(res)
    // },[])
    // const componentClicked = () => { console.log("clicked") }
    // const responseFacebook = (response) => { console.log(response) }

    const myImage = new CloudinaryImage('sample', { cloudName: 'dhop1fpun' }).resize(fill().width(100).height(150));

    return(
        <div>
            {/* <div>
                <AdvancedImage cldImg={myImage} />
            </div> */}


            <div>TEST

                {/* <InstagramLogin
                    clientId= {igClientId}
                    buttonText="Login with Instagram"
                    onSuccess={responseInstagram}
                    onFailure={responseInstagram}
                    implicitAuth={true}
                    scope="Basic"
                    /> */}

        

                {/* <FacebookLogin
                    appId={igClientId}
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook} /> */}

            </div>
        </div>
    )
}
export default Test