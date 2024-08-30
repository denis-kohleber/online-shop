import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay"
import arrowRight from "../assets/chevron-right.svg"
import arrowLeft from "../assets/chevron-left.svg"
import "./styles/Highlights.css"
import { ProductCard } from "./ProductCard";

const Highlights = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, 
        [Autoplay({delay: 5000})])
    
    // Save the actual banner-index
    const [currentIndex, setCurrentIndex] = useState<number>(0);

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
        <section className="highlightsSection">
            <div className="highlightsSectionContainer">
                <div className="highlightsHeaderContainer">
                    <h2 className="highlightsH2">Top Highlights</h2>
                    <h3 className="highlightsH3">Die Season Favoriten auf einen Blick!</h3>
                </div>

                <ProductCard />

                {/* <div className="embla hl" ref={emblaRef}>
                    <div className="embla__container hl">
                        <div className="embla__slide hl">
                            <article className="banner01 banner">
                                
                            </article>
                        </div>
                        <div className="embla__slide hl">
                            <article className="banner02 banner">
                                b
                            </article>
                        </div>
                        <div className="embla__slide hl">
                            <article className="banner03 banner">
                                d
                            </article>
                        </div>
                    </div>
                    <button onClick={handlePrev} className="carouselBtn hl prevBtn" aria-label="Nächstes Banner">
                        <img src={arrowLeft} alt="Arrow-Left" />
                    </button>
                    <button onClick={handleNext} className="carouselBtn hl nextBtn" aria-label="Vorheriges Banner">
                        <img src={arrowRight} alt="Arrow-Right" />
                    </button>
                    <div className="embla__dots hl">
                    {[0, 1, 2].map((index) => (
                            <button key={index} tabIndex={-1} aria-hidden={true}
                            className={`embla__dot hl ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                            />
                        ))}
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export { Highlights }