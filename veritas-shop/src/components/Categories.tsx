import outdoorImg from "../assets/categories/outdoor-category.webp";
import workwearImg from "../assets/categories/work-category.webp";
import sportImg from "../assets/categories/sport-category.webp";
import { Link } from "react-router-dom";
import "./styles/Categories.css"

const Categories = () => {
    return (
        <section className="categories">
            <h2 className="categoriesH2">Beständigkeit. Sicherheit. Performance.</h2>
            
            <div>
                <p className="categoriesP categoriesP01">Das Schuhwerk um Grenzen zu überwinden.</p>
                <p className="categoriesP">Wofür wird's gebraucht?</p>
            </div>

            <div className="categoriesContainer">
                <figure className="category01 category">
                    <img src={outdoorImg} loading="lazy" alt="Mann wandert im Wald" className="categoryImg01 categoryImg" />
                    <figcaption className="categoryCaption categoryCaption01">
                        <Link to={"/"} className="categoryLink01 categoryLink btn">OUTDOOR</Link>
                    </figcaption>
                </figure>

                <figure className="category02 category">
                    <img src={workwearImg} loading="lazy" alt="Frau arbeitet an Maschine" className="categoryImg02 categoryImg" />
                    <figcaption className="categoryCaption categoryCaption02">
                        <Link to={"/"} className="categoryLink02 categoryLink btn">WORKWEAR</Link>
                    </figcaption>
                </figure>

                <figure className="category03 category">
                    <img src={sportImg} loading="lazy" alt="Mann beim Gewichtheben" className="categoryImg03 categoryImg" />
                    <figcaption className="categoryCaption categoryCaption03">
                        <Link to={"/"} className="categoryLink03 categoryLink btn">SPORT</Link>
                    </figcaption>
                </figure>
            </div>
        </section>
    )
}

export { Categories }