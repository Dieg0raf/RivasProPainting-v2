import LandingSection from "@/components/shared/Landing";
import { galleryImages } from "@/components/our-work/utils";
import Gallery from "@/components/our-work/Gallery";

export default function OurWork() {
  return (
    <>
      <LandingSection
        backgroundPath="/images/background-image-2.jpg"
        headlineText="Bringing Color to Life"
        landingText="Step into our gallery and see how we bring color to life. From vibrant exteriors to elegant interiors, our work is a celebration of color and design."
      />
      <Gallery category="Exterior" imageProps={galleryImages.images.exterior} />
      <Gallery category="Interior" imageProps={galleryImages.images.interior} />
    </>
  );
}
