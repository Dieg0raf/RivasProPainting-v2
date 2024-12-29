"use client";
import ServicesButtons from "./ServicesButtons";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Service } from "@/components/home/utils";
import HeadlineText from "@/components/shared/HeadlineText";

interface ServicesSectionProps {
  type: string;
  services: Service[];
  title: string;
  subtitle: string;
}

export const ServicesSection = ({
  type,
  services,
  title,
  subtitle,
}: ServicesSectionProps) => {
  const handleServiceClick = (title: string) => {
    console.log(`Navigating to gallery/${title}`);
  };

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <HeadlineText text={title} colorType="black" headingType="h2" />
        <p className="text-center text-gray-600 mt-4 mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 focus-within::-translate-y-2 focus-within::shadow-xl hover:-translate-y-2 hover:shadow-xl rounded-3xl"
            >
              <Card
                className="flex flex-col h-full cursor-pointer overflow-hidden group"
                onClick={() => handleServiceClick(service.title)}
                tabIndex={0}
                role="button"
                aria-label={`View ${service.title} gallery`}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleServiceClick(service.title)
                }
              >
                {/* Fixed height container for image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={`${service.title} service`}
                      fill
                      className="w-full h-full object-cover transition-transform duration-500 group-focus:scale-110 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image available
                    </div>
                  )}
                </div>
                {/* Flex-grow container for text content */}
                <div className="flex flex-col flex-grow p-6 transition-colors duration-300 group-focus:bg-gray-50 group-hover:bg-gray-50">
                  <h3 className="text-xl font-semibold mb-3 transition-colors duration-300 group-focus:text-orange-500 group-hover:text-orange-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {service.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Services Buttons */}
        <ServicesButtons type={type} className="mt-12" />
      </div>
    </section>
  );
};
