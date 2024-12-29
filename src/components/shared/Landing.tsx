import HeadlineText from "@/components/shared/HeadlineText";
import ServicesButtons from "../home/services/ServicesButtons";

export default function Landing({
  backgroundPath,
}: {
  backgroundPath: string;
}) {
  return (
    <section
      className={`relative min-h-[550px] h-[50vh] w-full bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${backgroundPath})` }}
    >
      {/* Color overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center ">
        {/* Content goes here */}
        <div className="relative flex flex-col text-white items-center gap-10 justify-center  max-w-6xl mx-auto px-4">
          <HeadlineText
            text="Rivas Pro Painting Inc."
            colorType="white"
            headingType="h1"
          />
          <h2 className="text-lg">
            Transforming Homes & Businesses Throughout the Bay Area
          </h2>
          <ServicesButtons
            type="header"
            quote={{ linkText: "Or Call Us" }}
            className="mt-0"
          />
          {/* <a
            href="tel:9257683649"
            className="px-4 py-2 rounded bg-primary-red text-gray-200 hover:text-white"
          >
            Call us now
          </a> */}
        </div>
      </div>
    </section>
  );
}
