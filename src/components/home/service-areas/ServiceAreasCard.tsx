export interface ServiceAreasCardProps {
  area: string;
  cities: string[];
}

export default function ServiceAreasCard({
  area,
  cities,
}: ServiceAreasCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h4 className="text-xl font-bold text-primary-blue mb-4 border-b pb-2">
        {area}
      </h4>
      <ul className="space-y-2 text-gray-600">
        {cities.map((city) => (
          <li key={city} className="flex items-center">
            <span className="h-1.5 w-1.5 bg-primary-red rounded-full mr-3"></span>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}
