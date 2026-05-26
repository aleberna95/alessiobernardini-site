import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Work from '@/components/Work'
import Offers from '@/components/Offers'
import Sites from '@/components/Sites'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import MotionMain from '@/components/shared/MotionMain'

export default function Home() {
  return (
    <MotionMain>
      <Nav />
      <Hero />
      <Services />
      <About />
      <Work />
      <Sites />
      <Offers />
      <Contact />
      <Footer />
    </MotionMain>
  )
}
