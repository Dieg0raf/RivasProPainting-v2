import { Shield, Home, Clock, DollarSign, Award } from "lucide-react";
import { JSX } from "react";

interface BenefitItem {
  text: string;
  icon: JSX.Element;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    text: "Locally Owned",
    icon: <Home className="h-6 w-6 text-orange-500 flex-shrink-0" />,
    description: "Serving the Bay Area with pride and dedication since 1985",
  },
  {
    text: "Clean Paint Work",
    icon: <Shield className="h-6 w-6 text-orange-500 flex-shrink-0" />,
    description:
      "Detailed preparation and thorough cleanup after every project",
  },
  {
    text: "Within budget",
    icon: <DollarSign className="h-6 w-6 text-orange-500 flex-shrink-0" />,
    description: "Transparent pricing with no hidden costs or surprises",
  },
  {
    text: "Professional & Licensed Painters",
    icon: <Award className="h-6 w-6 text-orange-500 flex-shrink-0" />,
    description: "Fully licensed, insured, and expertly trained team",
  },
  {
    text: "Fast Project Completion",
    icon: <Clock className="h-6 w-6 text-orange-500 flex-shrink-0" />,
    description: "Quick turnaround times with efficient project management",
  },
];

export default function Benefits() {
  return (
    <div className="bg-primary-blue py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-lg shadow-xl">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary-blue">
            Why Choose Our Services?
          </h3>
          <ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none"
            role="list"
          >
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-200 hover:backdrop-blur-sm transition-colors"
                role="listitem"
              >
                {benefit.icon}
                <div>
                  <h4 className="font-semibold mb-2 text-primary-blue">
                    {benefit.text}
                  </h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
