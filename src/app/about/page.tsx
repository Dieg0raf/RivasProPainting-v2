import LandingSection from "@/components/shared/Landing";
import AboutSection from "@/components/about/About";

export default function About() {
  return (
    <>
      <LandingSection
        backgroundPath="/images/background-image-2.jpg"
        landingText="From humble beginnings to trusted experts, here's our story."
        headlineText="Get to Know Us"
      />
      <AboutSection />
    </>
  );
}
