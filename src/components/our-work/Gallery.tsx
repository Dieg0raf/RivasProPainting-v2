"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

// TypeScript interfaces
interface GalleryImage {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  fullUrl: string;
  width: number;
  height: number;
  blurDataURL: string;
}

interface GalleryProps {
  category: string;
}

const Gallery = ({ category }: GalleryProps) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        // Replace with your API endpoint
        const response = await fetch(`/api/gallery/${category}`);
        const data = await response.json();
        setImages(data);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Gallery Header */}
      <div className="py-8 px-4 text-center bg-gradient-to-r from-red-900 via-slate-900 to-orange-900">
        <h1 className="text-4xl font-bold text-white mb-4">{category}</h1>
        <p className="text-gray-300">
          Discover our collection of stunning photographs
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              onClick={() => handleImageClick(image)}
            >
              <div className="aspect-w-3 aspect-h-2">
                <Image
                  src={image.thumbnailUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  //   blurDataURL={image.blurDataURL}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl mx-auto p-4">
            <Image
              src={selectedImage.fullUrl}
              alt={selectedImage.title}
              width={selectedImage.width}
              height={selectedImage.height}
              className="max-h-[90vh] w-auto object-contain"
              priority
            />
            <button
              className="absolute top-4 right-4 text-white text-xl hover:text-red-500"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
