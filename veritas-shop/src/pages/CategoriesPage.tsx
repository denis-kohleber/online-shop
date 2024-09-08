import { useNavigate, useParams } from 'react-router-dom';
import shoeData from '../shoeData.json';
import { checkCategoryUrl } from '../utils/urlValidation';

export default function CategoriesPage() {
    const { category } = useParams<string>();
    const navigate = useNavigate();

    // Url Validation
    if (category && !checkCategoryUrl(category, shoeData)) {
        navigate('/404');
        return null;
    }

    return (
        <>
            <h1>Category Seite</h1>
            <p>Hallo {category}</p>
            <p>Hallo {category}</p>
        </>
    );
}
