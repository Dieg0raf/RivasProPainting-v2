"use client";

import { type ServiceAreasCardProps } from "./ServiceAreasCard";
import ServiceAreasCard from "./ServiceAreasCard";
import { useState, useEffect } from "react";

export const serviceAreas: ServiceAreasCardProps[] = [
  {
    area: "East Bay",
    cities: ["Walnut Creek", "Concord", "Clayton", "Pleasant Hill"],
  },
  {
    area: "Tri-Valley",
    cities: ["San Ramon", "Danville", "Alamo", "Dublin"],
  },
  {
    area: "Central Contra Costa",
    cities: ["Martinez", "Pleasant Hill", "Bay Point", "Brentwood"],
  },
  {
    area: "Lamorinda",
    cities: ["Lafayette", "Moraga", "Orinda", "Rheem Valley"],
  },
  {
    area: "South Bay",
    cities: ["San Jose", "Santa Clara", "Sunnyvale", "Mountain View"],
  },
];

const AMOUNT_OF_CARDS = 3;

export default function CitiesGrid() {
  const [visibleCards, setVisibleCards] = useState(AMOUNT_OF_CARDS);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setVisibleCards(
        window.innerWidth < 768 ? AMOUNT_OF_CARDS : serviceAreas.length
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {serviceAreas.slice(0, visibleCards).map((area) => (
        <ServiceAreasCard
          key={area.area}
          area={area.area}
          cities={area.cities}
        />
      ))}
      {isMobile && visibleCards < serviceAreas.length && (
        <button
          onClick={() => setVisibleCards(serviceAreas.length)}
          className="col-span-full py-3 px-6 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Show More Areas
        </button>
      )}
      {((isMobile && visibleCards === serviceAreas.length) || !isMobile) && (
        // {/* More Areas Card */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-gray-300">
          <h4 className="text-xl font-bold text-primary-blue mb-4 border-b pb-2">
            And Many More Areas
          </h4>
          <div className="flex flex-col items-center justify-center text-gray-600 py-2">
            <svg
              className="w-8 h-8 text-primary-blue mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-center text-sm">
              Contact us to check if we service your area
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
