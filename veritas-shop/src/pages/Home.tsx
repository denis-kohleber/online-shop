import { HeroBanner } from '../components/HeroBanner';
import { Categories } from '../components/Categories';
import { AboutUs } from '../components/AboutUs';
import { Highlights } from '../components/Highlights';
import { preloadImageLinks } from '../utils/preloadImages.ts';

preloadImageLinks();

function Home() {
    return (
        <>
            <HeroBanner />
            <Categories />
            <Highlights />
            <AboutUs />
        </>
    );
}

export { Home };
