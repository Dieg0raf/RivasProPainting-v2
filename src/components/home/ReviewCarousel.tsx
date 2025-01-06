"use client";
import { reviews } from "./utils";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import HeadlineText from "../shared/HeadlineText";

const randomColors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [totalPages, setTotalPages] = useState(0);

  const [activeDotIndex, setActiveDotIndex] = useState(0);

  // Update active dot whenever currentIndex changes
  useEffect(() => {
    setActiveDotIndex(Math.floor(currentIndex / cardsToShow));
  }, [currentIndex, cardsToShow]);

  useEffect(() => {
    // Calculate total pages on client-side only
    setTotalPages(Math.ceil(reviews.length / cardsToShow));
  }, [cardsToShow]);

  const handleSlideChange = (direction: "prev" | "next") => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const maxIndex = reviews.length - cardsToShow;
    if (direction === "next") {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }

    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (!isMounted) return null;

  return (
    <section
      id="my-reviews"
      className="w-full bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
        <div className="text-center mb-12">
          <HeadlineText
            text="What Our Clients Say"
            colorType="black"
            headingType="h2"
            className="text-3xl md:text-4xl font-bold text-blue-900 "
            lineColor="red-600"
          />
        </div>

        <div className="min-h-[400px] relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews
              .slice(currentIndex, currentIndex + cardsToShow)
              .map((review, index) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl shadow-lg min-h-[300px] p-6 transform transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-full ${
                        randomColors[index % randomColors.length]
                      } flex items-center justify-center mr-4`}
                    >
                      <span className="text-lg font-semibold text-white">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-blue-900">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500">{review.area}</p>
                      <div className="flex mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic text-sm leading-relaxed">
                    &quot;{review.review}&quot;
                  </blockquote>
                </div>
              ))}
          </div>

          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={() => handleSlideChange("prev")}
              className="p-2 rounded-full bg-primary-red hover:bg-red-700 transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(idx * cardsToShow);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeDotIndex === idx ? "bg-primary-red" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleSlideChange("next")}
              className="p-2 rounded-full bg-primary-red hover:bg-red-700 transition-colors group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
