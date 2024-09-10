import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

interface CartItem {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    imageFront: string;
    imageBack: string;
    rating: number;
    waterproof: boolean;
    size: number;
    quantity: number;
    category: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    decreaseItem: (item: CartItem) => void;
    increaseItem: (item: CartItem) => void;
    deleteItem: (id: number, size: number) => void;
    total: number;
    clearCart: () => void;
    cartMenu: boolean;
    setCartMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cartItems in the local storage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const [cartMenu, setCartMenu] = useState<boolean>(false);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            // If the Article already existing with same size than add it to the quantity
            const existingItem = prevItems.find(
                (storedItem) =>
                    storedItem.id === item.id && storedItem.size === item.size
            );

            if (existingItem) {
                return prevItems.map((storedItem) =>
                    storedItem.id === item.id && storedItem.size === item.size
                        ? {
                              ...storedItem,
                              quantity: storedItem.quantity + item.quantity,
                          }
                        : storedItem
                );
            }

            // Add the new Item
            return [...prevItems, item];
        });
    };

    const clearCart = () => {
        setCartItems(() => []);
    };

    const decreaseItem = (item: CartItem) => {
        setCartItems((prevItems) =>
            prevItems
                .map((storedItem) =>
                    storedItem.id === item.id && storedItem.size === item.size
                        ? { ...storedItem, quantity: storedItem.quantity - 1 }
                        : storedItem
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const increaseItem = (item: CartItem) => {
        setCartItems((prevItems) =>
            prevItems.map((storedItem) =>
                storedItem.id === item.id && storedItem.size === item.size
                    ? { ...storedItem, quantity: storedItem.quantity + 1 }
                    : storedItem
            )
        );
    };

    const deleteItem = (id: number, size: number) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.id === id && item.size === size))
        );
    };

    // Calculate the new total, when cartItems change
    const total = useMemo(() => {
        return cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                clearCart,
                cartItems,
                addToCart,
                increaseItem,
                decreaseItem,
                deleteItem,
                total,
                cartMenu,
                setCartMenu,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
