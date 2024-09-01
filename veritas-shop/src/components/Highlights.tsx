import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay"
import arrowRight from "../assets/chevron-right.svg"
import arrowLeft from "../assets/chevron-left.svg"
import "./styles/Highlights.css"
import { ProductCard } from "./ProductCard";
import shoeData from "../shoeData.json"

const Highlights = () => {
    // Shoe Data
    const highlightedShoes = shoeData.filter(item => item.highlight);
    const mixedHighlightedShoes = shuffleObject(highlightedShoes);
    const highlightedShoes01 = mixedHighlightedShoes.slice(0, 4);
    const highlightedShoes02 = mixedHighlightedShoes.slice(4, 8);
    const highlightedShoes03 = mixedHighlightedShoes.slice(8, 12);

    function shuffleObject<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Carousel
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
                                {highlightedShoes01.map((shoe) => (
                                    <ProductCard 
                                    key={'shoe' + shoe.id}
                                    id={shoe.id} 
                                    title={shoe.title} 
                                    price={shoe.price} 
                                    description={shoe.description} 
                                    type={shoe.type} 
                                    imageFront={shoe['image-front']} 
                                    imageBack={shoe['image-back']} 
                                    rating={shoe.rating} 
                                    waterproof={shoe.waterproof} />
                                ))}
                            </div>
                        </div>
                        
                        <div className="embla__slide hl">
                            <div className="cardContainer">
                                {highlightedShoes02.map((shoe) => (
                                    <ProductCard 
                                    key={'shoe' + shoe.id}
                                    id={shoe.id} 
                                    title={shoe.title} 
                                    price={shoe.price} 
                                    description={shoe.description} 
                                    type={shoe.type} 
                                    imageFront={shoe['image-front']} 
                                    imageBack={shoe['image-back']} 
                                    rating={shoe.rating} 
                                    waterproof={shoe.waterproof} />
                                ))}
                            </div>
                        </div>

                        <div className="embla__slide hl">
                            <div className="cardContainer">
                                {highlightedShoes03.map((shoe) => (
                                    <ProductCard 
                                    key={'shoe' + shoe.id}
                                    id={shoe.id} 
                                    title={shoe.title} 
                                    price={shoe.price} 
                                    description={shoe.description} 
                                    type={shoe.type} 
                                    imageFront={shoe['image-front']} 
                                    imageBack={shoe['image-back']} 
                                    rating={shoe.rating} 
                                    waterproof={shoe.waterproof} />
                                ))}
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