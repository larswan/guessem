import React from 'react';
import UploadWidget from '../components/UploadWidget'

function Profile() {

    return (
        <div>
            <h1>Profile Page</h1>
            <UploadWidget />
            {/* <GalleryWidget/> */}
            <div>
                <button>LOGOUT</button>
            </div>
        </div>
    )
}
export default Profile