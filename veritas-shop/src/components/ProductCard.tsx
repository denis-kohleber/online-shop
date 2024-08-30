import { useEffect, useRef, useState } from "react"
import shoeImg01 from "../assets/schuhe/schuh01.webp"
import shoeImg02 from "../assets/schuhe/schuh01-2.webp"
import { RatingStars } from "./RatingStars"
import "./styles/ProductCard.css"
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom"

const ProductCard = () => {

    const [isHover, setHover] = useState<boolean>(false);
    const addCartBtn = useRef<HTMLButtonElement>(null);

    // Expand the "Add Cart" Button
    useEffect(() => {
        if (addCartBtn.current) {
            addCartBtn.current.style.maxHeight = isHover ? "65px" : "0px";
        }
    }, [isHover]);

    // Switch the Img
    const handleMouseEnter = () => {
        setHover(() => true)
    }

    const handleMouseLeave = () => {
        setHover(() => false)
    }

    return (
        <article className="productCard" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link className="productLink" to={"/"}>
                <figure className="productFigure">
                    <AnimatePresence mode="wait">
                        <div className="productImgContainer">
                            <motion.img className="productImg" src={isHover ? shoeImg02 : shoeImg01} alt="Produktbild"
                                key={isHover ? shoeImg02 : shoeImg01}
                                initial={{ opacity: 0}}
                                animate={{ opacity: 1}}
                                exit={{ opacity: 0}}
                                transition={{ duration: 0.5 }}>
                            </motion.img>
                        </div>
                    </AnimatePresence>
                    <figcaption className="productCaption">
                        <h2 className="productName">Explorer Wanderschuhe</h2>
                        <p className="productPrice">75,99 €</p>
                        <RatingStars rating={7} indexKey={"card01"}/>
                    </figcaption>
                </figure>
            </Link>
            <button ref={addCartBtn} className="addCartBtn">Warenkorb hinzufügen</button>
        </article>
    )
}

export { ProductCard }