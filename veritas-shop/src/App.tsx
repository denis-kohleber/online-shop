import { useInView } from "react-intersection-observer";
import { Header } from "./components/Header"
import { Navbar } from "./components/Navbar"

function App() {
  const { ref, inView } = useInView({ 
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px' 
  });

  return (
    <>
      <Header ref={ref} />
      <Navbar inView={inView} />
      <img src="src/assets/veritas-logo.svg" alt="" />
      <div className="placeholder"></div>
    </>
  )
}

export default App
