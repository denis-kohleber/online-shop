import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, spring } from "framer-motion";

interface Props {
    srcPlaceholder: string;
    srcSetPlaceholder?: string;
    srcImg: string;
    srcSetImg?: string;
    alt: string;
    classContainer?: string;
    classPlaceholder?: string;
    classImg?: string;
    notlazy?: boolean;
    initialOpacity?: number;
    initialY?:number;
    initialX?: number; 
    animateOpacity?: number;
    animateY?:number;
    animateX?: number; 
    exitOpacity?: number;
    transitionDuration?: number;
    transitionDelay?: number;
}

const FancyImg = ({
    srcPlaceholder,
    srcImg,
    srcSetImg = "",
    srcSetPlaceholder = "",
    alt,
    classContainer = "",
    classPlaceholder = "",
    classImg = "",
    notlazy = false,
    initialOpacity = 1,
    initialY = 0,
    initialX = 0,
    animateOpacity = 1,
    animateY = 0,
    animateX = 0,
    exitOpacity = 1,
    transitionDuration = 0,
    transitionDelay = 0
}: Props) => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const div = useRef<HTMLDivElement>(null);
    const isInView = useInView(div, { once: true, margin: '0px 0px -200px 0px' });

    return (
        <AnimatePresence >
            <motion.div
                ref={div}
                initial={{ opacity: initialOpacity, y: initialY, x:initialX }}
                animate={isInView ? { opacity: animateOpacity, y:animateY, x:animateX } : {}}
                exit={{ opacity: exitOpacity }}
                transition={{ duration: transitionDuration, delay: transitionDelay, type: 'spring' }}
                className={`imgContainer ${classContainer}`}
                onHoverStart={() => {
                    // Prevent that motion framer set "transform: none"
                    if (div.current) {
                      div.current.style.transform = '';
                    }
                }}
            >
                <img
                    className={`placeholderImg ${classPlaceholder} ${isLoaded ? "" : "notLoaded"}`}
                    aria-hidden={!isLoaded}
                    srcSet={srcSetPlaceholder}
                    src={srcPlaceholder}
                    alt={alt}
                />
                <img
                    src={srcImg}
                    loading={notlazy ? "eager" : "lazy"}
                    srcSet={srcSetImg}
                    onLoad={() => setLoaded(true)}
                    alt={alt}
                    className={`mainImg ${classImg}`}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export { FancyImg };