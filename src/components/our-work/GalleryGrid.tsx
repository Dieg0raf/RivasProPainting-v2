import Image from "next/image";
import { GalleryImage } from "./utils";

interface GalleryGridProps {
  images: GalleryImage[];
  category: string;
  handleImageClick: (image: GalleryImage) => void;
  handleKeyPress: (
    e: React.KeyboardEvent<HTMLDivElement>,
    image: GalleryImage
  ) => void;
  loadedImages: number;
}

export default function GalleryGrid({
  images,
  category,
  handleImageClick,
  handleKeyPress,
  loadedImages,
}: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.slice(0, loadedImages).map((image) => (
        <div
          key={image.id}
          className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          onClick={() => handleImageClick(image)}
          onKeyDown={(e) => handleKeyPress(e, image)}
          tabIndex={0}
          role="button"
          aria-label={`View ${category} image in lightbox`}
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
                {/* TODO: add location of image into image metadata */}
                {category} Image
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
