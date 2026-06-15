import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Work from '@/components/Work'
import Sites from '@/components/Sites'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import MotionMain from '@/components/shared/MotionMain'

export default function Home() {
  return (
    <MotionMain>
      <Nav />
      <Hero />
      <About />
      <Work />
      <Sites />
      <Services />
      <Contact />
      <Footer />
    </MotionMain>
  )
}
