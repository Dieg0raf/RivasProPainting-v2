"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  imagePath: string;
  openModal: () => void;
}

export default function ServiceCard({
  title,
  description,
  imagePath,
  openModal,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
        <Image
          src={imagePath}
          fill
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? "opacity-10" : "opacity-0"
          }`}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-medium mb-4 min-h-[3rem] flex items-center">
            {title}
          </h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        <div className="mt-auto pt-4">
          <button
            onClick={openModal}
            className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <span>Get Quote</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
