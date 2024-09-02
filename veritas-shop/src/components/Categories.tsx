import outdoorImg from "../assets/categories/outdoor-category.webp";
import workwearImg from "../assets/categories/work-category.webp";
import sportImg from "../assets/categories/sport-category.webp";
import outdoorImgPlaceholder from "../assets/placeholder/categories/outdoor-category.webp";
import workwearImgPlaceholder from "../assets/placeholder/categories/work-category.webp";
import sportImgPlaceholder from "../assets/placeholder/categories/sport-category.webp";
import { Link } from "react-router-dom";
import "./styles/Categories.css"
import { FancyImg } from "./FancyImg";


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
                    <FancyImg srcImg={outdoorImg} 
                    srcPlaceholder={outdoorImgPlaceholder} 
                    alt="Mann wandert im Wald" 
                    classContainer="categoryImg"/>
                    <figcaption className="categoryCaption categoryCaption01">
                        <Link to={"/"} className="categoryLink01 categoryLink btn">OUTDOOR</Link>
                    </figcaption>
                </figure>

                <figure className="category02 category">
                    <FancyImg srcImg={workwearImg} 
                    srcPlaceholder={workwearImgPlaceholder} 
                    alt="Mann wandert im Wald" 
                    classContainer="categoryImg"/>
                    <figcaption className="categoryCaption categoryCaption02">
                        <Link to={"/"} className="categoryLink02 categoryLink btn">WORKWEAR</Link>
                    </figcaption>
                </figure>

                <figure className="category03 category">
                    <FancyImg srcImg={sportImg} 
                    srcPlaceholder={sportImgPlaceholder} 
                    alt="Mann wandert im Wald" 
                    classContainer="categoryImg"/>
                    <figcaption className="categoryCaption categoryCaption03">
                        <Link to={"/"} className="categoryLink03 categoryLink btn">SPORT</Link>
                    </figcaption>
                </figure>
            </div>
        </section>
    )
}

export { Categories }