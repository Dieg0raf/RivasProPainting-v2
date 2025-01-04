"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader, X } from "lucide-react";

interface GalleryImage {
  id: string;
  category: string;
  imageUrl: string;
  width: number;
  height: number;
}

interface GalleryProps {
  category: string;
}

const IMAGES_PER_PAGE = 6;

// TODO: Clean up the code and add comments (break down the code into smaller components)
// TODO: Focus user on the lightbox when it opens (trap focus)
const Gallery = ({ category }: GalleryProps) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(IMAGES_PER_PAGE);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        // console.log("This is the key: ", process.env.NEXT_PUBLIC_SOMETHING);
        const response = await fetch(`http://127.0.0.1:8000/api/images/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
          },
        });
        const data = await response.json();
        console.log(data.images["interior"]);
        setImages(data.images["interior"]);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };
  const loadMore = () => {
    setLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setLoadedImages((prev) =>
        Math.min(prev + IMAGES_PER_PAGE, images.length)
      );
      setLoading(false);
    }, 300);
  };

  const loadLess = () => {
    setLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setLoadedImages(IMAGES_PER_PAGE);
      setLoading(false);
    }, 300);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    image: GalleryImage
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      handleImageClick(image);
    }
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4"
      role="region"
      aria-label="Image gallery"
    >
      {/* Gallery Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 via-slate-900 to-orange-500 text-white">
          {category}
        </h1>
        <p className="text-gray-500">
          Discover our collection of stunning photographs
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.slice(0, loadedImages).map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => handleImageClick(image)}
            onKeyDown={(e) => handleKeyPress(e, image)}
            tabIndex={0}
            role="button"
            // aria-label={`View ${image.title || "image"} in lightbox`}
          >
            <div className="relative aspect-w-3 aspect-h-2">
              <Image
                src={image.imageUrl}
                alt={"Gallery image"}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="absolute bottom-0 left-0 right-0 p-4 text-white text-lg font-semibold">
                  {"Image"}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {loadedImages < images.length && (
        <div className="flex justify-center mt-8 mb-12">
          <Button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            aria-label={loading ? "Loading more images" : "Load more images"}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" /> Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
      {loadedImages === images.length && (
        <div className="flex justify-center mt-8 mb-12">
          <Button
            onClick={loadLess}
            disabled={loading}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            aria-label={loading ? "Loading more images" : "Load more images"}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" /> Loading...
              </>
            ) : (
              `Close ${category} gallery`
            )}
          </Button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-7xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-red-500 p-2"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <Image
              src={selectedImage.imageUrl}
              alt={"Selected image"}
              height={selectedImage.height}
              width={selectedImage.width}
              className="max-h-[90vh] w-auto mx-auto"
              priority={true}
            />
            {/* {selectedImage.title && (
              <div className="text-center text-white mt-4 text-xl">
                {selectedImage.title}
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
