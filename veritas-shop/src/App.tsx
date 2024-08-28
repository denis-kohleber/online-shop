import { useInView } from "react-intersection-observer";
import { Header } from "./components/Header"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer";
import { HeroBanner } from "./components/HeroBanner";

function App() {
  const { ref, inView } = useInView({ 
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px' 
  });

  return (
    <>
      <Header ref={ref} />
      <Navbar inView={inView} />
      <main>
        <HeroBanner />
      </main>
      <div className="placeholder"></div>
      <Footer />
    </>
  )
}

export default App
