import { useNavigate, useParams } from 'react-router-dom';
import shoeData from '../shoeData.json';
import { checkCategoryUrl } from '../utils/urlValidation';
import { FancyImg } from '../components/FancyImg';
import placeholderHero01 from '../assets/categoriesHero/placeholder/outdoor.webp';
import placeholderHero02 from '../assets/categoriesHero/placeholder/workwear.webp';
import placeholderHero03 from '../assets/categoriesHero/placeholder/sport.webp';
import { getCategoryHeroImageURL } from '../utils/image-util';
import '../styles/CategoriesPage.css';
import arrowLeftIcon from '../assets/regular-icons/chevron-left-black.svg';
import arrowRightIcon from '../assets/regular-icons/chevron-right-black.svg';
import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'framer-motion';

interface ShoeItem {
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

export default function CategoriesPage() {
    const { category } = useParams<string>();
    const navigate = useNavigate();

    const categoryName: string = category ? category : '';

    const galleryRef = useRef<HTMLElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [filteredProducts, setFilteredProducts] = useState<ShoeItem[]>([]);
    const [products, setProducts] = useState<ShoeItem[]>([]);
    const [currentProducts, setCurrentProducts] = useState<ShoeItem[]>([]);

    // URL Validation
    useEffect(() => {
        if (category && !checkCategoryUrl(category, shoeData)) {
            navigate('/404');
        }
    }, [category, navigate]);

    useEffect(() => {
        const newFilteredData = shoeData.filter(
            (product) => product.category === categoryName
        );
        setFilteredProducts(newFilteredData);
        setCurrentPage(1);
    }, [categoryName]);

    useEffect(() => {
        setProducts(filteredProducts);
    }, [filteredProducts]);

    useEffect(() => {
        setCurrentProducts(
            products.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            )
        );
    }, [products, currentPage]);

    const goToPreviousPage = () => {
        if (!(currentPage > 1)) return;

        if (galleryRef.current) {
            galleryRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

        setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (!(currentPage < totalPages)) return;

        if (galleryRef.current) {
            galleryRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

        setCurrentPage(currentPage + 1);
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    function sortByPriceAscending() {
        setProducts((prevProducts) =>
            [...prevProducts].sort((a, b) => a.price - b.price)
        );
    }

    function sortByPriceDescending() {
        setProducts((prevProducts) =>
            [...prevProducts].sort((a, b) => b.price - a.price)
        );
    }

    function sortByRatingDescending() {
        setProducts((prevProducts) =>
            [...prevProducts].sort((a, b) => b.rating - a.rating)
        );
    }

    function sortByRelevance() {
        setProducts(filteredProducts);
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
                    <h1 className="cPage_headline">
                        {categoryName.toUpperCase()}
                    </h1>
                    <p className="cPage_description">
                        {chooseText(categoryName)}
                    </p>
                </div>
                <FancyImg
                    srcImg={getCategoryHeroImageURL(`${categoryName}.webp`)}
                    srcPlaceholder={
                        categoryName === 'outdoor'
                            ? placeholderHero01
                            : categoryName === 'workwear'
                            ? placeholderHero02
                            : placeholderHero03
                    }
                    alt={`${categoryName}-Aktivität`}
                    classContainer="cPage_hero"
                    classPlaceholder="cPage_heroPlaceholder"
                    initialOpacity={0}
                    animateOpacity={1}
                    transitionDuration={1}
                />
            </section>

            <section
                className="cPage_productsGallery"
                aria-label="Verfügbare Artikel"
                ref={galleryRef}
            >
                <article className="cPage_sort">
                    <h2 className="cPage_sortH2">Sortieren</h2>
                    <ul className="cPage_sortList">
                        <li className="cPage_sortListItem">
                            <button
                                className="cPage_sortButton"
                                onClick={sortByRelevance}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                Relevanz
                            </button>
                        </li>
                        <li className="cPage_sortListItem">
                            <button
                                className="cPage_sortButton"
                                onClick={sortByPriceAscending}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                Preis aufsteigend
                            </button>
                        </li>
                        <li className="cPage_sortListItem">
                            <button
                                className="cPage_sortButton"
                                onClick={sortByPriceDescending}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                Preis absteigend
                            </button>
                        </li>
                        <li className="cPage_sortListItem">
                            <button
                                className="cPage_sortButton"
                                onClick={sortByRatingDescending}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                Bewertungen
                            </button>
                        </li>
                    </ul>
                    <div className="cPage_partingLine"></div>
                </article>

                <motion.article
                    key={`${currentPage}-${currentProducts
                        .map((product) => product.id)
                        .join('-')}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, type: 'tween' }}
                    className="cPage_products"
                    aria-label="Artikel-Übersicht"
                >
                    {currentProducts.map((item) => (
                        <ProductCard
                            key={'shoe' + item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            type={item.type}
                            imageFront={item['image-front']}
                            imageBack={item['image-back']}
                            rating={item.rating}
                            waterproof={item.waterproof}
                            category={item.category}
                        />
                    ))}
                </motion.article>

                <div className="cPage_siteChangeContainer">
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={goToPreviousPage}
                        className="cPage_previousBtn"
                        aria-label="Vorherige Seite"
                    >
                        <img src={arrowLeftIcon} alt="Pfeil-Links" />
                    </button>
                    <p className="cPage_actualSite">
                        Seite {currentPage} von {totalPages}
                    </p>
                    <button
                        className="cPage_nextBtn"
                        onClick={goToNextPage}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <img
                            src={arrowRightIcon}
                            alt="Pfeil-Rechts"
                            aria-label="Nächste Seite"
                        />
                    </button>
                </div>
            </section>
        </>
    );
}
