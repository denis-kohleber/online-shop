import "./styles/ShoppingCart.css";
import deleteIcon from "../assets/regular-icons/delete.svg";
import { useCart } from "../contexts/CartContext";
import { getImageURL } from "../utils/image-util";
import { useEffect, useRef, useState } from "react";

interface Props {
    isCartActive: boolean;
};

const ShoppingCart = ({ isCartActive }: Props) => {
    const { clearCart, cartItems, decreaseItem, 
        increaseItem, total, deleteItem } = useCart();
    const [ freeDelivery, setFreeDelivery ] = useState<boolean>(false);

    useEffect(() => {
        if (total < 100) return setFreeDelivery(() => false);
        setFreeDelivery(() => true);
    }, [total]);
    
    const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',') + ' €';
    };

    const showOrderMsg = () => {
        alert('Vielen Dank! Ihre Bestellung war erfolgreich ... ^^');
        clearCart();
    };

    // Function that holds the Tab-Navigation in the Cart
    const headlineRef = useRef<HTMLHeadingElement>(null);

    const handleBlurLastLink = 
    (e: React.KeyboardEvent<HTMLButtonElement>) => {  
      if (e.key === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          if (headlineRef.current) headlineRef.current.focus();
      };
    };

    return (
        <aside className={`shoppingCartWindow ${isCartActive ? 'active' : ''}`}>
            <h2 className="shopCartH" tabIndex={0} ref={headlineRef}>{`Warenkorb (${cartItems.reduce((sum, item) => sum + item.quantity, 0)})`}</h2>

            <div className="shopCartProductsContainer">
                {cartItems.map((item) => (
                    <article className="cartProduct" key={item.id + item.size}>
                        <img className="cartImg" src={getImageURL(item.imageFront)} alt={item.title} />

                        <div className="cartProductContainer">
                            <h3 className="cartProductName">{item.title}</h3>

                            <div className="cartProductDescription">
                                <p className="cartProductType">{item.type}</p>
                                <p className="cartProductSize">{`Größe: ${item.size}`}</p>
                            </div>

                            <p className="cartProductPrice">{formatPrice(item.price)}</p>

                            <div className="cartProductBtnContainer">
                                <div className="cartAmountContainer">
                                    <button className="cartMinusBtn" onClick={() => decreaseItem(item)} 
                                    aria-label="Einen Artikel entfernen">-</button>

                                    <p className="cartAmountDisplay" aria-label="Artikel Anzahl">{item.quantity}</p>

                                    <button className="cartPlusBtn" onClick={() => increaseItem(item)}  
                                    aria-label="Einen weiteren Artikel hinzufügen">+</button>
                                </div>
                                
                                <button className="deleteBtn" 
                                onClick={() => deleteItem(item.id, item.size)}  
                                aria-label="Artikel entfernen">
                                    <img src={deleteIcon} alt="" />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="checkoutInfo">
                <div className="subtotalContainer">
                    <p className="checkoutP first">Zwischensumme</p>
                    <p className="checkoutP">{formatPrice(total)}</p>
                </div>

                <div className="deliveryCostWrapper">
                    <div className="deliveryCostContainer">
                        <p className="checkoutP first">Versand</p>
                        <p className={`checkoutP ${freeDelivery && 'freeDelivery'}`}>
                            {freeDelivery ? 'Gratis' : (!total ? formatPrice(0) : formatPrice(4.99))}
                            </p>
                    </div>
                    
                    <p className="checkoutP deliveryHintP">Ab 100 € Bestellwert kostenloser Versand</p>
                </div>

                <div className="totalContainer">
                    <p className="totalP first">Gesamtsumme</p>
                    <p className="totalP">{formatPrice(total + ((freeDelivery || !total) ? 0 : 4.99))}</p>
                </div>
            </div>

            <button className={`checkoutBtn ${total && 'active'}`} 
            onClick={() => total && showOrderMsg()} onKeyDown={(e) => handleBlurLastLink(e)}>Zur Kasse gehen</button>
        </aside>
    )
};

export { ShoppingCart };