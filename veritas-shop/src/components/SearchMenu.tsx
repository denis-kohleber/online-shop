import "./styles/SearchMenu.css";
import { getImageURL } from "../utils/image-util";
import searchIcon from "../assets/regular-icons/magnify02.svg"
import dummyIcon from "../assets/schuhe-medium/schuh03-1.webp";
import closeIcon from "../assets/regular-icons/window-close.svg"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
    isSearchActive: boolean;
};

const SearchMenu = ({ isSearchActive }: Props) => {
    const [isFocus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!isSearchActive) return;
        if (inputRef.current) inputRef.current.focus();
    }, [isSearchActive]);

    const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',') + ' €';
    };

    // Function that holds the Tab-Navigation in the Cart
    // const handleBlurLastLink = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    //     if (e.key === 'Tab' && !e.shiftKey) {
    //         e.preventDefault();
    //         document.getElementById('navBtnSearch')?.focus();
    //     };
    // };

    return (
        <aside className={`searchWindow ${isSearchActive ? 'active' : ''}`} aria-label="Suche-Fenster">
            <search className="searchHeader">
                <form className={`searchInputContainer ${isFocus ? 'focus' : ''}`}>
                    <input tabIndex={isSearchActive ? 0 : -1} ref={inputRef} type="text" placeholder="Suche ..." onFocus={() => setFocus(true)} 
                    onBlur={() => setFocus(false)} className="searchInput" />

                    <button tabIndex={isSearchActive ? 0 : -1} className="searchMenuSearchBtn" onClick={(e) => e.preventDefault()} aria-label="Suche ausführen">
                        <img src={searchIcon} alt="" className="searchMenuSearchIcon" />
                    </button>
                </form>
            
                <button className="closeSearchBtn" tabIndex={isSearchActive ? 0 : -1} aria-label="Suchfenster schließen">
                    <img src={closeIcon} alt="close" />
                </button>
            </search>
            
            <section className="searchResultsContainer" aria-label="Suchergebnisse">
                <Link to={"/"} className="searchResultLink btn" tabIndex={isSearchActive ? 0 : -1}>
                    <article className="searchResult">
                        <img className="cartImg" src={dummyIcon} alt={"item.title"} />
                        
                        <div className="searchProductContainer">
                            <h3 className="searchProductName">{"Produktname Name"}</h3>
                            <p className="searchProductType">{"ProductType"}</p>
                            <p className="searchProductPrice">{formatPrice(120.22)}</p>
                        </div>
                    </article>
                </Link>
            </section>
        </aside>
    )
};

export { SearchMenu };