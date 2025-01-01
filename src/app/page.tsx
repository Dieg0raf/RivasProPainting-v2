import LandingSection from "@/components/shared/Landing";
import ServiceAreasSection from "@/components/home/ServiceAreas";
import OurServicesSection from "@/components/home/services/OurServices";
import ReviewCarousel from "@/components/home/ReviewCarousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <LandingSection backgroundPath="/images/background-image-1.jpg" />
      <ServiceAreasSection />
      <OurServicesSection />
      <ReviewCarousel />
    </div>
  );
}
