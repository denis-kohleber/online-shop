import { Link } from "react-router-dom";
import aboutUsImg03 from "../assets/aboutUsImg/img01.webp";
import aboutUsImg02 from "../assets/aboutUsImg/img02.webp";
import aboutUsImg01 from "../assets/aboutUsImg/img03.webp";
import logo from "../assets/logo02.svg"

const AboutUs = () => {
    return (
        <section className="aboutUs">
            <div className="aboutUsImgContainer">
                <img src={aboutUsImg01} loading="lazy" alt="Pärchen an einer Klippe mit Outdoor-Schuhen" className="aboutUsImg aboutUsImg01" />
                <div className="aboutUsImg02Container">
                    <img src={aboutUsImg02} loading="lazy" alt="Frau sitzend in Herbstschuhen" className="aboutUsImg aboutUsImg02" />
                </div>
                <img src={aboutUsImg03} loading="lazy" alt="Pärchen auf Geländewagen mit Outdoor-Schuhen" className="aboutUsImg aboutUsImg03" />
            </div>
            <div className="aboutUsContentContainer">
                <img src={logo} alt="Veritas-Logo" />
                <h2 className="aboutUsH">Leitprinzipien <br/> im Fokus</h2>
                <p className="aboutUsP">
                    Durch kontinuierliche Innovationen in unserem Handwerk haben wir Schuhwerk entwickelt, 
                    das höchste Beständigkeit und Langlebigkeit bietet. Ein Schuh ist für ein Jahrzehnt und 
                    weit darüber hinaus ausgelegt – ein Leitprinzip von Veritas seit jeher. 
                    <br /><br />
                    Ein Unternehmen, das sich klaren Werten verpflichtet.
                </p>
                <Link to={"/"} className="learnMoreLink btn">MEHR ERFAHREN</Link>
            </div>

        </section>
    )
}

export { AboutUs }