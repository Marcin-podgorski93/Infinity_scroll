const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=AdPm_uRRDdyvWo1saPRJHxalgYitsIg-hHjlZDsdRaY&count=${count}`;

async function fetchImage() {
    const repo = await fetch(apiUrl);
    const data = await repo.json();
    console.log(data);
}

fetchImage()