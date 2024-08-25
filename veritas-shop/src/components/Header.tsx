import { forwardRef } from "react";
import { Link } from "react-router-dom"

const Header = forwardRef<HTMLElement>((props, ref) => {
    return (
      <header className="header" ref={ref}>
        <Link to="/">
          <img className="logo" src="src/assets/veritas-logo.svg" alt="veritas" />
        </Link>
      </header>
    )
})
  
  export { Header }