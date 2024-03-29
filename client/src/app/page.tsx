import {
  Header,
  Footer,
  ContentTwo,
  Messag,
  Content,
  Services,
  Hero,
  ZommParallax,

} from "@/components";

export default function Home() {
  return (
    <main className="bg-orange-100 bg-opacity-55 text-blue-950">
      <Header />
      <Hero />
      <ZommParallax />
      <Services />
      <Content />
      <Messag />
      <ContentTwo />
      <Footer />
    </main>
  )
}

