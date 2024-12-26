// import About from "./components/About/About";
import LandingSection from "@/components/shared/Landing";
import ServiceAreasSection from "@/components/home/ServiceAreas";

// TODO: Change the backgroundPath prop to the correct path
export default function Home() {
  return (
    <>
      <LandingSection backgroundPath="/images/" />
      <ServiceAreasSection />
    </>
  );
}
