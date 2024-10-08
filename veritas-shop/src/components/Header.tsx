import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/veritas-logo-etc/veritas-logo.svg';
import '../styles/Header.css';

const Header = forwardRef<HTMLElement>((_props, ref) => {
    return (
        <header className="header" ref={ref}>
            <div className="headerBg"></div>
            <Link
                to="/"
                className="headerLink"
                onMouseDown={(e) => e.preventDefault()}
            >
                <img className="logo" src={Logo} alt="veritas" />
            </Link>
        </header>
    );
});

export { Header };
