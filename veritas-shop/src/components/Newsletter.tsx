import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react"
import successIcon from "../assets/check-outline.svg";

function Newsletter() {  
    const [email, setEmail] = useState<string>('');
    const emailInput = useRef<HTMLInputElement>(null);
    const section = useRef<HTMLElement>(null);
    const timeoutRef01 = useRef<ReturnType<typeof setTimeout> | null>(null);
    const timeoutRef02 = useRef<ReturnType<typeof setTimeout> | null>(null);

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Adjust a fixed height
        if (section.current) {
            section.current.style.height = 
            section.current.clientHeight - 60 + 'px';
        }
        
        // Set the SuccessMsg with the e-mail
        if (emailInput.current) {
            const emailValue: string = emailInput.current.value;
            setEmail(emailValue);
        }

        cleanUpTimeouts();

        // Remove the Message after 8s
        timeoutRef01.current = setTimeout(() => {
            setFormatBack();
        }, 8000);
    }

    const setFormatBack = () => {
        setEmail('');
        cleanUpTimeouts();

        timeoutRef02.current = setTimeout(() => {
            if (section.current) {
                section.current.style.height = 'auto';
            }
        }, 600);
    }

    const cleanUpTimeouts = () => {
        if (timeoutRef01.current) {
            clearTimeout(timeoutRef01.current);
        }
        if (timeoutRef02.current) {
            clearTimeout(timeoutRef02.current);
        }
    }

    return (
        <section className="newsletterSection" aria-label='Newsletter' ref={section}>
            <AnimatePresence mode="wait">
                {email ? (
                    <motion.div
                    onClick={setFormatBack}
                    className="newsletterSuccessContainer"
                    key="success"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.3 }}
                    >   
                        <img className="checkSuccess" loading="lazy" src={successIcon} alt="" />
                        <p className="successMsg">
                            <span className="welcome">Willkommen!</span>
                            {` Eine Bestätigungs-E-Mail wurde an "${email}" gesendet.
                            Bestätigen Sie Ihre Anmeldung und wir informieren Sie über unsere neusten Trends 
                            und Angebote.`}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                    className="newsletterContainer"
                    key="form"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.3 }}
                    >
                        <h2 className="newsletterHeadline">10 € Gutschein sichern auf Ihre nächste Bestellung!</h2>
                        <form className="newsletterForm" action="" onSubmit={(e) => handleSubmit(e)}>
                            <label className="newsletterLabel" htmlFor="newsletterInput">
                                Melden Sie sich zum Newsletter an:</label>
                            <div className="newsletterInputContainer">
                                <input className="newsletterInput" autoComplete="on" maxLength={40} name="email" type="email" 
                                id="newsletterInput" ref={emailInput} required placeholder="Ihre E-Mail-Adresse"/>
                                <button type="submit" className="newsletterSubmitBtn">Anmelden</button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
  
  export { Newsletter }