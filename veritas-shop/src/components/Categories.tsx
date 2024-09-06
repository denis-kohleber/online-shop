import outdoorImg from '../assets/categories/outdoor-category.webp';
import workwearImg from '../assets/categories/work-category.webp';
import sportImg from '../assets/categories/sport-category.webp';
import outdoorImgPlaceholder from '../assets/placeholder/categories/outdoor-category.webp';
import workwearImgPlaceholder from '../assets/placeholder/categories/work-category.webp';
import sportImgPlaceholder from '../assets/placeholder/categories/sport-category.webp';
import { Link } from 'react-router-dom';
import '../styles/Categories.css';
import { FancyImg } from './FancyImg';
import {
    motion,
    AnimatePresence,
    useInView,
    useAnimation,
} from 'framer-motion';
import { useRef, useEffect } from 'react';
import { FadeInAnimation } from './FadeInAnimation';

const Categories = () => {
    // Arrays for the refs, controls(startingOrder) & the inView-Check
    const figures = [useRef(null), useRef(null), useRef(null)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const controls = [useAnimation(), useAnimation(), useAnimation()];

    const images = [
        {
            src: outdoorImg,
            placeholder: outdoorImgPlaceholder,
            btnText: 'OUTDOOR',
            alt: 'Mann wandert im Wald',
            link: '/categories/outdoor',
            captionClass: 'categoryCaption01',
            className: 'category01',
        },
        {
            src: workwearImg,
            placeholder: workwearImgPlaceholder,
            btnText: 'WORKWEAR',
            alt: 'Mechanikerin am arbeiten',
            link: '/categories/workwear',
            captionClass: 'categoryCaption02',
            className: 'category02',
        },
        {
            src: sportImg,
            placeholder: sportImgPlaceholder,
            btnText: 'SPORT',
            alt: 'Gewichtheber am Gewichtheben',
            link: '/categories/sport',
            captionClass: 'categoryCaption03',
            className: 'category03',
        },
    ];

    // Controll if Element is inView
    const isInView01 = useInView(figures[0], {
        once: true,
        margin: '0px 0px -200px 0px',
    });
    const isInView02 = useInView(figures[1], {
        once: true,
        margin: '0px 0px -200px 0px',
    });
    const isInView03 = useInView(figures[2], {
        once: true,
        margin: '0px 0px -200px 0px',
    });

    // Start animation
    useEffect(() => {
        const sequenceAnimations = async () => {
            if (isInView01) {
                await controls[0].start({
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { duration: 0.4, type: 'tween' },
                });
            }

            if (isInView02) {
                await controls[1].start({
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { duration: 0.4, type: 'tween' },
                });
            }

            if (isInView03) {
                await controls[2].start({
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { duration: 0.4, type: 'tween' },
                });
            }
        };

        sequenceAnimations();
    }, [isInView01, isInView02, isInView03, controls]);

    return (
        <section className="categories">
            <FadeInAnimation classContainer="categoriesHeader">
                <h2 className="categoriesH2">
                    Beständigkeit. Sicherheit. Performance.
                </h2>

                <div>
                    <p className="categoriesP categoriesP01">
                        Das Schuhwerk um Grenzen zu überwinden.
                    </p>
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
                            initial={{ opacity: 0, x: 100, scale: 1.3 }}
                            animate={controls[index]}
                        >
                            <FancyImg
                                srcImg={image.src}
                                srcPlaceholder={image.placeholder}
                                alt={image.alt}
                                classContainer="categoryImg"
                            />
                            <figcaption
                                className={`categoryCaption ${image.captionClass}`}
                            >
                                <Link
                                    to={image.link}
                                    className={`categoryLink0${
                                        index + 1
                                    } categoryLink btn`}
                                >
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
