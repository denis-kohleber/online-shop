
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
interface Props {
    children: React.ReactNode;
    classContainer?: string
}

const FadeInAnimation = ({ children, classContainer = ""}: Props) => {
    const div = useRef<HTMLDivElement>(null);
    const isInView = useInView(div, { once: true, margin: '0px 0px -150px 0px' });

    return (
            <motion.div
            ref={div}
            initial={{ opacity: 0 , y: -100}}
            animate={isInView ? { opacity: 1 , y: 0} : {}}
            transition={{ duration: 0.7, type: 'tween'}}
            className={classContainer}>
                {children}
            </motion.div>
    )
}

export { FadeInAnimation }