import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Work from '@/components/Work'
import Sites from '@/components/Sites'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-white">
      <Nav />
      <Hero />
      <Services />
      <About />
      <Work />
      <Sites />
      <Contact />
      <Footer />
    </main>
  )
}
