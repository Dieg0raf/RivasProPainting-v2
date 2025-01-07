import HeadlineText from "@/components/shared/HeadlineText";
import LeafLetMap from "../LeafLetMap";
import ServicesButtons from "../services/ServicesButtons";
import CitiesGrid from "./CitiesGrid";

export default function ServiceAreas() {
  return (
    <section className="flex flex-col items-center justify-center py-10">
      <div className="relative flex flex-col items-center gap-10 justify-center z-10 max-w-7xl mx-auto px-4 w-full">
        <HeadlineText
          text="Service Areas"
          colorType="black"
          headingType="h2"
          className="text-4xl md:text-5xl  font-bold text-blue-900 "
          lineColor="red-600"
        />
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Rivas Pro Painting serving the East Bay and surrounding areas
        </p>

        {/* Map and Cities Container */}
        <div className="flex flex-col lg:flex-row gap-12 w-full">
          {/* Map */}
          <div className="lg:w-1/2">
            <LeafLetMap />
          </div>

          {/* Cities Grid */}
          <div className="lg:w-1/2">
            <CitiesGrid />
            <ServicesButtons quote={{ justQuote: true }} className="mt-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
