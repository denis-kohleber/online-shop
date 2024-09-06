import { useContext } from 'react';
import { CartContext } from './CartContext';

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used with a CartProvider');
    }
    return context;
};

export { useCart }