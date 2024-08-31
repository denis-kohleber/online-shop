import { useEffect, useRef, useState } from "react"
import shoeImg01 from "../assets/schuhe/schuh01.webp"
import shoeImg02 from "../assets/schuhe/schuh01-2.webp"
import { RatingStars } from "./RatingStars"
import "./styles/ProductCard.css"
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom"
import { useWindowWidth } from "../hooks/useWindowWidth"

const ProductCard = () => {
    const windowWidth = useWindowWidth();
    const [isHover, setHover] = useState<boolean>(false);
    const addCartBtn = useRef<HTMLButtonElement>(null);

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
                            <AnimatePresence mode="wait">
                                <motion.img className="productImg" 
                                    src={isHover ? shoeImg02 : shoeImg01} 
                                    alt="Produktbild" 
                                    loading="lazy"
                                    key={isHover ? shoeImg02 : shoeImg01}
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1}}
                                    exit={{ opacity: 0}}
                                    transition={{ duration: 0.2 }}>
                                </motion.img>
                            </AnimatePresence>
                        </div>
                        <figcaption className="productCaption">
                            <h2 className="productName">Explorer Wanderschuhe</h2>
                            <p className="productPrice">75,99 €</p>
                            <RatingStars rating={7} indexKey={"card01"}/>
                        </figcaption>
                    </figure>
                <button ref={addCartBtn} className="addCartBtn">Warenkorb hinzufügen</button>
            </article>
        </Link>
    )
}

export { ProductCard }