import { useNavigate, useParams } from 'react-router-dom';
import shoeData from '../shoeData.json';
import { checkCategoryUrl } from '../utils/urlValidation';
import { FancyImg } from '../components/FancyImg';
import {
    getCategoryHeroImageURL,
    getCategoryHeroPlaceholderImageURL,
} from '../utils/image-util';
import '../styles/CategoriesPage.css'

export default function CategoriesPage() {
    const { category } = useParams<string>();
    const navigate = useNavigate();

    const categoryName: string = category ? category : '';

    // Url Validation
    if (category && !checkCategoryUrl(category, shoeData)) {
        navigate('/404');
        return null;
    }

    const chooseText = (categoryName: string) => {
        if (categoryName === 'outdoor') {
            return 'Entdecke unsere Outdoor-Schuhe, die für Abenteuer in der Natur entwickelt wurden. Egal ob Wanderschuhe, Trekkingstiefel oder Trailrunning-Schuhe – unsere Kollektion bietet optimalen Halt, Komfort und Schutz für jedes Terrain. Perfekt für alle, die gerne draußen unterwegs sind und auf Qualität und Langlebigkeit setzen.';
        }
        if (categoryName === 'workwear') {
            return 'Unsere Workwear-Schuhe bieten dir den nötigen Schutz und Komfort für lange Arbeitstage in anspruchsvollen Umgebungen. Von robusten Arbeitsschuhen bis zu speziellen Sicherheitsschuhen – hier findest du die richtige Ausrüstung, um sicher und effizient durch den Tag zu kommen. Strapazierfähig, sicher und zuverlässig.';
        }
        if (categoryName === 'sport') {
            return 'Erreiche neue Bestleistungen mit unseren Sportschuhen, die für eine Vielzahl sportlicher Aktivitäten entwickelt wurden. Egal ob Fitness, Laufen oder Training – unsere Sportschuhe bieten dir optimalen Halt, Flexibilität und Atmungsaktivität, damit du dich ganz auf deine Performance konzentrieren kannst.';
        }
    };

    return (
        <>
            <section className="cPage_introduction">
                <div className="cPage_introductionLeftSide">
                    <h1 className="cPage_headline">{categoryName.toUpperCase()}</h1>
                    <p className="cPage_description">
                        {chooseText(categoryName)}
                    </p>
                </div>
                <FancyImg
                    srcImg={getCategoryHeroImageURL(`${categoryName}.webp`)}
                    srcPlaceholder={getCategoryHeroPlaceholderImageURL(
                        `${categoryName}.webp`
                    )}
                    alt={`${categoryName}-Aktivität`}
                    classContainer="cPage_hero"
                    classPlaceholder='cPage_heroPlaceholder'
                />
            </section>
            <section className='cPage_itemDisplay' aria-label='Verfügbare Artikel'>

            </section>
        </>
    );
}
