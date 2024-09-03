import { useEffect, useRef, useState } from "react";
import { RatingStars } from "./RatingStars";
import "./styles/ProductCard.css";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { getImageURL, getPlaceholderImageURL } from "../utils/image-util";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SizeModal, SizeModalHandles } from "./SizeChoiceModal";
import { useCart } from "../contexts/CartContext";

interface Props {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    imageFront: string;
    imageBack: string;
    rating: number;
    waterproof: boolean;
};

const ProductCard = ({id, title, price, description, type, imageFront,
                    imageBack, rating, waterproof}: Props) => {
    const formattedPrice = price.toFixed(2).replace('.', ',') + ' €';
    
    const windowWidth = useWindowWidth();
    const [isHover, setHover] = useState<boolean>(false);
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const addCartBtn = useRef<HTMLButtonElement>(null);

    // Expand the "Add Cart" Button
    useEffect(() => {
        if (windowWidth < 1100) return;
        if (addCartBtn.current) {
            addCartBtn.current.style.maxHeight = isHover ? "65px" : "0px";
        };
    }, [isHover]);

    // Switch the Img
    const handleMouseEnter = () => {
        if (windowWidth < 1100) return;
        setHover(() => true)
    };

    const handleMouseLeave = () => {
        if (windowWidth < 1100) return;
        setHover(() => false)
    };

    // Modal 
    const [selectedSize, setSelectedSize] = useState<number>(0);
    const modalRef = useRef<SizeModalHandles>(null);

    const openModal = () => {
        modalRef.current?.open();
        modalRef.current?.blur();
    };

    // Adding to the shopping Cart
    const { addToCart } = useCart();

    useEffect(() => {
        if (selectedSize === 0) return; // Return when useEffect started again

        addToCart({ 
            id: id,
            title: title,
            price: price,
            description: description,
            type: type,
            imageFront: imageFront,
            imageBack: imageBack,
            rating: rating,
            waterproof: waterproof,
            size: selectedSize,
            quantity: 1,
         });

        setSelectedSize(() => 0);
    }, [selectedSize]);

    return (
        <Link className="productLink" to={"/"}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter} onBlur={handleMouseLeave}>
            <article className="productCard" >
                <figure className="productFigure">
                    <div className="productImgContainer">
                        <img className={`placeholderProductImg ${isLoaded ? "" : "notLoaded"}`} 
                            aria-hidden={isLoaded ? true : false}
                            src={getPlaceholderImageURL(imageFront)} 
                            alt={title} >
                        </img>

                        <AnimatePresence mode="wait">
                            <motion.div
                                className="productImgWrapper"
                                key={isHover ? "yes" : "no"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <LazyLoadImage
                                    className="productImg"
                                    src={isHover ? getImageURL(imageBack) : getImageURL(imageFront)}
                                    alt="Produktbild"
                                    onLoad={() => setLoaded(true)}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    
                    <figcaption className="productCaption">
                        <h2 className="productName">{title}</h2>
                        <p className="productPrice">{formattedPrice}</p>
                        <RatingStars rating={rating} indexKey={"rating" + id} key={"rating" + id}/>
                    </figcaption>
                </figure>

                <button ref={addCartBtn} onClick={openModal} className="addCartBtn">Warenkorb hinzufügen</button>
            </article>
            <SizeModal ref={modalRef} setSize={(size) => setSelectedSize(size)} />
        </Link>
    );
};

export { ProductCard };