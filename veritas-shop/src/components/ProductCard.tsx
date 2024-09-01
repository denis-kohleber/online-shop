import { useEffect, useRef, useState } from "react"
import { RatingStars } from "./RatingStars"
import "./styles/ProductCard.css"
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom"
import { useWindowWidth } from "../hooks/useWindowWidth"
import { getImageURL, getPlaceholderImageURL } from "../utils/image-util";
import { LazyLoadImage } from "react-lazy-load-image-component";


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
}

const ProductCard = ({id, title, price, description, type, imageFront,
                    imageBack, rating, waterproof}: Props) => {
    const windowWidth = useWindowWidth();
    const [isHover, setHover] = useState<boolean>(false);
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const addCartBtn = useRef<HTMLButtonElement>(null);

    const n = [description, waterproof, type];
    console.log(n);

    // Expand the "Add Cart" Button
    useEffect(() => {
        if (windowWidth < 1100) return;
        if (addCartBtn.current) {
            addCartBtn.current.style.maxHeight = isHover ? "65px" : "0px";
        }
    }, [isHover]);

    // Switch the Img
    const handleMouseEnter = () => {
        if (windowWidth < 1100) return;
        setHover(() => true)
    }

    const handleMouseLeave = () => {
        if (windowWidth < 1100) return;
        setHover(() => false)
    }

    return (
        <Link className="productLink" to={"/"}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter} onBlur={handleMouseLeave}>
            <article className="productCard" >
                <figure className="productFigure">
                    <div className="productImgContainer">
                        <img className={`placeholderProductImg ${isLoaded ? "" : "notLoaded"}`} 
                            aria-hidden={isLoaded ? true : false}
                            loading="lazy"
                            src={getPlaceholderImageURL(imageFront)} 
                            alt="Produktbild-Platzhalter" >
                        </img>

                        <AnimatePresence mode="wait">
                            <motion.div
                                className="productImgWrapper"
                                key={isHover ? "yes" : "no"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
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
                        <p className="productPrice">{price.toFixed(2) + " €"}</p>
                        <RatingStars rating={rating} indexKey={"rating" +id} key={"rating" + id}/>
                    </figcaption>
                </figure>
                
                <button ref={addCartBtn} className="addCartBtn">Warenkorb hinzufügen</button>
            </article>
        </Link>
    )
}

export { ProductCard }