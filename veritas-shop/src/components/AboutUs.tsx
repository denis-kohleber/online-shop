import { Link } from "react-router-dom";
import aboutUsImg03 from "../assets/aboutUsImg/img01.webp";
import aboutUsImg02 from "../assets/aboutUsImg/img02.webp";
import aboutUsImg01 from "../assets/aboutUsImg/img03.webp";
import placeholderAboutUsImg03 from "../assets/placeholder/aboutUsImg/img01.webp";
import placeholderAboutUsImg02 from "../assets/placeholder/aboutUsImg/img02.webp";
import placeholderAboutUsImg01 from "../assets/placeholder/aboutUsImg/img03.webp";
import logo from "../assets/veritas-logo-etc/logo02.svg";
import "../styles/AboutUs.css";
import { FancyImg } from "./FancyImg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutUs = () => {
    const div = useRef<HTMLDivElement>(null);
    const isInView = useInView(div, {
        once: true,
        margin: "0px 0px -300px 0px",
    });

    return (
        <section className="aboutUs">
            <div className="aboutUsImgContainer">
                <FancyImg
                    srcImg={aboutUsImg01}
                    srcPlaceholder={placeholderAboutUsImg01}
                    alt="Pärchen an einer Klippe mit Outdoor-Schuhen"
                    classContainer="aboutUsImg01Container aboutUsImgWrapper"
                    classPlaceholder="aboutUsImgPlaceholder"
                    classImg="aboutUsImg01"
                    initialOpacity={0}
                    initialX={-150}
                    animateOpacity={1}
                    animateX={0}
                    transitionDuration={1.5}
                />

                <div className="aboutUsImg02Wrapper">
                    <FancyImg
                        srcImg={aboutUsImg02}
                        srcPlaceholder={placeholderAboutUsImg02}
                        alt="Frau sitzend in Herbstschuhen"
                        classContainer="aboutUsImg02Container aboutUsImgWrapper"
                        classPlaceholder="aboutUsImgPlaceholder"
                        classImg="aboutUsImg02"
                        initialOpacity={0}
                        initialX={-150}
                        animateOpacity={1}
                        animateX={0}
                        transitionDuration={1.5}
                    />
                </div>

                <FancyImg
                    srcImg={aboutUsImg03}
                    srcPlaceholder={placeholderAboutUsImg03}
                    alt="Pärchen auf Geländewagen mit Outdoor-Schuhen"
                    classContainer="aboutUsImg03Container aboutUsImgWrapper"
                    classPlaceholder="aboutUsImgPlaceholder"
                    classImg="aboutUsImg03"
                    initialOpacity={0}
                    initialX={-150}
                    animateOpacity={1}
                    animateX={0}
                    transitionDuration={1.5}
                />
            </div>

            <motion.div
                ref={div}
                initial={{ opacity: 0, y: -150 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 3, type: "spring" }}
                className="aboutUsContentContainer"
            >
                <img src={logo} alt="Veritas-Logo" loading="lazy" />
                <h2 className="aboutUsH">
                    Leitprinzipien <br /> im Fokus
                </h2>
                <p className="aboutUsP">
                    Durch kontinuierliche Innovationen in unserem Handwerk haben
                    wir Schuhwerk entwickelt, das höchste Beständigkeit und
                    Langlebigkeit bietet. Ein Schuh ist für ein Jahrzehnt und
                    weit darüber hinaus ausgelegt – ein Leitprinzip von Veritas
                    seit jeher.
                    <br />
                    <br />
                    Ein Unternehmen, das sich klaren Werten verpflichtet.
                </p>
                <Link to={"/about-us"} className="learnMoreLink btn">
                    MEHR ERFAHREN
                </Link>
            </motion.div>
        </section>
    );
};

export { AboutUs };
