import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

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
};

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    decreaseItem: (item:CartItem) => void;
    increaseItem: (item:CartItem) => void;
    deleteItem: (id: number) => void;
    total: number;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined)

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            // If the Article already existing than add it to the quantity
            const existingItem = 
            prevItems.find((storedItem) => storedItem.id === item.id);

            if (existingItem) {
                return prevItems.map((storedItem) => 
                    storedItem.id === item.id ? 
                    { ...storedItem, quantity: storedItem.quantity + item.quantity }
                    : storedItem);
            };

            // Add the new Item
            return [...prevItems, item];
      });
    };

    const clearCart = () => {
        setCartItems(() => [])
    }
  
    const decreaseItem = (item: CartItem) => {
        setCartItems((prevItems) => prevItems.map((storedItem) =>
            storedItem.id === item.id ? 
        {...storedItem, quantity: storedItem.quantity - 1} : storedItem )
        .filter((item) => item.quantity > 0));
    };
  
    const increaseItem = (item: CartItem) => {
        setCartItems((prevItems) => prevItems.map((storedItem) =>
        storedItem.id === item.id ? 
        {...storedItem, quantity: storedItem.quantity + 1} : storedItem ));
    };

    const deleteItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Calculate the new total, when cartItems change
    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    useEffect(() => {
        console.log(`Warenkorb: ${cartItems} Gesamtsumme: ${total}`)
        console.log(cartItems)
    }, [total]);

  
    return (
        <CartContext.Provider value={{ clearCart, cartItems, addToCart, increaseItem, decreaseItem, deleteItem, total }}>
            {children}
        </CartContext.Provider>
    );
  };

  const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used with a CartProvider');
    };
    return context;
  };

  export { useCart, CartProvider }