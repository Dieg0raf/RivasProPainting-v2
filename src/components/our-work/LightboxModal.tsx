import { X } from "lucide-react";
import { GalleryImage } from "./utils";
import Image from "next/image";

interface LightboxModalProps {
  selectedImage: GalleryImage | null;
  setSelectedImage: (image: GalleryImage | null) => void;
  category: string;
}

export default function LightboxModal({
  selectedImage,
  setSelectedImage,
  category,
}: LightboxModalProps) {
  {
    // If no image is selected, return null
    if (!selectedImage) return null;

    return (
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
          <div className="text-center text-white mt-4 text-xl">
            {category} Image
          </div>
        </div>
      </div>
    );
  }
}
