import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { CartProvider } from '../contexts/CartContext';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Home from '../pages/Home';

// Lazy-loaded Pages
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Lazy-loaded Footer
const Footer = lazy(() => import('../components/Footer'));

function App() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px',
    });

    const [showFooter, setShowFooter] = useState(false);
    const footerRef = useRef(null);

    // Load lazy components, when they are in view.
    useEffect(() => {
        const currentFooterRef = footerRef.current; 

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShowFooter(true);
                        observer.unobserve(entry.target); // Stop observing
                    }
                });
            },
            {
                root: null,
                rootMargin: '400px',
                threshold: 0,
            }
        );

        if (currentFooterRef) {
            observer.observe(currentFooterRef);
        }

        return () => {
            if (currentFooterRef) {
                observer.unobserve(currentFooterRef);
            }
        };
    }, []);

    return (
        <CartProvider>
            <Header ref={ref} />
            <Navbar inView={inView} />

            <main>
                <Suspense fallback={<div className="fallback"></div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route
                            path="/categories/:category"
                            element={<CategoriesPage />}
                        />

                        <Route
                            path="/categories/:category/:id"
                            element={<ProductPage />}
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>

            <div className="fallbackComponent" ref={footerRef}>
                {showFooter && (
                    <Suspense
                        fallback={<div className="fallbackComponent"></div>}
                    >
                        <Footer />
                    </Suspense>
                )}
            </div>
        </CartProvider>
    );
}

export default App;
