import HeadlineText from "@/components/shared/HeadlineText";
import ServiceCard from "@/components/home/ServiceCard";
import { interiorServices, exteriorServices, Service } from "./utils";

interface OurServicesContentProps {
  openModal: () => void;
  isInterior?: boolean;
}

export default function OurServicesContent({
  openModal,
  isInterior = true,
}: OurServicesContentProps) {
  // The isInterior prop is used to determine which services to display.
  const services: Service[] = isInterior ? interiorServices : exteriorServices;
  const title = isInterior ? "Our Interior services" : "Our Exterior services";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <HeadlineText colorType="black" text={title} headingType="h2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            description={service.description}
            title={service.title}
            imagePath={service.image}
            openModal={openModal}
          />
        ))}
      </div>
    </div>
  );
}
