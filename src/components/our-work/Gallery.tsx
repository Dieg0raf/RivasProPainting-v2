"use client";
import LightboxModal from "./LightboxModal";
import GalleryHeader from "./GalleryHeader";
import React, { useState, useEffect } from "react";
import { GalleryImage } from "./utils";
import GalleryGrid from "./GalleryGrid";
import LoadMoreResetButton from "./LoadMoreResetButton";

interface GalleryProps {
  category: string;
  imageProps: GalleryImage[];
}

const IMAGES_PER_PAGE = 8;

const Gallery = ({ category, imageProps }: GalleryProps) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(IMAGES_PER_PAGE);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    // Load images from props
    try {
      setLoading(true);
      setImages(imageProps);
    } catch (error) {
      console.error("Error setting images:", error);
    } finally {
      setLoading(false);
    }
  }, [imageProps]);

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
      // Reset to initial images per page
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
      id={`${category.toLowerCase()}-gallery`}
    >
      {/* Gallery Header */}
      <GalleryHeader category={category} imageCount={images.length} />

      {/* Gallery Grid */}
      <GalleryGrid
        images={images}
        category={category}
        handleImageClick={handleImageClick}
        handleKeyPress={handleKeyPress}
        loadedImages={loadedImages}
      />

      {/* Load More Button */}
      {loadedImages < images.length && (
        <LoadMoreResetButton
          onClick={loadMore}
          loading={loading}
          isLoadMore={true}
          category={category}
        />
      )}

      {/* Reset Button */}
      {loadedImages === images.length && category === "Interior" && (
        <LoadMoreResetButton
          onClick={loadLess}
          loading={loading}
          isLoadMore={false}
          category={category}
        />
      )}

      {/* Lightbox Modal */}
      {selectedImage && category === "Interior" && (
        <LightboxModal
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          category={category}
        />
      )}
    </div>
  );
};

export default Gallery;
