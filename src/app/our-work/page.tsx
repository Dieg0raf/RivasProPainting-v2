import LandingSection from "@/components/shared/Landing";
import { galleryImages } from "@/components/our-work/utils";
import Gallery from "@/components/our-work/Gallery";

export default function OurWork() {
  // TODO: Fetch images from API (commented out code - using static images for now)
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       setLoading(true);
  //       // console.log("This is the key: ", process.env.NEXT_PUBLIC_SOMETHING);
  //       // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
  //       //   method: "GET",
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //     Authorization: `${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
  //       //   },
  //       // });
  //       // const data = await response.json();
  //       // console.log(data.images["interior"]);
  //       console.log(galleryImages.images.exterior);
  //       setImages(galleryImages.images.interior);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, [category]);
  return (
    <>
      <LandingSection
        backgroundPath="/images/background-image-1.jpg"
        landingText="Crafting Beauty, One Project at a Time"
      />
      <Gallery category="Exterior" imageProps={galleryImages.images.exterior} />
      <Gallery category="Interior" imageProps={galleryImages.images.interior} />
    </>
  );
}
