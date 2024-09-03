import "./styles/ShoppingCart.css";
import shoe from "../assets/schuhe/schuh04-1.webp"

interface Props {
    isCartActive: boolean;
}

const ShoppingCart = ({ isCartActive }: Props) => {

    return (
        <aside className={`shoppingCartWindow ${isCartActive ? 'active' : ''}`}>
            <h2 className="shopCartH">{`Warenkorb (${8})`}</h2>

            <div className="shopCartProductsContainer">
                <article className="cartProduct">
                    <img className="cartImg" src={shoe} alt={"Produktbild"} />

                    <div className="cartProductContainer">
                        <h3 className="cartProductName">{"Produktname Dummy"}</h3>

                        <div className="cartProductDescription">
                            <p className="cartProductType">{"Arbeitsschuh"}</p>
                            <p className="cartProductSize">{`Größe: ${42}`}</p>
                        </div>

                        <p className="cartProductPrice">{"99,03 €"}</p>

                        <div className="cartAmountContainer">
                            <button className="cartMinusBtn">-</button>
                            <p className="cartAmountDisplay">{0}</p>
                            <button className="cartPlusBtn">+</button>
                        </div>
                    </div>
                </article>
            </div>

            <div className="checkoutInfo">
                <div className="subtotalContainer">
                    <p className="checkoutP first">Zwischensumme</p>
                    <p className="checkoutP">{`${2000.01} €`}</p>
                </div>

                <div className="deliveryCostWrapper">
                    <div className="deliveryCostContainer">
                        <p className="checkoutP first">Versand</p>
                        <p className="checkoutP">{`${4.99} €`}</p>
                    </div>
                    
                    <p className="checkoutP deliveryHintP">Ab 100 € Bestellwert kostenloser Versand</p>
                </div>

                <div className="totalContainer">
                    <p className="totalP first">Gesamtsumme</p>
                    <p className="totalP">{`${2004.99} €`}</p>
                </div>
            </div>

            <button className="checkoutBtn">Zur Kasse gehen</button>
        </aside>
    )
}

export { ShoppingCart }