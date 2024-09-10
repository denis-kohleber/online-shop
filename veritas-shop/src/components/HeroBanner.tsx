import img01 from '../assets/heroBanner/herobanner01.webp';
import img01s from '../assets/heroBanner/herobanner01s.webp';
import img01m from '../assets/heroBanner/herobanner01m.webp';
import img01l from '../assets/heroBanner/herobanner01l.webp';
import img02 from '../assets/heroBanner/herobanner02.webp';
import img02s from '../assets/heroBanner/herobanner02s.webp';
import img02m from '../assets/heroBanner/herobanner02m.webp';
import img02l from '../assets/heroBanner/herobanner02l.webp';
import img03 from '../assets/heroBanner/herobanner03.webp';
import img03s from '../assets/heroBanner/herobanner03s.webp';
import img03m from '../assets/heroBanner/herobanner03m.webp';
import img03l from '../assets/heroBanner/herobanner03l.webp';
import placeholderImg01 from '../assets/placeholder/heroBanner/herobanner01.webp';
import placeholderImg01s from '../assets/placeholder/heroBanner/herobanner01s.webp';
import placeholderImg01m from '../assets/placeholder/heroBanner/herobanner01m.webp';
import placeholderImg01l from '../assets/placeholder/heroBanner/herobanner01l.webp';
import placeholderImg02 from '../assets/placeholder/heroBanner/herobanner02.webp';
import placeholderImg02s from '../assets/placeholder/heroBanner/herobanner02s.webp';
import placeholderImg02m from '../assets/placeholder/heroBanner/herobanner02m.webp';
import placeholderImg02l from '../assets/placeholder/heroBanner/herobanner02l.webp';
import placeholderImg03 from '../assets/placeholder/heroBanner/herobanner03.webp';
import placeholderImg03s from '../assets/placeholder/heroBanner/herobanner03s.webp';
import placeholderImg03m from '../assets/placeholder/heroBanner/herobanner03m.webp';
import placeholderImg03l from '../assets/placeholder/heroBanner/herobanner03l.webp';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import arrowRight from '../assets/regular-icons/chevron-right.svg';
import arrowLeft from '../assets/regular-icons/chevron-left.svg';
import { useEffect, useState } from 'react';
import arrow from '../assets//regular-icons/arrow.svg';
import { Link } from 'react-router-dom';
import '../styles/HeroBanner.css';

