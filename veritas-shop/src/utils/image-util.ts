function getImageURL(name: string) {
    return new URL(`../assets/schuhe/${name}`, import.meta.url).href;
}

function getPlaceholderImageURL(name: string) {
    return new URL(`../assets/schuhe-small/${name}`, import.meta.url).href;
}

function getSearchProductImageURL(name: string) {
    return new URL(`../assets/schuhe-medium/${name}`, import.meta.url).href;
}

function getCategoryHeroImageURL(name: string) {
    return new URL(`../assets/categoriesHero/${name}`, import.meta.url).href;
}

function getCategoryHeroPlaceholderImageURL(name: string) {
    return new URL(`../assets/categoriesHero/placeholder/${name}`, import.meta.url).href;
}

export { getImageURL, getPlaceholderImageURL, getSearchProductImageURL, getCategoryHeroImageURL, getCategoryHeroPlaceholderImageURL }