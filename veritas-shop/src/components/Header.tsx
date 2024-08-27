import { forwardRef } from "react";
import { Link } from "react-router-dom"

const Header = forwardRef<HTMLElement>((props, ref) => {
    return (
      <header className="header" ref={ref}>
        <div className="headerBg"></div>
        <Link to="/" aria-hidden="true" tabIndex={-1}>
          <img className="logo" src="src/assets/veritas-logo.svg" alt="veritas"/>
        </Link>
      </header>
    )
})
  
  export { Header }