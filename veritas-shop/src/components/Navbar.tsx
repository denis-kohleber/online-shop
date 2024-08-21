import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface Props {
    inView: boolean;
}

function Navbar({ inView }: Props) {
  // State for the menus
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [isCartActive, setIsCartActive] = useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const showMenu = () => {
    jumpToNav();
    setIsCartActive(() => false);
    setIsSearchActive(() => false);
    setIsMenuActive(prevState => !prevState);
  };

  const showCart = () => {
    jumpToNav();
    setIsMenuActive(() => false);
    setIsSearchActive(() => false);
    setIsCartActive(prevState => !prevState);
  };

  const showSearch = () => {
    jumpToNav();
    setIsCartActive(() => false);
    setIsMenuActive(() => false);
    setIsSearchActive(prevState => !prevState);
  };

  const removeMenus = () => {
    setIsCartActive(() => false);
    setIsMenuActive(() => false);
    setIsSearchActive(() => false);
  };

  // Necessary because the menus must be in full height
  const nav = useRef<HTMLElement>(null);

  const jumpToNav = () => {
    if (nav.current) {
        nav.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }

  // Prevent the scrolling, when a menu is open
  useEffect(() => {
    if (isMenuActive || isCartActive || isSearchActive ) {
      document.body.classList.add('overflowHidden');
    } else {
      document.body.classList.remove('overflowHidden');
    }

    // Cleanup
    return () => {
      document.body.classList.remove('overflowHidden');
    };
  }, [isMenuActive || isCartActive || isSearchActive]);

  return (
    <>
    <nav className="nav" ref={nav}>
        <Link className="navLogoContainer" to="/" aria-hidden="true" tabIndex={-1} onClick={removeMenus}>
                <img className={`navLogo ${!inView && 'active'}`} src="src/assets/veritas-logo-white.svg" alt="veritas" />
        </Link>

        <div className={`navLinkContainer ${isMenuActive ? 'active' : ''}`}>
            <button className="navLink navLinkSearch" onClick={showSearch}>
                SUCHE
                <img className="searchIconMenu" src="src/assets/magnify02.svg" alt="" />
            </button>
            <NavLink to="/outdoor" className="navLink navLinkOutdoor">OUTDOOR</NavLink>
            <NavLink to="/workwear" className="navLink navLinkWorkwear">WORKWEAR</NavLink>
            <NavLink to="/sport" className="navLink navLinkSport">SPORT</NavLink>
            <NavLink to="/about-us" className="navLink navLinkAboutUs">ÜBER UNS</NavLink>
        </div>

        <button className="navBtn navBtnBurger" aria-label='Öffnen/Schließen Menü' onClick={showMenu}>
            <svg
            className={`ham hamRotate ${isMenuActive ? 'active' : ''}`} viewBox="0 0 100 100" width="33px" height="33px">
            <path className="line top" d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013" />
            <path className="line middle" d="m 70,50 h -40" />
            <path className="line bottom" d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40" />
            </svg>
        </button>

        <div className='navBtnContainer'>
            <button className="navBtn navBtnCart" onClick={showCart}>
            <img className="navIcon" src="src/assets/cart.svg" alt="cart-button" />
            </button>
            <button className="navBtn navBtnSearch" onClick={showSearch}>
            <img className="navIcon" src="src/assets/magnify.svg" alt="search-button" />
            </button>
        </div>
        
        <div className={`shoppingCartWindow ${isCartActive ? 'active' : ''}`}></div>
        <div className={`searchWindow ${isSearchActive ? 'active' : ''}`}></div>
        <div className={`dark-bg ${isMenuActive || isCartActive || isSearchActive ? 'active' : ''}`} onClick={removeMenus}></div>
    </nav>
    </>
  );
}

export { Navbar };