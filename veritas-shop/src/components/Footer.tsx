import { Link } from "react-router-dom"
import { Newsletter } from "./Newsletter"
import { useEffect, useRef, useState } from "react";

function Footer() {
    // Necessary for activate the dropdown Functions by < 700 screen-width
    const [isSmallScreen, setIsSmallScreen] = 
    useState<boolean>(window.innerWidth <= 700);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 700);
        };

        // Initial activation
        handleResize();

        // Event-Listener to track changes in the screen-size
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Dropdown by < 700 screen-width
    const infoList01Ref = useRef<HTMLUListElement>(null);
    const infoList02Ref = useRef<HTMLUListElement>(null);
    const infoList03Ref = useRef<HTMLUListElement>(null);

    const activateDropdown = (infoListNumber: number) => {
        if (!isSmallScreen) return;

        // Reset
        if (infoList01Ref.current) 
            infoList01Ref.current.style.maxHeight = '0';
        if (infoList02Ref.current) 
            infoList02Ref.current.style.maxHeight = '0';
        if (infoList03Ref.current) 
            infoList03Ref.current.style.maxHeight = '0';


        if (infoListNumber === 1) {
            if (infoList01Ref.current) 
                infoList01Ref.current.style.maxHeight = 
            infoList01Ref.current?.scrollHeight + 'px';
        }
        if (infoListNumber === 2) {
            if (infoList02Ref.current) 
                infoList02Ref.current.style.maxHeight = 
            infoList02Ref.current?.scrollHeight + 'px';
        }
        if (infoListNumber === 3) {
            if (infoList03Ref.current) 
                infoList03Ref.current.style.maxHeight = 
            infoList03Ref.current?.scrollHeight + 'px';
        }
    }
    
    return (
      <footer>
        <Newsletter />

        <section className="footerMain" aria-label='Footer main part'>
            <article className="serviceListArticle" aria-label='Service-List'>
                <div className="serviceContainer01 serviceContainer">
                    <figure className="service">
                        <img className="serviceIcon" width="65px" height="65px" 
                        src="src/assets/store.svg" alt="Manufactur Icon" />
                        <figcaption className="serviceCaption">Lieferung direkt vom Hersteller</figcaption>
                    </figure>
                    <figure className="service">
                        <img className="serviceIcon" width="65px" height="65px" 
                        src="src/assets/truck.svg" alt="Fast delivery Icon" />
                        <figcaption className="serviceCaption">Versand innerhalb 24 Stunden</figcaption>
                    </figure>
                </div>
                <div className="serviceContainer01 serviceContainer">
                    <figure className="service">
                        <img className="serviceIcon" width="65px" height="65px" 
                        src="src/assets/hand-coin.svg" alt="Cashback Icon" />
                        <figcaption className="serviceCaption">2% Cashback bei Einkäufen im Shop</figcaption>
                    </figure>
                    <figure className="service">
                        <img className="serviceIcon" width="65px" height="65px" 
                        src="src/assets/package.svg" alt="Retoure Icon" />
                        <figcaption className="serviceCaption">Kostenlose Retoure</figcaption>
                    </figure>
                </div>
            </article>

            <div className="partingLineFooter"></div>

            <article className="infoArticle" aria-label='Information'>
                <section className="infoSection">
                    <h2 className="infoHeadline" onClick={() => activateDropdown(1)}>Service Hotline</h2>
                    <ul className="infoList" ref={infoList01Ref}>
                        <li>Produktberatung und Service:</li>
                        <li className="phoneNumber"><Link to="/404" onFocus={() => activateDropdown(1)}>
                        +49 (0) 0000 / 0000 000</Link></li>
                        <li>Mo-Fr: 8-16 Uhr</li>
                        <li>Sa: 8-12 Uhr</li>
                    </ul>
                </section>
                    
                <section className="infoSection">
                    <h2 className="infoHeadline" onClick={() => activateDropdown(2)}>
                        Bestellung & Versand</h2>
                    <ul className="infoList" ref={infoList02Ref}>
                        <li><Link to="/404" onFocus={() => activateDropdown(2)}>
                        Liefer-und Versandkosten</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(2)}>
                        Bestellablauf</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(2)}>
                        Wiederrufsbehlerung</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(2)}>
                        Showroom / Outlet</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(2)}>
                        Abholzeit / Wegbeschreibung</Link></li>
                    </ul>
                </section>

                <section className="infoSection">
                    <h2 className="infoHeadline" onClick={() => activateDropdown(3)}>Informationen</h2>
                    <ul className="infoList" ref={infoList03Ref}>
                        <li><Link to="/404" onFocus={() => activateDropdown(3)}>Stellenangebote</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(3)}>Unternehmen</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(3)}>Referenzen</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(3)}>Nachhaltigkeit</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(3)}>Presse</Link></li>
                        <li><Link to="/404" onFocus={() => activateDropdown(3)}>Partnerprogramm</Link></li>
                    </ul>
                </section>
            </article>

            <div className="partingLineFooter"></div>

            <nav className="footerNav">
                <ul className="footerLinks">
                    <li className="footerLink">© Veritas GmbH 2024</li>
                    <li className="footerLink"><Link to="/404">AGB</Link></li>
                    <li className="footerLink"><Link to="/404">Impressum</Link></li>
                    <li className="footerLink"><Link to="/404">Datenschutz</Link></li>
                    <li className="footerLink"><Link to="/404">Cookie-Einstellungen</Link></li>
                </ul>
            </nav>
        </section>

        <section className="devCredit" aria-label='Developer Credit'>
            <h2 className="devHeadline">
                <a className="devLink" href="https://github.com/denis-kohleber">
                    <img className="gitHubIcon" src="src/assets/github.svg" 
                    height="22px" width="22px" alt="Github-Link Icon" />
                </a>
                Developed by Denis Kohleber
            </h2>
            <p className="copyright">© Copyright 2024 Denis Kohleber. All rights reserved.</p>
        </section>
      </footer>
    )
  }
  
  export { Footer }