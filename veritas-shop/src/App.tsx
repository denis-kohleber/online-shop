import { useInView } from "react-intersection-observer";
import { Header } from "./components/Header"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer";
import { HeroBanner } from "./components/HeroBanner";
import { Categories } from "./components/Categories";
import { AboutUs } from "./components/AboutUs";
import { Highlights } from "./components/Highlights";

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
        <Categories />
        <Highlights />
        <AboutUs/>
      </main>
      <Footer />
    </>
  )
}

export default App
