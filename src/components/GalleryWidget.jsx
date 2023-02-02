import { useState } from 'react';


const photoArray = [
    { publicId: "hands", alt: "Elijah and Sofie showing their rings" },
    {
        publicId: "kiss",
        alt: "The bride and groom smoochin"
    },
    { publicId: "elijahian", alt: "Best buds Eljah and Ian" },
    {
        publicId: "elijahpops",
        alt: "Elijah and his father's best friends"
    }
];

function getImageUrl({ cloudName, publicId, transformations }) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}.jpg`;
}

function Image({ cloudName, publicId, alt }) {
    const imageSource = getImageUrl({
        cloudName,
        publicId,
        transformations: "q_auto,f_auto,c_fill,w_400,ar_1"
    });

    return <img src={imageSource} alt={alt} />;
}

function Thumb({ cloudName, publicId, alt }) {
    const imageSource = getImageUrl({
        cloudName,
        publicId,
        transformations: "q_auto,f_auto,c_thumb,w_50,ar_1"
    });

    // add the full URL to a standard HTML5 video element
    return <img src={imageSource} alt={alt} />;
};

function GalleryWidget() {
    const [selected, setSelected] = React.useState(photoArray[0]);

    return (
        <main>
            <h1>Photo Gallery With Automatic Thumbnails Using React & Cloudinary</h1>
            <div className="gallery">
                <Image
                    cloudName="dt7vdar85"
                    publicId={selected.publicId}
                    alt={selected.alt}
                />
                <nav className="thumbnails">
                    {photoArray.map((photo) => (
                        <button
                            onClick={() => setSelected(photo)}
                            className={selected.publicId === photo.publicId ? "selected" : ""}
                        >
                            <Thumb
                                cloudName="dt7vdar85"
                                publicId={photo.publicId}
                                alt={photo.alt}
                            />
                        </button>
                    ))}
                </nav>
            </div>
        </main>
    );
}

export default GalleryWidget