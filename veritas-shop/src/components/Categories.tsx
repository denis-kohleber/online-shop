import outdoorImg from "../assets/categories/outdoor-category.webp";
import workwearImg from "../assets/categories/work-category.webp";
import sportImg from "../assets/categories/sport-category.webp";
import outdoorImgPlaceholder from "../assets/placeholder/categories/outdoor-category.webp";
import workwearImgPlaceholder from "../assets/placeholder/categories/work-category.webp";
import sportImgPlaceholder from "../assets/placeholder/categories/sport-category.webp";
import { Link } from "react-router-dom";
import "./styles/Categories.css";
import { FancyImg } from "./FancyImg";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { FadeInAnimation } from "./FadeInAnimation";

const Categories = () => {
  // Arrays for the refs, controls(startingOrder) & the inView-Check
  const figures = [useRef(null), useRef(null), useRef(null)];
  const controls = [useAnimation(), useAnimation(), useAnimation()];
  const images = [
    { src: outdoorImg, placeholder: outdoorImgPlaceholder, btnText:"OUTDOOR", alt: "Mann wandert im Wald", link: "/", captionClass: "categoryCaption01", className: "category01" },
    { src: workwearImg, placeholder: workwearImgPlaceholder, btnText:"WORKWEAR", alt: "Mechanikerin am arbeiten", link: "/", captionClass: "categoryCaption02", className: "category02" },
    { src: sportImg, placeholder: sportImgPlaceholder, btnText:"SPORT", alt: "Gewichtheber am Gewichtheben", link: "/", captionClass: "categoryCaption03", className: "category03" },
  ];

  // Controll if Element is inView
  const isInView = figures.map((figure) => useInView(figure, { once: true, margin: '0px 0px -100px 0px' }));

  // Start animation
  useEffect(() => {
    const sequenceAnimations = async () => {
      for (let i = 0; i < controls.length; i++) {
        if (isInView[i]) {
          await controls[i].start({ opacity: 1, x: 0, transition: { duration: 0.5, type: 'tween' } });
        }
      }
    };

    sequenceAnimations();
  }, [isInView, controls]);

  return (
    <section className="categories">
        <FadeInAnimation classContainer="categoriesHeader">
            <h2 className="categoriesH2">Beständigkeit. Sicherheit. Performance.</h2>

            <div>
                <p className="categoriesP categoriesP01">Das Schuhwerk um Grenzen zu überwinden.</p>
                <p className="categoriesP">Wofür wird's gebraucht?</p>
            </div>
        </FadeInAnimation>

        <div className="categoriesContainer">
            <AnimatePresence>
            {images.map((image, index) => (
                <motion.figure
                className={`${image.className} category`}
                key={image.src}
                ref={figures[index]}
                initial={{ opacity: 0, x: 100 }}
                animate={controls[index]}
                >
                <FancyImg
                    srcImg={image.src}
                    srcPlaceholder={image.placeholder}
                    alt={image.alt}
                    classContainer="categoryImg"
                />
                <figcaption className={`categoryCaption ${image.captionClass}`}>
                    <Link to={image.link} className={`categoryLink0${index + 1} categoryLink btn`}>
                    {image.btnText}
                    </Link>
                </figcaption>
                </motion.figure>
            ))}
            </AnimatePresence>
        </div>
    </section>
  );
};

export { Categories };
