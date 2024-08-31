import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay"
import arrowRight from "../assets/chevron-right.svg"
import arrowLeft from "../assets/chevron-left.svg"
import "./styles/Highlights.css"
import { ProductCard } from "./ProductCard";


const Highlights = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40, watchFocus: true }, 
        [Autoplay({delay: 2500, stopOnMouseEnter: true, stopOnFocusIn: true})]);
    
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

                <div className="embla hl" ref={emblaRef}>
                    <div className="embla__container hl">
                        <div className="embla__slide hl">
                                <div className="cardContainer">
                                    <ProductCard key={1} />
                                    <ProductCard key={2} />
                                    <ProductCard key={3} />
                                    <ProductCard key={4} />
                                </div>
                        </div>
                        <div className="embla__slide hl">
                                <div className="cardContainer">
                                    <ProductCard key={5} />
                                    <ProductCard key={6} />
                                    <ProductCard key={7} />
                                    <ProductCard key={8} />
                                </div>
                        </div>
                        <div className="embla__slide hl">
                                <div className="cardContainer">
                                    <ProductCard key={9} />
                                    <ProductCard key={10}/>
                                    <ProductCard key={11}/>
                                    <ProductCard key={12}/>
                                </div>
                        </div>
                    </div>
                    <button onClick={handlePrev} className="carouselBtn hl prevBtn" aria-label="Nächstes Banner">
                        <img className="carouselBtnImg" src={arrowLeft} alt="Arrow-Left" />
                    </button>
                    <button onClick={handleNext} className="carouselBtn hl nextBtn" aria-label="Vorheriges Banner">
                        <img className="carouselBtnImg carouselBtnImg02" src={arrowRight} alt="Arrow-Right" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export { Highlights }