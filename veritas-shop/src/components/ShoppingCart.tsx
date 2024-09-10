import '../styles/ShoppingCart.css';
import deleteIcon from '../assets/regular-icons/delete.svg';
import { useCart } from '../contexts/useCart';
import { getImageURL } from '../utils/image-util';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    isCartActive: boolean;
}

const ShoppingCart = ({ isCartActive }: Props) => {
    const {
        clearCart,
        cartItems,
        decreaseItem,
        increaseItem,
        total,
        deleteItem,
    } = useCart();
    const [freeDelivery, setFreeDelivery] = useState<boolean>(false);

    useEffect(() => {
        if (total < 100) return setFreeDelivery(() => false);
        setFreeDelivery(() => true);
    }, [total]);

    const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',') + ' €';
    };

    const showOrderMsg = () => {
        alert('Vielen Dank! Ihre Bestellung war erfolgreich ... ');
        clearCart();
    };

    // Function that holds the Tab-Navigation in the Cart
    const handleBlurLastLink = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('navBtnCart')?.focus();
        }
    };

    return (
        <aside className={`shoppingCartWindow ${isCartActive ? 'active' : ''}`}>
            <h2 className="shopCartH">{`Warenkorb (${cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
            )})`}</h2>

            <section
                className="shopCartProductsContainer"
                aria-label="Warenkorb-Produktübersicht"
            >
                {cartItems.map((item) => (
                    <article className="cartProduct" key={item.id + item.size}>
                        <Link to={`/categories/${item.category}/${item.id}`}>
                            <img
                                className="cartImg"
                                src={getImageURL(item.imageFront)}
                                alt={item.title}
                            />
                        </Link>
                        <div className="cartProductContainer">
                            <h3 className="cartProductName">{item.title}</h3>
                            <div className="cartProductDescription">
                                <p className="cartProductType">{item.type}</p>
                                <p className="cartProductSize">{`Größe: ${item.size}`}</p>
                            </div>
                            <p className="cartProductPrice">
                                {formatPrice(item.price)}
                            </p>
                            <div className="cartProductBtnContainer">
                                <div className="cartAmountContainer">
                                    <button
                                        tabIndex={isCartActive ? 0 : -1}
                                        className="cartMinusBtn"
                                        onClick={() => decreaseItem(item)}
                                        aria-label="Einen Artikel entfernen"
                                    >
                                        -
                                    </button>
                                    <p
                                        className="cartAmountDisplay"
                                        aria-label="Artikel Anzahl"
                                    >
                                        {item.quantity}
                                    </p>
                                    <button
                                        tabIndex={isCartActive ? 0 : -1}
                                        className="cartPlusBtn"
                                        onClick={() => increaseItem(item)}
                                        aria-label="Einen weiteren Artikel hinzufügen"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="deleteBtn"
                                    tabIndex={isCartActive ? 0 : -1}
                                    onClick={() =>
                                        deleteItem(item.id, item.size)
                                    }
                                    aria-label="Artikel entfernen"
                                >
                                    <img src={deleteIcon} alt="" />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            <section className="checkoutInfo" aria-label="Kassenübersicht">
                <div className="subtotalContainer">
                    <p className="checkoutP first">Zwischensumme</p>
                    <p className="checkoutP">{formatPrice(total)}</p>
                </div>

                <div className="deliveryCostWrapper">
                    <div className="deliveryCostContainer">
                        <p className="checkoutP first">Versand</p>
                        <p
                            className={`checkoutP ${
                                freeDelivery && 'freeDelivery'
                            }`}
                        >
                            {freeDelivery
                                ? 'Gratis'
                                : !total
                                ? formatPrice(0)
                                : formatPrice(4.99)}
                        </p>
                    </div>

                    <p className="checkoutP deliveryHintP">
                        Ab 100 € Bestellwert kostenloser Versand
                    </p>
                </div>

                <div className="totalContainer">
                    <p className="totalP first">Gesamtsumme</p>
                    <p className="totalP">
                        {formatPrice(
                            total + (freeDelivery || !total ? 0 : 4.99)
                        )}
                    </p>
                </div>
            </section>

            <button
                className={`checkoutBtn ${total && 'active'}`}
                tabIndex={isCartActive ? 0 : -1}
                onClick={() => total && showOrderMsg()}
                onKeyDown={(e) => handleBlurLastLink(e)}
            >
                Zur Kasse gehen
            </button>
        </aside>
    );
};

export { ShoppingCart };
