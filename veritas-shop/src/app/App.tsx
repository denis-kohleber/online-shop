import { useInView } from 'react-intersection-observer';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartProvider } from '../contexts/CartContext';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Home from '../pages/Home';

const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

function App() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px',
    });

    return (
        <CartProvider>
            <Header ref={ref} />
            <Navbar inView={inView} />

            <main
            >
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

            <Footer />
        </CartProvider>
    );
}

export default App;
