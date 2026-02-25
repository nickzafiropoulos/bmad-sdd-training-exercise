import {
  Hero,
  StatsBar,
  JourneysSection,
  AboutSection,
  Footer,
} from "~/app/_components/landing";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <JourneysSection />
      <AboutSection />
      <Footer />
    </>
  );
}
