"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

interface Review {
  id: number;
  name: string;
  image: string;
  review: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/api/placeholder/64/64",
    review:
      "Outstanding service! They went above and beyond my expectations. Would definitely recommend to anyone looking for top-notch quality.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "/api/placeholder/64/64",
    review:
      "Professional, timely, and extremely knowledgeable. The team made the entire process smooth and stress-free.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    image: "/api/placeholder/64/64",
    review:
      "Exceptional attention to detail. Their expertise really shows in the quality of their work. A pleasure to work with!",
    rating: 5,
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full bg-navy-950 relative overflow-hidden">
      {/* Decorative elements - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-800 rounded-full -translate-x-32 -translate-y-32 opacity-10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600 rounded-full translate-x-32 translate-y-32 opacity-10" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white">
          What our clients have to say About Us
        </h2>

        <div className="relative">
          <div className="flex flex-col items-center">
            {/* Reviews Container */}
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
                          <Image
                            src={review.image}
                            fill
                            alt={`${review.name}'s profile`}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-base md:text-lg text-blue-900">
                            {review.name}
                          </h3>
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
                      <blockquote className="text-sm md:text-base text-gray-700 italic">
                        &quot;{review.review}&quot;
                      </blockquote>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center gap-4 md:hidden mt-4 w-full">
              <button
                onClick={prevSlide}
                className="flex-1 max-w-[120px] py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Prev</span>
              </button>

              <button
                onClick={nextSlide}
                className="flex-1 max-w-[120px] py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                aria-label="Next review"
              >
                <span className="text-white font-medium">Next</span>
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="hidden md:block">
              <button
                onClick={prevSlide}
                className="absolute left-4 lg:-left-16 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 lg:-right-16 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Dots Navigation */}
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
