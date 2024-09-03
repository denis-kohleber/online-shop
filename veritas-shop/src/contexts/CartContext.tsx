import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined)

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
  
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
  
    const decreaseItem = (item: CartItem) => {
        setCartItems((prevItems) => prevItems.map((storedItem) =>
            storedItem.id === item.id ? 
        {...storedItem, quantity: storedItem.quantity - 1} : storedItem ));

        setCartItems((prevItems) => prevItems.filter((item) => item.quantity > 0));
    };
  
    const increaseItem = (item: CartItem) => {
        setCartItems((prevItems) => prevItems.map((storedItem) =>
        storedItem.id === item.id ? 
        {...storedItem, quantity: storedItem.quantity + 1} : storedItem ));
    };

    // Calculate the new total
    useEffect(() => {
        let sum: number = 0;

        for (const item of cartItems) {
            sum += item.price;
        };

        setTotal(() => sum);

        console.log(`Warenkorb: ${cartItems} Gesamtsumme: ${sum}`)
        console.log(cartItems)

    }, [cartItems]);
  
    return (
        <CartContext.Provider value=
        {{ cartItems, addToCart, increaseItem, decreaseItem, total }}>
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