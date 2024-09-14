import { HeroBanner } from '../components/HeroBanner';
import { preloadImageLinks } from '../utils/preloadImages.ts';
import { useEffect, useRef, useState } from 'react';
import { Suspense, lazy } from 'react';

// Lazy loaded components
const Categories = lazy(() => import('../components/Categories'));
const Highlights = lazy(() => import('../components/Highlights'));
const AboutUs = lazy(() => import('../components/AboutUs'));

preloadImageLinks();

export default function Home() {
    const [showCategories, setShowCategories] = useState(false);
    const [showHighlights, setShowHighlights] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);

    const categoriesRef = useRef(null);
    const highlightsRef = useRef(null);
    const aboutUsRef = useRef(null);

    // Load lazy components, when they are in view.
    useEffect(() => {
        const currentCategoriesRef = categoriesRef.current; 
        const currentHighlightsRef = highlightsRef.current; 
        const currentAboutUsRef = aboutUsRef.current; 

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === categoriesRef.current) {
                            setShowCategories(true);
                            observer.unobserve(entry.target); // Stop observing
                        } else if (entry.target === highlightsRef.current) {
                            setShowHighlights(true);
                            observer.unobserve(entry.target);
                        } else if (entry.target === aboutUsRef.current) {
                            setShowAboutUs(true);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '400px',
                threshold: 0,
            }
        );

        if (currentCategoriesRef) {
            observer.observe(currentCategoriesRef);
        }

        if (currentHighlightsRef) {
            observer.observe(currentHighlightsRef);
        }

        if (currentAboutUsRef) {
            observer.observe(currentAboutUsRef);
        }

        return () => {
            if (currentCategoriesRef) {
                observer.unobserve(currentCategoriesRef);
            }

            if (currentHighlightsRef) {
                observer.unobserve(currentHighlightsRef);
            }

            if (currentAboutUsRef) {
                observer.unobserve(currentAboutUsRef);
            }
        };
    }, []);

    return (
        <>
            <HeroBanner />

            <div className='fallbackComponent' ref={categoriesRef}>
                {showCategories && (
                    <Suspense fallback={<div className='fallbackComponent'></div>}>
                        <Categories />
                    </Suspense>
                )}
            </div>

            <div className='fallbackComponent' ref={highlightsRef}>
                {showHighlights && (
                    <Suspense fallback={<div className='fallbackComponent'></div>}>
                        <Highlights />
                    </Suspense>
                )}
            </div>

            <div className='fallbackComponent' ref={aboutUsRef}>
                {showAboutUs && (
                    <Suspense fallback={<div className='fallbackComponent'></div>}>
                        <AboutUs />
                    </Suspense>
                )}
            </div>
        </>
    );
}