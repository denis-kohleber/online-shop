import { Link, useNavigate, useParams } from 'react-router-dom';
import shoeData from '../shoeData.json';
import { checkProductUrl } from '../utils/urlValidation';
import '../styles/ProductPage.css';
import { getImageURL, getPlaceholderImageURL } from '../utils/image-util';
import { RatingStars } from '../components/RatingStars';
import gearIcon from '../assets/regular-icons/zahnrad.svg';
import waterIcon from '../assets/regular-icons/water-check.svg';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { FancyImg } from '../components/FancyImg';
import { useCart } from '../contexts/useCart';
import { ProductCard } from '../components/ProductCard';
import arrow from '../assets/regular-icons/arrow.svg';

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

export default function ProductPage() {
    const { category, id } = useParams<string>();
    const navigate = useNavigate();

    const [selectedImg, setSelectedImg] = useState<number>(1);
    const [sizeErr, setSizeErr] = useState<boolean>(false);
    const sizeRef = useRef<HTMLSelectElement>(null);
    const quantityRef = useRef<HTMLSelectElement>(null);
    const { addToCart, setCartMenu } = useCart();
    const [randomItems, setRandomItems] = useState<ShoeItem[]>([]);
    const [item, setItem] = useState<ShoeItem | null>(null);

    // URL Validation
    useEffect(() => {
        if (category && id) {
            const isValidUrl = checkProductUrl(category, id, shoeData);
            if (!isValidUrl) {
                navigate('/404');
                return;
            }
            const foundItem = shoeData.find((shoe) => shoe.id === +id);
            setItem(foundItem || null);
        }
    }, [category, id, navigate]);

    const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',') + ' €';
    };

    // Similar Products - Section
    useEffect(() => {
        if (category) {
            const filteredItems: ShoeItem[] = shoeData.filter(
                (item) => item.category === category
            );

            const shuffledItems = filteredItems.sort(() => Math.random() - 0.5);

            const selectedItems = shuffledItems.slice(0, 8);

            setRandomItems(selectedItems);
        }
    }, [category]);

    // generate quantity and sizes
    const sizes = Array.from({ length: 16 }, (_, i) => 35 + i);
    const quantity = Array.from({ length: 10 }, (_, i) => 1 + i);

    const handleAddBtn = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
        buyNow: boolean = false
    ) => {
        e.preventDefault();
        if (!Number(sizeRef.current?.value)) {
            setSizeErr(true);
            sizeRef.current?.focus();
            return;
        }

        setSizeErr(false);

        if (item) {
            addToCart({
                id: item.id,
                title: item.title,
                price: item.price,
                description: item.description,
                type: item.type,
                imageFront: item['image-front'],
                imageBack: item['image-back'],
                rating: item.rating,
                waterproof: item.waterproof,
                size: Number(sizeRef.current?.value),
                quantity: Number(quantityRef.current?.value),
                category: item.category,
            });

            if (buyNow) setCartMenu(true);
        }
    };

    if (!item) {
        return null; // When Product don't exist, return null.
    }

    return (
        <>
            <section className="pPage_productSection">
                <div className="pPage_imgContainer">
                    <FancyImg
                        srcPlaceholder={getPlaceholderImageURL(
                            selectedImg === 1
                                ? item['image-front']
                                : item['image-back']
                        )}
                        srcImg={getImageURL(
                            selectedImg === 1
                                ? item['image-front']
                                : item['image-back']
                        )}
                        alt={item.title}
                        classContainer="pPage_mainImgContainer"
                        initialOpacity={0}
                        animateOpacity={1}
                        transitionDuration={1}
                    />
                    <div className="pPage_imgChoosingContainer">
                        <button
                            className="pPage_selectImgBtn"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setSelectedImg(1)}
                        >
                            <FancyImg
                                classContainer="pPage_selectImgContainer"
                                srcImg={getImageURL(item['image-front'])}
                                srcPlaceholder={getPlaceholderImageURL(
                                    item['image-front']
                                )}
                                alt={item.title}
                                classImg="pPage_selectImg"
                                initialOpacity={0}
                                animateOpacity={1}
                                transitionDuration={1}
                            />
                        </button>
                        <button
                            className="pPage_selectImgBtn"
                            onClick={() => setSelectedImg(2)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <FancyImg
                                classContainer="pPage_selectImgContainer"
                                srcImg={getImageURL(item['image-back'])}
                                srcPlaceholder={getPlaceholderImageURL(
                                    item['image-back']
                                )}
                                alt={item.title}
                                classImg="pPage_selectImg"
                                initialOpacity={0}
                                animateOpacity={1}
                                transitionDuration={1}
                            />
                        </button>
                    </div>
                </div>

                <div className="pPage_productInfo">
                    <div className="pPage_header">
                        <h1 className="pPage_productName">{item.title}</h1>
                        <RatingStars
                            rating={item.rating}
                            indexKey={'rating' + id + 'ProductDisplay'}
                            key={'rating' + id + 'ProductDisplay'}
                        />
                    </div>
                    <div className="pPage_partingLine"></div>
                    <div className="pPage_descriptionMain">
                        <p className="pPage_price">{formatPrice(item.price)}</p>
                        <p className="pPage_type">{item.type}</p>
                        <p className="pPage_productDescription">
                            {item.description}
                        </p>
                        <div className="pPage_qualitySignsContainer">
                            <figure className="pPage_qualitySign">
                                <img
                                    src={gearIcon}
                                    alt="Zahnrad"
                                    className="pPage_qualitySignImg"
                                />
                                <figcaption className="pPage_qualitySignText">
                                    Made in Germany
                                </figcaption>
                            </figure>
                            {item.waterproof ? (
                                <figure className="pPage_qualitySign">
                                    <img
                                        src={waterIcon}
                                        alt="Wasserfest"
                                        className="pPage_qualitySignImg"
                                    />
                                    <figcaption className="pPage_qualitySignText">
                                        Wasserfest
                                    </figcaption>
                                </figure>
                            ) : null}
                        </div>
                        <form className="pPage_productConfiqContainer">
                            <div className="pPage_inputContainer">
                                <label
                                    htmlFor="quantityInput"
                                    className="pPage_label"
                                >
                                    Menge:
                                </label>
                                <select
                                    id="quantityInput"
                                    className="pPage_quantityInput pPage_input"
                                    ref={quantityRef}
                                >
                                    {quantity.map((quantity) => (
                                        <option key={quantity} value={quantity}>
                                            {`${quantity}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="pPage_inputContainer">
                                <label
                                    htmlFor="sizeInput"
                                    className="pPage_label"
                                >
                                    Schuhgröße:
                                </label>
                                <select
                                    id="sizeInput"
                                    className={`pPage_sizeInput pPage_input ${
                                        sizeErr ? 'err' : ''
                                    }`}
                                    ref={sizeRef}
                                >
                                    <option value={''}>
                                        Schuhgröße wählen
                                    </option>
                                    {sizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                                <p
                                    className={`pPage_errMsgSize ${
                                        sizeErr ? 'err' : ''
                                    }`}
                                >
                                    Wählen Sie eine Schuhgröße
                                </p>
                            </div>
                        </form>
                        <div className="pPage_purchaseBtnContainer">
                            <button
                                onClick={(e) => handleAddBtn(e)}
                                className="pPage_addCartBtn"
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                Warenkorb hinzufügen
                            </button>
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => handleAddBtn(e, true)}
                                className="pPage_buyBtn"
                            >
                                Jetzt kaufen{' '}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pPage_similarProductsSection">
                <h2 className="pPage_sP_h2">Ähnliche Produkte</h2>
                <h3 className="pPage_sP_h3">Empfehlungen für dich</h3>
                <div className="pPage_sP_Container">
                    {randomItems.map((item) => (
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
                </div>
                <Link
                    className="pPage_discoverMoreLink"
                    to={`/categories/${category}`}
                >
                    Entdecke mehr
                    <img src={arrow} alt="" />
                </Link>
            </section>
        </>
    );
}
