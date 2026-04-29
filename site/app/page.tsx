import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Who from '@/components/Who'
import Now from '@/components/Now'
import Work from '@/components/Work'
import Stack from '@/components/Stack'
import Contact from '@/components/Contact'

// Playground section (Unity WebGL) — add here once build is ready
// import Playground from '@/components/Playground'

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Nav />
      <Hero />
      <Who />
      <Now />
      <Work />
      <Stack />
      <Contact />
      <Footer />
    </main>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-mono text-xs text-[#2a2a2a]">
          © {new Date().getFullYear()} Alessio Bernardini
        </p>
        <p className="font-mono text-xs text-[#2a2a2a]">
          Next.js + Firebase.{' '}
          <span className="text-[#00ff88]/30">Eat your own dogfood.</span>
        </p>
      </div>
    </footer>
  )
}
