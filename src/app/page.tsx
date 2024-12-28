// import About from "./components/About/About";
import LandingSection from "@/components/shared/Landing";
import ServiceAreasSection from "@/components/home/ServiceAreas";
import ResOrComSection from "@/components/home/ResOrCom";
import WhyChooseSection from "@/components/header/WhyChoose";

// TODO: Change the backgroundPath prop to the correct path
export default function Home() {
  return (
    <>
      <LandingSection backgroundPath="/images/background-image-1.jpg" />
      <ServiceAreasSection />
      <ResOrComSection />
      <WhyChooseSection />
    </>
  );
}
