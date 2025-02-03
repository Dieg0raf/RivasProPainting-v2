import React from "react";
import { Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import HeadlineText from "./HeadlineText";
import ServicesButtons from "../home/services/ServicesButtons";

const Footer = () => {
  return (
    <footer className="bg-primary-blue text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Content */}
        <div className="space-y-6">
          <HeadlineText
            text="Need a Professional Painter?"
            colorType="white"
            lineColor="red-600"
            headingType="h2"
            footer={true}
          />

          <div className="space-y-4">
            {/* Phone */}
            <a
              href="tel:925-768-3639"
              className="flex items-center gap-3 hover:text-gray-400 transition-colors group"
              aria-label="Call us now at 925-768-3639"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-lg">925-768-3639</span>
            </a>

            {/* Address */}

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">Bay Area</span>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" />
              <div>
                <p className="text-lg">Monday - Friday</p>
                <p className="text-lg">8:00 am - 5:00 pm</p>
              </div>
            </div>

            {/* License */}
            <p className="text-lg pt-2">License # 1025434</p>
          </div>
        </div>

        {/* Logo */}
        <div className="md:ml-8 flex flex-col items-center gap-6">
          <p className="text-lg font-semibold">Se habla español</p>
          <Image
            src="/icons/RivasProPaintingLogo.svg"
            alt="Rivas Pro Painting Inc Logo"
            className="w-40 h-auto object-contain"
            width={160}
            height={160}
            loading="lazy"
          />
          <ServicesButtons
            quote={{
              justQuote: true,
            }}
            className="w-40"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
