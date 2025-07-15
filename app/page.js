import Navbar from "./Navbar/page"
import Hero from "./Hero/page"
import About from "./About/page"
import Contact from "./Contact/page"

export default function Home() {
  return (
    <div className="overflow-hidden w-full h-full">
    <Navbar/>
    <Hero/>
    <About/>
    <Contact/>
    </div>
  )
}
