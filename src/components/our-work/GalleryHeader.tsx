interface GalleryHeaderProps {
  category: string;
  imageCount: number;
}

export default function GalleryHeader({
  category,
  imageCount,
}: GalleryHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="relative inline-block">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
            {category}
          </h2>
          <div className="w-[40%] h-1 bg-gradient-to-r from-red-500 to-red-400 mx-auto mb-6" />
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our collection of stunning {category.toLowerCase()} projects
        </p>
        <p className="text-gray-500 text-md mt-2">
          {imageCount} {imageCount === 1 ? "image" : "images"} available
        </p>
      </div>
    </div>
  );
}
