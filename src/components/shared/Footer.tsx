import React from "react";
import { Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import HeadlineText from "./HeadlineText";

const Footer = () => {
  return (
    <footer className="bg-primary-blue text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Content */}
        <div className="space-y-6">
          <HeadlineText
            text="Need a Professional Painter?"
            colorType="white"
            headingType="h2"
          />

          <div className="space-y-4">
            {/* Phone */}
            <a
              href="tel:925-384-7467"
              className="flex items-center gap-3 hover:text-yellow-400 transition-colors group"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-lg">925-384-7467</span>
            </a>

            {/* Address */}
            <a
              href="https://maps.google.com/?q=Antioch,CA,94509"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-yellow-400 transition-colors group"
            >
              <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Antioch, CA 94509</span>
            </a>

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
        <div className="md:ml-8">
          <Image
            src="/icons/RivasProPaintingLogo.svg"
            alt="Rivas Pro Painting Inc Logo"
            className="w-32 md:w-40 object-contain"
            width={160}
            height={160}
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
