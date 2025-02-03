"use client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "./utils";
import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { FocusTrap } from "focus-trap-react";

interface LightboxModalProps {
  selectedImage: GalleryImage | null;
  setSelectedImage: (image: GalleryImage | null) => void;
  category: string;
  images: GalleryImage[];
}

export default function LightboxModal({
  selectedImage,
  setSelectedImage,
  category,
  images,
}: LightboxModalProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Find the index of the currently selected image
  const currentIndex = images.findIndex(
    (img) => img.imageUrl === selectedImage?.imageUrl
  );

  // For navigating to the next image
  const handleNextImage = useCallback(() => {
    if (!selectedImage) return;
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  }, [currentIndex, images, setSelectedImage, selectedImage]);

  // For navigating to the previous image
  const handlePrevImage = useCallback(() => {
    if (!selectedImage) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  }, [currentIndex, images, setSelectedImage, selectedImage]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 75;
    const isRightSwipe = distance < -75;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }

    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [setSelectedImage, handleNextImage, handlePrevImage, selectedImage]);

  if (!selectedImage) return null;

  return (
    <FocusTrap>
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="Image"
        onClick={() => setSelectedImage(null)}
      >
        <div
          ref={imageContainerRef}
          className="relative max-w-7xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-red-500 p-2 z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <X size={24} />
          </button>

          {/* Previous Image Button */}
          {images.length > 1 && (
            <button
              className="absolute top-1/2 -translate-y-1/2 left-4 text-white hover:text-gray-300 z-10 bg-black/30 rounded-full p-2"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Image Container */}
          <div className="flex justify-center items-center">
            <Image
              src={selectedImage.imageUrl}
              alt={"Selected image"}
              height={selectedImage.height}
              width={selectedImage.width}
              className="max-h-[80vh] w-auto mx-auto"
              priority={true}
            />
          </div>

          {/* Next Image Button */}
          {images.length > 1 && (
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4 text-white hover:text-gray-300 z-10 bg-black/30 rounded-full p-2"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          )}

          <div className="text-center text-white mt-4 text-xl">
            {category} Image
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}
