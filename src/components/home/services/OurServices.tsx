import { ServicesSection } from "./ServicesSection";
import OverView from "./OverView";
import BenefitsSection from "./Benefits";
import { exteriorServices, interiorServices } from "../utils";

// Main page component
const ServicesPage = () => {
  return (
    <div className="flex flex-col gap-20">
      {/* Benefits section */}
      <BenefitsSection />

      {/* Overview section */}
      <OverView />

      {/* Services sections */}
      <ServicesSection
        type="Interior"
        services={interiorServices}
        title="Our Interior Services"
        subtitle="Transform your indoor spaces with our professional interior painting and finishing services."
      />

      <ServicesSection
        type="Exterior"
        services={exteriorServices}
        title="Our Exterior Services"
        subtitle="Enhance your property's curb appeal with our expert exterior painting and maintenance services."
      />
    </div>
  );
};

export default ServicesPage;
