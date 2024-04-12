const container = document.getElementById('image-container');

const count = 2;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=LC1Jz5zQmU9Vcle2MJkb6BVzvZAkC1TiZeHRU5PBhR4&count=${count}`;

let photoArray = [];


// Helper function to set Attributes on DOM Elements
// function setAttributes(element, attributes) {
//     for (const key in attributes ) {
//        element.setAttributes(key, attributes[key])
//         }
//     }

// Create Elements for Links $ Photos, Add to DOM 
function showPictures() {
    // Run function for each object in photoArray
    photoArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Put <img> inside <a>, then put both inside image-container Element
        // <img> to <a>
        item.appendChild(img);
        // add <a> to image-container
        container.appendChild(item);
    });
}


// Get photos from Unsplash API 
async function fetchImage() {
    try {
        const repo = await fetch(apiUrl);
        photoArray = await repo.json();
        showPictures();
    } catch (error) {
        // Catch Error Here
    }
}

fetchImage();

// Check to see if scrolling near bottom of page, Load more Photos
window.onscroll = async function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        await fetchImage();
    }
};