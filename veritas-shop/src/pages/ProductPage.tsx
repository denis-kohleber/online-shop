import { useNavigate, useParams } from 'react-router-dom';
import shoeData from '../shoeData.json';
import { checkProductUrl } from '../utils/urlValidation';

function ProductPage() {
    const { category, id } = useParams<string>();
    const navigate = useNavigate();

    // Url Validation
    if (category && id && !checkProductUrl(category, id, shoeData)) {
        navigate('/404');
        return null;
    }

    return (
        <>
            <h1>Produkt Seite</h1>
            <p>Hallo Kategorie: {category}</p>
            <p>Hallo Produkt {id}</p>
        </>
    );
}

export { ProductPage };
