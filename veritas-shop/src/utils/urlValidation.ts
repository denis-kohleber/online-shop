interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    type: string;
    'image-front': string;
    'image-back': string;
    rating: number;
    waterproof: boolean;
    highlight: boolean;
}

// Check if the URL has a valid product category
const checkCategoryUrl = (category: string, shoeData: Product[]) => {
    return shoeData.some(
        (item) => item.category === category || category === 'all-products'
    );
};

// Check if the URL has a valid product category and id
const checkProductUrl = (category: string, id: string, shoeData: Product[]) => {
    return shoeData.some(
        (item) => item.category === category && item.id === +id
    );
};

export { checkProductUrl, checkCategoryUrl };
