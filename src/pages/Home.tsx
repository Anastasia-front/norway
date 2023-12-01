import {
  AboutUs,
  Activities,
  Beauties,
  Footer,
  Header,
  Hero,
  Network,
} from "../components";

export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Activities />
        <AboutUs />
        <Beauties />
        <Network />
      </main>

      <Footer />
    </>
  );
}
