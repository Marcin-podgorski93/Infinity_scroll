const container = document.getElementById('image-container');

let photoArray = [];
let ready = false;
let loadedImages = 0;
let totalImages = 0;

const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=AdPm_uRRDdyvWo1saPRJHxalgYitsIg-hHjlZDsdRaY&count=${count}`;

// Check if all images were loaded 
function imageLoaded() {
    loadedImages++;
    console.log(loadedImages);
    if (loadedImages === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready=', ready)
    }
}


// Helper function to set Attributes on DOM Elements
// function setAttributes(element, attributes) {
//     for (const key in attributes ) {
//        element.setAttributes(key, attributes[key])
//         }
//     }

// Create Elements for Links $ Photos, Add to DOM 
function showPictures() {
    loadedImages = 0;
    totalImages = photoArray.length;
    console.log('total images', totalImages);
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
        // Event listener,check when each is finished loading
        img.addEventListener('load', imageLoaded);
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

// Check to see if scrolling near bottom of page, Load more Photos
window.onscroll = async function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log('load more');
        await fetchImage();
    }
};

fetchImage();

