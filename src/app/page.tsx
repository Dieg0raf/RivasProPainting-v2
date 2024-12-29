// import About from "./components/About/About";
import LandingSection from "@/components/shared/Landing";
import ServiceAreasSection from "@/components/home/ServiceAreas";
import ResOrComSection from "@/components/home/ResOrCom";
import WhyChooseSection from "@/components/header/WhyChoose";
import OurServicesSection from "@/components/home/OurServices";

export default function Home() {
  return (
    <div className="flex flex-col">
      <LandingSection backgroundPath="/images/background-image-1.jpg" />
      <ServiceAreasSection />
      <ResOrComSection />
      <WhyChooseSection />
      <OurServicesSection />
    </div>
  );
}
