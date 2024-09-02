import { Link } from "react-router-dom";
import { Newsletter } from "./Newsletter";
import { useRef } from "react";
import storeIcon from "../assets/benefits-icons/store.svg";
import truckIcon from "../assets/benefits-icons/truck.svg";
import coinIcon from "../assets/benefits-icons/hand-coin.svg";
import packageIcon from "../assets/benefits-icons/package.svg";
import githubIcon from "../assets/regular-icons/github.svg";
import "./styles/Footer.css"

function Footer() {
    // Dropdown by < 700 screen-width
    const infoList01Ref = useRef<HTMLUListElement>(null);
    const infoList02Ref = useRef<HTMLUListElement>(null);
    const infoList03Ref = useRef<HTMLUListElement>(null);
    const timeoutRef01 = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timeoutRef02 = useRef<ReturnType<typeof setTimeout> | null>(null);

    const activateDropdown = (infoListNumber: number, e: React.FocusEvent<Element> | null) => {
        const refs = [infoList01Ref, infoList02Ref, infoList03Ref];
        
        // Choose right reference
        const currentRef = refs[infoListNumber - 1];
        
        if (currentRef.current) {
            // If current dropdown open, than close it & only open by Click on Btn
            if (((currentRef.current.style.maxHeight !== '0px') && 
            (currentRef.current.style.maxHeight !== '')) &&
            ((e === null) || e.currentTarget.classList.contains('infoHeadline'))) {
                return resetDropdown(null);
            }

            coordinateReset(currentRef);

            // Open the dropdown
            currentRef.current.style.maxHeight = '160px';
        }
    };

    const coordinateReset = (currentRef: React.RefObject<HTMLUListElement> ) => {
        if (timeoutRef01.current) {
            clearTimeout(timeoutRef01.current);
        }
        if (timeoutRef02.current) {
            clearTimeout(timeoutRef02.current);
        }

        // Delay necessary for smoothness
        timeoutRef01.current = setTimeout(() => {
            resetDropdown(currentRef)
        }, 400);
        // Close automatically after 15s
        timeoutRef02.current = setTimeout(() => {
            resetDropdown(null)
        }, 15000);
    }

    const resetDropdown = (currentRef: React.RefObject<HTMLUListElement> | null ) => {
        if (infoList01Ref.current && (infoList01Ref !== currentRef)) 
            infoList01Ref.current.style.maxHeight = '0px';
        if (infoList02Ref.current && (infoList02Ref !== currentRef)) 
            infoList02Ref.current.style.maxHeight = '0px';
        if (infoList03Ref.current && (infoList03Ref !== currentRef)) 
            infoList03Ref.current.style.maxHeight = '0px';
    }

    return (
      <footer>
        <Newsletter />

        <section className="footerMain" aria-label='Footer main part'>
            <div className="footerMainBG"></div>
            <div className="footerMainWrapper">
                <article className="serviceListArticle" aria-label='Service-List'>
                    <div className="serviceContainer01 serviceContainer">
                        <figure className="service">
                            <img className="serviceIcon" loading="lazy" width="65px" height="65px"
                            src={storeIcon} alt="Manufactur Icon" />
                            <figcaption className="serviceCaption">Lieferung direkt vom Hersteller</figcaption>
                        </figure>
                        <figure className="service">
                            <img className="serviceIcon" loading="lazy" width="65px" height="65px"
                            src={truckIcon} alt="Fast delivery Icon" />
                            <figcaption className="serviceCaption">Versand innerhalb 24 Stunden</figcaption>
                        </figure>
                    </div>

                    <div className="serviceContainer02 serviceContainer">
                        <figure className="service">
                            <img className="serviceIcon" loading="lazy" width="65px" height="65px"
                            src={coinIcon} alt="Cashback Icon" />
                            <figcaption className="serviceCaption">2% Cashback bei Einkäufen im Shop</figcaption>
                        </figure>
                        <figure className="service">
                            <img className="serviceIcon" loading="lazy" width="65px" height="65px"
                            src={packageIcon} alt="Retoure Icon" />
                            <figcaption className="serviceCaption">Kostenlose Retoure</figcaption>
                        </figure>
                    </div>
                </article>

                <article className="infoArticle" aria-label='Information'>
                    <section className="infoSection">
                        <h2 className="infoHeadline infoHeadline01 btn" onClick={() => activateDropdown(1, null)}>Service Hotline</h2>
                        <ul className="infoList" ref={infoList01Ref}>
                            <li>Produktberatung und Service:</li>
                            <li className="phoneNumber"><Link to="/404" onFocus={(e) => activateDropdown(1, e)}>
                            +49 (0) 0000 / 0000 000</Link></li>
                            <li>Mo-Fr: 8-16 Uhr</li>
                            <li>Sa: 8-12 Uhr</li>
                        </ul>
                    </section>
                
                    <section className="infoSection">
                        <h2 className="infoHeadline infoHeadline02 btn" onClick={() => activateDropdown(2, null)}>
                            Bestellung & Versand</h2>
                        <ul className="infoList" ref={infoList02Ref}>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(2, e)}>
                            Liefer-und Versandkosten</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(2, e)}>
                            Bestellablauf</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(2, e)}>
                            Wiederrufsbehlerung</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(2, e)}>
                            Showroom / Outlet</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(2, e)}>
                            Abholzeit / Wegbeschreibung</Link></li>
                        </ul>
                    </section>
                    
                    <section className="infoSection">
                        <h2 className="infoHeadline infoHeadline03 btn" onClick={() => activateDropdown(3, null)}>Informationen</h2>
                        <ul className="infoList" ref={infoList03Ref}>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(3, e)}>Stellenangebote</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(3, e)}>Unternehmen</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(3, e)}>Referenzen</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(3, e)}>Nachhaltigkeit</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(3, e)}>Presse</Link></li>
                            <li><Link to="/404" onFocus={(e) => activateDropdown(3, e)}>Partnerprogramm</Link></li>
                        </ul>
                    </section>
                </article>

                <div className="partingLine"></div>

                <nav className="footerNav">
                    <ul className="footerLinks">
                        <li className="footerLink">© Veritas GmbH 2024</li>
                        <li className="footerLink"><Link to="/404">AGB</Link></li>
                        <li className="footerLink"><Link to="/404">Impressum</Link></li>
                        <li className="footerLink"><Link to="/404">Datenschutz</Link></li>
                        <li className="footerLink"><Link to="/404">Cookie-Einstellungen</Link></li>
                    </ul>
                </nav>
            </div>
        </section>

        <section className="devCredit" aria-label='Developer Credit'>
            <h2 className="devHeadline">
                <a className="devLink" href="https://github.com/denis-kohleber">
                    <img className="gitHubIcon" loading="lazy" src={githubIcon} 
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