const HeroBanner = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, duration: 40 },
        [Autoplay({ delay: 5000000, stopOnInteraction: false })]
    );

    // Save the actual banner-index
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Refresh the active dot index
    useEffect(() => {
        if (!emblaApi) return;

        const handleSelect = () =>
            setCurrentIndex(emblaApi.selectedScrollSnap());

        handleSelect(); // Set initial index
        emblaApi.on('select', handleSelect);

        return () => {
            if (emblaApi) emblaApi.off('select', handleSelect);
        };
    }, [emblaApi]);

    const handleNext = () => {
        if (emblaApi) emblaApi.scrollNext();
    };

    const handlePrev = () => {
        if (emblaApi) emblaApi.scrollPrev();
    };

    const [loadedHero01, setLoadedHero01] = useState<boolean>(false);
    const [loadedHero02, setLoadedHero02] = useState<boolean>(false);
    const [loadedHero03, setLoadedHero03] = useState<boolean>(false);

    return (
        <section className="embla hero" ref={emblaRef}>
            <div className="embla__container hero">
                <div className="embla__slide hero">
                    <article className="banner01 banner">
                        <img
                            src={img01}
                            srcSet={`${img01s} 600w, ${img01m} 1000w, ${img01l} 1500w, ${img01} 1900w`}
                            alt=""
                            className={`carouselImg carouselImg01 ${
                                loadedHero01 ? 'loaded' : ''
                            }`}
                            onClick={handleNext}
                            onMouseDown={(e) => e.preventDefault()}
                            width={'100%'}
                            height={'100%'}
                            onLoad={() => setLoadedHero01(true)}
                        />

                        <img
                            src={placeholderImg01}
                            srcSet={`${placeholderImg01s} 600w, ${placeholderImg01m} 1000w, ${placeholderImg01l} 1500w, ${placeholderImg01} 1900w`}
                            alt=""
                            className="carouselImgPlaceholder"
                            onClick={handleNext}
                            onMouseDown={(e) => e.preventDefault()}
                            width={'100%'}
                            height={'100%'}
                        />

                        <div className="bannerContentContainer">
                            <div className="bannerText">
                                <h2 className="bannerHeadline01 bannerHeadline">
                                    Unbeugsame Beständigkeit
                                </h2>
                                <p className="bannerP01 bannerP">
                                    Robuste Wanderschuhe für jedes Gelände,
                                    maximaler Komfort, bester Halt bei
                                    Outdoor-Aktivitäten, die selbst über
                                    Belastungsgrenzen gehen.
                                </p>
                            </div>

                            <Link
                                to="/categories/outdoor"
                                className="bannerBtn btn"
                                aria-label="Katalog: Outdoor-Schuhe"
                            >
                                Jetzt einkaufen
                                <img src={arrow} alt="" />
                            </Link>
                        </div>
                    </article>
                </div>

                <div className="embla__slide hero">
                    <article className="banner02 banner">
                        <img
                            src={img02}
                            srcSet={`${img02s} 600w, ${img02m} 1000w, ${img02l} 1500w, ${img02} 1900w`}
                            alt=""
                            loading="lazy"
                            className={`carouselImg carouselImg02 ${
                                loadedHero02 ? 'loaded' : ''
                            }`}
                            onClick={handleNext}
                            onMouseDown={(e) => e.preventDefault()}
                            width={'100%'}
                            height={'100%'}
                            onLoad={() => setLoadedHero02(true)}
                        />

                        <img
                            src={placeholderImg02}
                            srcSet={`${placeholderImg02s} 600w, ${placeholderImg02m} 1000w, ${placeholderImg02l} 1500w, ${placeholderImg02} 1900w`}
                            alt=""
                            className="carouselImgPlaceholder"
                            onClick={handleNext}
                            onMouseDown={(e) => e.preventDefault()}
                            width={'100%'}
                            height={'100%'}
                        />

                        <div className="bannerContentContainer">
                            <div className="bannerText">
                                <h2 className="bannerHeadline01 bannerHeadline">
                                    Höchste Leistung
                                </h2>
                                <p className="bannerP01 bannerP">
                                    Leistungsstarke Sportschuhe für jedes
                                    Training, ultimative Unterstützung und
                                    hervorragende Dämpfung bei Höchstleistung.
                                </p>
                            </div>

                            <Link
                                to="/categories/sport"
                                className="bannerBtn btn"
                                aria-label="Katalog: Sportschuhe"
                            >
                                Jetzt einkaufen
                                <img src={arrow} alt="" />
                            </Link>
                        </div>
                    </article>
                </div>

                <div className="embla__slide hero">
                    <article className="banner03 banner">
                        <img
                            src={img03}
                            srcSet={`${img03s} 600w, ${img03m} 1000w, ${img03l} 1500w, ${img03} 1900w`}
                            alt=""
                            className={`carouselImg carouselImg03 ${
                                loadedHero03 ? 'loaded' : ''
                            }`}
                            onClick={handleNext}
                            loading="lazy"
                            onMouseDown={(e) => e.preventDefault()}
                            width={'100%'}
                            height={'100%'}
                            onLoad={() => setLoadedHero03(true)}
                        />

                        <img
                            src={placeholderImg03}
                            srcSet={`${placeholderImg03s} 600w, ${placeholderImg03m} 1000w, ${placeholderImg03l} 1500w, ${placeholderImg03} 1900w`}
                            alt=""
                            className="carouselImgPlaceholder"
                            onClick={handleNext}
                            onMouseDown={(e) => e.preventDefault()}
                            width={'100%'}
                            height={'100%'}
                        />

                        <div className="bannerContentContainer">
                            <div className="bannerText bannerText03">
                                <h2 className="bannerHeadline01 bannerHeadline">
                                    Zuverlässiger Schutz
                                </h2>
                                <p className="bannerP01 bannerP">
                                    Robuste Arbeitsschuhe für jeden Einsatz,
                                    maximaler Schutz und unvergleichlicher
                                    Tragekomfort für selbst widrigste
                                    Herausforderungen.
                                </p>
                            </div>

                            <Link
                                to="/categories/workwear"
                                className="bannerBtn btn"
                                aria-label="Katalog: Arbeitsschuhe"
                            >
                                Jetzt einkaufen
                                <img src={arrow} alt="" />
                            </Link>
                        </div>
                    </article>
                </div>
            </div>

            <button
                onClick={handlePrev}
                onMouseDown={(e) => e.preventDefault()}
                className="carouselBtn hero prevBtn"
                aria-label="Nächstes Banner"
            >
                <img src={arrowLeft} alt="Arrow-Left" />
            </button>

            <button
                onClick={handleNext}
                onMouseDown={(e) => e.preventDefault()}
                className="carouselBtn hero nextBtn"
                aria-label="Vorheriges Banner"
            >
                <img src={arrowRight} alt="Arrow-Right" />
            </button>

            <div className="embla__dots hero">
                {[0, 1, 2].map((index) => (
                    <button
                        key={index}
                        tabIndex={-1}
                        aria-hidden={true}
                        className={`embla__dot hero ${
                            currentIndex === index ? 'active' : ''
                        }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export { HeroBanner };
