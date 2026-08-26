import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import useTheme from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <div className="aurora" aria-hidden="true"></div>

      <Navbar theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
    </>
  );
}
