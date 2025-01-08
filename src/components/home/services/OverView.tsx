import { Home, Building2 } from "lucide-react";

export default function OverView() {
  return (
    <div id="my-services" className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Home className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-semibold">Residential Services</h3>
          </div>
          <p className="text-gray-600">
            Transform your home with our professional painting services. We
            handle interior and exterior painting, delivering exceptional
            appeal.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-semibold">Commercial Services</h3>
          </div>
          <p className="text-gray-600">
            Enhance your business environment with our commercial expertise. We
            work efficiently to minimize disruption while maintaining
            professional results.
          </p>
        </div>
      </div>
    </div>
  );
}
