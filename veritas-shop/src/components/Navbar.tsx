import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';
import logoWhite from '../assets/veritas-logo-etc/veritas-logo-white.svg';
import searchIcon01 from '../assets/regular-icons/magnify.svg';
import searchIcon02 from '../assets/regular-icons/magnify02.svg';
import cartIcon from '../assets/regular-icons/cart.svg';
import '../styles/Navbar.css';
import { ShoppingCart } from './ShoppingCart';
import { SearchMenu } from './SearchMenu';

interface Props {
    inView: boolean;
}

function Navbar({ inView }: Props) {
    // States for the menus
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
    const [isCartActive, setIsCartActive] = useState<boolean>(false);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

    const burgerBtn = useRef<HTMLButtonElement>(null);
    const navLink01 = useRef<HTMLButtonElement>(null);
    const navLink02 = useRef<HTMLAnchorElement>(null);
    const navLink03 = useRef<HTMLAnchorElement>(null);
    const navLink04 = useRef<HTMLAnchorElement>(null);
    const navLink05 = useRef<HTMLAnchorElement>(null);
    const navLinks = [navLink01, navLink02, navLink03, navLink04, navLink05];

    // Watch screen-width on resize
    const windowWidth = useWindowWidth();

    // Change Tabindex by < 800px screen-width
    useEffect(() => {
        if (windowWidth < 800) {
            navLinks.forEach((element) => {
                if (element.current) element.current.tabIndex = -1;
            });
        } else {
            navLinks.forEach((element) => {
                if (element.current) element.current.tabIndex = 0;
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);

    const activateTabIndexMenu = () => {
        navLinks.forEach((element) => {
            if (element.current) element.current.tabIndex = 0;
        });
    };

    const deactivateTabIndexMenu = () => {
        navLinks.forEach((element) => {
            if (element.current) element.current.tabIndex = -1;
        });
    };

    // Function that hold the tab-navigation in the open menu
    const handleBlurLastLink = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (windowWidth > 800) return;

        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            if (burgerBtn.current) burgerBtn.current.focus();
        }
    };

    const onClickMenuLink = () => {
        if (windowWidth > 800) return;
        showCloseMenu();
    };

    const showCloseMenu = () => {
        jumpToNav();
        setIsCartActive(() => false);
        setIsSearchActive(() => false);

        if (isMenuActive) deactivateTabIndexMenu();
        if (!isMenuActive) activateTabIndexMenu();
        setIsMenuActive((prevState) => !prevState);
    };

    const showCart = () => {
        jumpToNav();
        setIsMenuActive(() => false);
        deactivateTabIndexMenu();
        setIsSearchActive(() => false);
        setIsCartActive((prevState) => !prevState);
    };

    const showSearch = () => {
        jumpToNav();
        setIsCartActive(() => false);
        setIsMenuActive(() => false);
        deactivateTabIndexMenu();
        setIsSearchActive((prevState) => !prevState);
    };

    const removeMenus = () => {
        setIsCartActive(() => false);
        setIsMenuActive(() => false);
        deactivateTabIndexMenu();
        setIsSearchActive(() => false);
    };

    // Necessary, because the menus must be in full height, when opening them.
    const navRef = useRef<HTMLElement>(null);
    const jumpToNav = () => {
        if (navRef.current) {
            navRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    // Prevent the scrolling, when a menu is open
    useEffect(() => {
        if (windowWidth < 1000) {
            if (isMenuActive || isCartActive || isSearchActive) {
                document.body.classList.add('overflowHidden');
            } else {
                document.body.classList.remove('overflowHidden');
            }
        }

        // Cleanup
        return () => {
            document.body.classList.remove('overflowHidden');
        };
    }, [isMenuActive, isCartActive, isSearchActive, windowWidth]);

    return (
        <nav className="nav" ref={navRef}>
            <div className="navWrapper">
                <Link
                    className="navLogoContainer"
                    to="/"
                    aria-label="Home-Link"
                    onClick={removeMenus}
                >
                    <img
                        className={`navLogo ${!inView && 'active'}`}
                        src={logoWhite}
                        alt="veritas"
                    />
                </Link>

                <button
                    className="navBtn navBtnBurger"
                    ref={burgerBtn}
                    aria-label="Öffnen/Schließen Menü"
                    onClick={showCloseMenu}
                >
                    <svg
                        className={`ham hamRotate ${
                            isMenuActive ? 'active' : ''
                        }`}
                        viewBox="0 0 100 100"
                        width="33px"
                        height="33px"
                    >
                        <path
                            className="line top"
                            d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
                        />
                        <path className="line middle" d="m 70,50 h -40" />
                        <path
                            className="line bottom"
                            d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 
          8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
                        />
                    </svg>
                </button>
            </div>

            <div className={`navLinkContainer ${isMenuActive ? 'active' : ''}`}>
                <button
                    ref={navLink01}
                    className="navLink navLinkSearch"
                    onClick={showSearch}
                >
                    SUCHE
                    <img className="searchIconMenu" src={searchIcon02} alt="" />
                </button>
                <Link
                    ref={navLink02}
                    to="/categories/outdoor"
                    className="navLink navLinkOutdoor"
                    onClick={onClickMenuLink}
                >
                    OUTDOOR
                </Link>
                <Link
                    ref={navLink03}
                    to="/categories/workwear"
                    className="navLink navLinkWorkwear"
                    onClick={onClickMenuLink}
                >
                    WORKWEAR
                </Link>
                <Link
                    ref={navLink04}
                    to="/categories/sport"
                    className="navLink navLinkSport"
                    onClick={onClickMenuLink}
                >
                    SPORT
                </Link>
                <Link
                    ref={navLink05}
                    onKeyDown={(e) => handleBlurLastLink(e)}
                    onClick={onClickMenuLink}
                    to="/about-us"
                    className="navLink navLinkAboutUs"
                >
                    ÜBER UNS
                </Link>
            </div>

            <div className="navBtnContainer">
                <button
                    className="navBtn navBtnCart"
                    id="navBtnCart"
                    onClick={showCart}
                    aria-label="Warenkorb anzeigen/schließen"
                >
                    <img className="navIcon" src={cartIcon} alt="cart-button" />
                </button>
                <button
                    className="navBtn navBtnSearch"
                    id="navBtnSearch"
                    onClick={showSearch}
                    aria-label="Suchleiste anzeigen/schließen"
                >
                    <img
                        className="navIcon"
                        src={searchIcon01}
                        alt="search-button"
                    />
                </button>
            </div>

            <ShoppingCart isCartActive={isCartActive} />
            <SearchMenu
                isSearchActive={isSearchActive}
                removeMenus={removeMenus}
            />
            <div
                className={`dark-bg ${
                    isMenuActive || isCartActive || isSearchActive
                        ? 'active'
                        : ''
                }`}
                onClick={removeMenus}
            ></div>
        </nav>
    );
}

export { Navbar };
