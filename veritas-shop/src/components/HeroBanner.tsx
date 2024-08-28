import img01 from "../assets/heroBanner/herobanner01.jpg";
import img01s from "../assets/heroBanner/herobanner01s.jpg";
import img01m from "../assets/heroBanner/herobanner01m.jpg";
import img01l from "../assets/heroBanner/herobanner01l.jpg";
import img02 from "../assets/heroBanner/herobanner02.jpg";
import img02s from "../assets/heroBanner/herobanner02s.jpg";
import img02m from "../assets/heroBanner/herobanner02m.jpg";
import img02l from "../assets/heroBanner/herobanner02l.jpg";
import img03 from "../assets/heroBanner/herobanner03.jpg";
import img03s from "../assets/heroBanner/herobanner03s.jpg";
import img03m from "../assets/heroBanner/herobanner03m.jpg";
import img03l from "../assets/heroBanner/herobanner03l.jpg";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay"
import arrowRight from "../assets/chevron-right.svg"
import arrowLeft from "../assets/chevron-left.svg"
import { useEffect, useState } from "react";
import arrow from "../assets/arrow.svg"
import { Link } from "react-router-dom";

const HeroBanner = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, 
        [Autoplay({delay: 5000})])
    
    // Save the actual banner-index
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    
    const slides = [
        { src: img01, alt: 'Slide 1' },
        { src: img02, alt: 'Slide 2' },
        { src: img03, alt: 'Slide 3' }
    ];

    // Refresh the active dot index
    useEffect(() => {
        if (!emblaApi) return;

        const handleSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());

        handleSelect(); // Set initial index
        emblaApi.on('select', handleSelect);

        return () => {
            if(emblaApi) emblaApi.off('select', handleSelect);
        }
    }, [emblaApi]);
    
    const handleNext = () => {
        if (emblaApi) emblaApi.scrollNext();
    };

    const handlePrev = () => {
        if (emblaApi) emblaApi.scrollPrev();
    };

    return (
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <article className="banner01 banner">
                <img src={img01}
                srcSet={`${img01s} 600w, ${img01m} 1000w, ${img01l} 1500w, ${img01} 1900w`}
                alt=""
                className="carouselImg"
                />
                <div className="bannerContentContainer">
                    <div className="bannerText">
                        <h2 className="bannerHeadline01 bannerHeadline">Unbeugsame Beständigkeit</h2>
                        <p className="bannerP01 bannerP">Robuste Wanderschuhe für jedes Gelände, maximaler
                        Komfort, bester Halt bei Outdoor-Aktivitäten, die selbst über Belastungsgrenzen gehen.</p>
                    </div>
                    <Link to="" className="bannerBtn btn" aria-label="Katalog: Outdoor-Schuhe">
                        Jetzt einkaufen
                        <img src={arrow} alt="" />
                    </Link>
                </div>
            </article>
          </div>
          <div className="embla__slide">
            <article className="banner02 banner">
                <img src={img02}
                srcSet={`${img02s} 600w, ${img02m} 1000w, ${img02l} 1500w, ${img02} 1900w`}
                alt=""
                className="carouselImg"
                />
                <div className="bannerContentContainer">
                    <div className="bannerText">
                        <h2 className="bannerHeadline01 bannerHeadline">Höchste Leistung</h2>
                        <p className="bannerP01 bannerP">Leistungsstarke Sportschuhe für jedes Training, 
                            ultimative Unterstützung und hervorragende Dämpfung bei Höchstleistung.</p>
                    </div>
                    <Link to="" className="bannerBtn btn" aria-label="Katalog: Sportschuhe">
                        Jetzt einkaufen
                        <img src={arrow} alt="" />
                    </Link>
                </div>
            </article>
          </div>
          <div className="embla__slide">
            <article className="banner03 banner">
                <img src={img03}
                srcSet={`${img03s} 600w, ${img03m} 1000w, ${img03l} 1500w, ${img03} 1900w`}
                alt=""
                className="carouselImg"
                />
                <div className="bannerContentContainer">
                    <div className="bannerText bannerText03">
                        <h2 className="bannerHeadline01 bannerHeadline">Zuverlässiger Schutz</h2>
                        <p className="bannerP01 bannerP">Robuste Arbeitsschuhe für jeden Einsatz, maximaler 
                            Schutz und unvergleichlicher Tragekomfort für selbst widrigste Herausforderungen.</p>
                    </div>
                    <Link to="" className="bannerBtn btn" aria-label="Katalog: Arbeitsschuhe">
                        Jetzt einkaufen
                        <img src={arrow} alt="" />
                    </Link>
                </div>
            </article>
          </div>
        </div>
        <button onClick={handlePrev} className="carouselBtn prevBtn" aria-label="Nächstes Banner">
            <img src={arrowLeft} alt="Arrow-Left" />
        </button>
        <button onClick={handleNext} className="carouselBtn nextBtn" aria-label="Vorheriges Banner">
            <img src={arrowRight} alt="Arrow-Right" />
        </button>
        <div className="embla__dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        tabIndex={-1}
                        aria-hidden={true}
                        className={`embla__dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
        </div>
      </div>
    )
}
  
export { HeroBanner }