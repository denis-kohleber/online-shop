import '../styles/SearchMenu.css';
import { getSearchProductImageURL } from '../utils/image-util';
import searchIcon from '../assets/regular-icons/magnify02.svg';
import closeIcon from '../assets/regular-icons/window-close.svg';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import shoeData from '../shoeData.json';
import { motion } from 'framer-motion';

interface Props {
    isSearchActive: boolean;
    removeMenus: () => void;
}

interface Item {
    id: number;
    title: string;
    price: number;
    description: string;
    type: string;
    imageFront: string;
    imageBack: string;
    rating: number;
    waterproof: boolean;
    category: string;
}

const SearchMenu = ({ isSearchActive, removeMenus }: Props) => {
    const [isFocus, setFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [inputLength, setInputLength] = useState<number>(0);

    const correctedData: Item[] = shoeData.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        type: item.type,
        imageFront: item['image-front'],
        imageBack: item['image-back'],
        rating: item.rating,
        waterproof: item.waterproof,
        category: item.category,
    }));

    const updateSearchResults = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setInputLength(() => value.length);

        if (value.length < 2) return setItems(() => []); // Min chars for display

        const filteredData = correctedData.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );

        setItems(() => filteredData);
    };

    // Opening the search? Autofocus Input.
    useEffect(() => {
        if (!isSearchActive) return;
        if (inputRef.current) inputRef.current.focus();
    }, [isSearchActive]);

    const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',') + ' €';
    };

    const closeSearchMenu = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        e.preventDefault();
        removeMenus();
    };

    // Functions that hold the Tab-Navigation in the Cart
    const handleBlurLastItem = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            if (inputRef.current) inputRef.current.focus();
        }
    };

    const handleBlurCloseBtn = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            if (items.length) return;
            e.preventDefault();
            if (inputRef.current) inputRef.current.focus();
        }
    };

    return (
        <aside
            className={`searchWindow ${isSearchActive ? 'active' : ''}`}
            aria-label="Suche-Fenster"
        >
            <search className="searchHeader">
                <form
                    className={`searchInputContainer ${isFocus ? 'focus' : ''}`}
                >
                    <input
                        tabIndex={isSearchActive ? 0 : -1}
                        ref={inputRef}
                        type="text"
                        placeholder="Suche ..."
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        onChange={(e) => updateSearchResults(e)}
                        className="searchInput"
                    />

                    <button
                        tabIndex={isSearchActive ? 0 : -1}
                        className="searchMenuSearchBtn"
                        aria-label="Suche ausführen"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img
                            src={searchIcon}
                            alt=""
                            className="searchMenuSearchIcon"
                        />
                    </button>
                </form>

                <button
                    className="closeSearchBtn"
                    tabIndex={isSearchActive ? 0 : -1}
                    onClick={(e) => closeSearchMenu(e)}
                    aria-label="Suchfenster schließen"
                    onKeyDown={(e) => handleBlurCloseBtn(e)}
                >
                    <img src={closeIcon} alt="close" />
                </button>
            </search>

            <section
                className="searchResultsContainer"
                aria-label="Suchergebnisse"
            >
                {inputLength === 0 ? null : items.length === 0 ? ( // Show nothing, when Input empty
                    // No Results? Message to User
                    <p className="noResults">Keine Artikel gefunden</p>
                ) : (
                    // All alright? Show results.
                    items.map((item, index) => {
                        const isLastItem = index === items.length - 1;
                        return (
                            <Link
                                to={`/categories/${item.category}/${item.id}`}
                                className="searchResultLink btn"
                                key={item.title + item.imageFront}
                                tabIndex={isSearchActive ? 0 : -1}
                                onKeyDown={
                                    isLastItem
                                        ? (e) => handleBlurLastItem(e)
                                        : undefined
                                }
                            >
                                <motion.article
                                    className="searchResult"
                                    key={`${item.id}-result-${items.length}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        type: 'tween',
                                    }}
                                >
                                    <img
                                        className="searchImg"
                                        src={getSearchProductImageURL(
                                            item.imageFront
                                        )}
                                        alt={item.title}
                                    />

                                    <div className="searchProductContainer">
                                        <h3 className="searchProductName">
                                            {item.title}
                                        </h3>
                                        <p className="searchProductType">
                                            {item.type}
                                        </p>
                                        <p className="searchProductPrice">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>
                                </motion.article>
                            </Link>
                        );
                    })
                )}
            </section>
        </aside>
    );
};

export { SearchMenu };
