"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  area: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "James C.",
    review:
      "Enrique and his staff did an outstanding job in painting the exterior of our house. Enrique also has very good concept of choosing the right color of paint for our house. Will definitely ask him again if we decides to paint the interior of our house. Thanks Enrique. Job well done.",
    rating: 5,
    area: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Hoda A.",
    review:
      "I hired them to repaint my kitchen cabinets. I chose the wrong color, and they made time to return a couple of days later to redo the cabinets. They changed the hinges and door knobs for me. Very pleased, and the extra fee for returning was reasonable. I worked with Enrique before and found him to be conscientious and responsive. Highly recommend",
    rating: 5,
    area: "Walnut Creek, CA",
  },
  {
    id: 3,
    name: "Susan M.",
    review:
      "I have used Enrique for many years. He is honest, reliable and has always done exceptional work.",
    rating: 5,
    area: "Alamo, CA",
  },
  {
    id: 4,
    name: "Karen G.",
    review:
      "Enrique has done work for us for years. The quality of his work is top notch. All of his crew are excellent. He has done big jobs that require framing and building walls and painting large areas, and also smaller jobs. He can really do anything - and he always does it well. I do not hesitate in giving him the highest rating and referring him to others.",
    rating: 5,
    area: "Lafayette, CA",
  },
  {
    id: 5,
    name: "Lorena M.",
    review:
      "Enrique and his team did a fantastic job painting our iron gates around our house. Prepping, sanding, priming and painting iron gates is not an easy task. His team came on time and worked diligently until the job was done.",
    rating: 5,
    area: "Danville, CA",
  },
  {
    id: 6,
    name: "Desiree G.",
    review:
      "Enrique and his team have done several painting jobs at our house. He has done complete indoor and outdoor painting, including some siding replacement/repairs. He is such a pleasure to deal with, as is his courteous team. He is also great at offering his educated opinion and recommendations when the occasion arises.",
    rating: 5,
    area: "San Francisco Bay Area, CA",
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSlideChange = (direction: "prev" | "next") => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    if (direction === "next") {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="w-full bg-gradient-to-br from-primary-blue via-primary-blue/90 to-primary-blue relative overflow-hidden">
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-red/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white">
          What Our Clients Say
        </h2>

        {/* Added a min-height container */}
        <div className="min-h-[500px] md:min-h-[400px] relative">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center overflow-hidden px-2 md:px-8 mb-4">
              {reviews.map((review, index) => {
                const isActive = index === currentIndex;
                const isPrev =
                  (currentIndex === 0 && index === reviews.length - 1) ||
                  index === currentIndex - 1;
                const isNext =
                  (currentIndex === reviews.length - 1 && index === 0) ||
                  index === currentIndex + 1;

                return (
                  <div
                    key={review.id}
                    className={`
                      transition-all duration-500 ease-in-out w-full
                      ${
                        isActive
                          ? "scale-100 opacity-100 translate-x-0"
                          : "opacity-0 scale-95 absolute"
                      }
                      ${isPrev ? "-translate-x-full" : ""}
                      ${isNext ? "translate-x-full" : ""}
                    `}
                  >
                    <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 w-full max-w-md mx-auto">
                      <div className="flex items-center mb-4 md:mb-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-900 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                          <span className="text-lg md:text-xl font-semibold text-white">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base md:text-lg text-blue-900">
                            {review.name}
                          </h3>
                          <p className="text-sm text-gray-500">{review.area}</p>
                          <div className="flex mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="max-h-[200px] overflow-y-auto">
                        <blockquote className="text-sm md:text-base text-gray-700 italic">
                          &quot;{review.review}&quot;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fixed position for mobile buttons */}
            <div className="mt-8 flex justify-center gap-4 md:hidden z-10">
              <button
                onClick={() => handleSlideChange("prev")}
                className="flex-1 max-w-[120px] py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Prev</span>
              </button>

              <button
                onClick={() => handleSlideChange("next")}
                className="flex-1 max-w-[120px] py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                aria-label="Next review"
              >
                <span className="text-white font-medium">Next</span>
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="hidden md:block">
              <button
                onClick={() => handleSlideChange("prev")}
                className="absolute left-4 lg:-left-16 top-[150px] md:top-[200px] p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => handleSlideChange("next")}
                className="absolute right-4 lg:-right-16 top-[150px] md:top-[200px] p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-red-600" : "bg-gray-400"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel;
