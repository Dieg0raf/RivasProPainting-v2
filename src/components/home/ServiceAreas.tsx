import HeadlineText from "@/components/shared/HeadlineText";
import LeafLetMap from "./LeafLetMap";

import ServicesButtons from "./services/ServicesButtons";

export default function ServiceAreas() {
  return (
    <section className="flex flex-col items-center justify-center py-10">
      <div className="relative flex flex-col items-center gap-10 justify-center z-10 max-w-7xl mx-auto px-4 w-full">
        <HeadlineText text="Service Areas" colorType="black" headingType="h2" />
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          {/* {subtitle} */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* East Bay Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-primary-blue mb-4 border-b pb-2">
                  East Bay
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Walnut Creek
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Concord
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Clayton
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Pleasant Hill
                  </li>
                </ul>
              </div>

              {/* Tri-Valley Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-primary-blue mb-4 border-b pb-2">
                  Tri-Valley
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    San Ramon
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Danville
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Alamo
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Dublin
                  </li>
                </ul>
              </div>

              {/* Central Contra Costa Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-primary-blue mb-4 border-b pb-2">
                  Central Contra Costa
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Martinez
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Pleasant Hill
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Pacheco
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Concord
                  </li>
                </ul>
              </div>

              {/* Lamorinda Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-primary-blue mb-4 border-b pb-2">
                  Lamorinda
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Lafayette
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Moraga
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Orinda
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Rheem Valley
                  </li>
                </ul>
              </div>

              {/* South Bay Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold text-primary-blue mb-4 border-b pb-2">
                  South Bay
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    San Jose
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Santa Clara
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Sunnyvale
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
                    Mountain View
                  </li>
                </ul>
              </div>
            </div>

            <ServicesButtons quote={{ justQuote: true }} />
          </div>
        </div>
      </div>
    </section>
  );
}
