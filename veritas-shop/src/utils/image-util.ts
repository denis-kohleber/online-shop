function getImageURL(name: string) {
    return new URL(`../assets/schuhe/${name}`, import.meta.url).href;
}

function getPlaceholderImageURL(name: string) {
    return new URL(`../assets/schuhe-small/${name}`, import.meta.url).href;
}

export { getImageURL, getPlaceholderImageURL }