import { Card } from "@/components/ui/card";
import { Heart, Star, Shield, Users } from "lucide-react";
import HeadlineText from "../shared/HeadlineText";

const COMPANY_INFO = {
  name: "Rivas Pro Painting",
  founderName: "Enrique Rafael",
  yearStarted: 1985,
  yearsExperience: 35,
  yearEstablished: 2015,
  amountOfEmployees: 4,
};

export default function AboutSection() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Personal Touch */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <HeadlineText
          text={`Meet ${COMPANY_INFO.founderName}`}
          className="text-center"
          colorType="black"
          lineColor="red-600"
          headingType="h1"
        />
        <div className="bg-orange-50 mt-10 p-8 rounded-lg shadow-sm">
          <p className="text-xl text-gray-700 italic mb-4">
            &quot;Every stroke of the brush is a promise to my customers. When I
            started this journey in 1985, I made a commitment to treat every
            home as if it were my own.&quot;
          </p>
          <p className="text-gray-600 text-right">
            - {COMPANY_INFO.founderName}, Founder
          </p>
        </div>
      </div>

      {/* Personal Story Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            With over {COMPANY_INFO.yearsExperience} years in the painting
            industry, I&apos;ve built my experience from the ground up. Starting
            in
            {COMPANY_INFO.yearStarted} with basic tools and determination, I
            spent years learning the best techniques and working with quality
            materials. This attention to detail has helped me deliver lasting
            results for every project.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            In {COMPANY_INFO.yearEstablished}, I founded {COMPANY_INFO.name} to
            serve more homeowners across the Bay Area. While our team has grown,
            our commitment remains the same - delivering quality work that
            transforms your space and exceeds your expectations.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center">
          <HeadlineText
            text="Our Values"
            colorType="black"
            headingType="h2"
            lineColor="red-600"
          />
        </div>

        <div className="grid mt-10 gap-6 md:grid-cols-2">
          <Card className="p-6 bg-blue-50">
            <Heart className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">
              Passion for Perfection
            </h3>
            <p className="text-gray-700">
              Quality work takes time and care. We personally check every detail
              to make sure your project is done right. No shortcuts, just great
              results.
            </p>
          </Card>

          <Card className="p-6 bg-orange-50">
            <Shield className="w-8 h-8 text-blue-900 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Trust & Integrity</h3>
            <p className="text-gray-700">
              Your home matters to us. We&apos;ll be clear about everything -
              how long it&apos;ll take, what it&apos;ll cost, and how we&apos;ll
              do it.
            </p>
          </Card>

          <Card className="p-6 bg-red-50">
            <Star className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quality Above All</h3>
            <p className="text-gray-700">
              We pick the best paint and tools myself. That&apos;s why our work
              looks great and lasts long - we use only top-quality materials.
            </p>
          </Card>

          <Card className="p-6 bg-gray-50">
            <Users className="w-8 h-8 text-blue-900 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Family Values</h3>
            <p className="text-gray-700">
              Our team is like family - {COMPANY_INFO.amountOfEmployees} skilled
              painters who care about your home as much as I do. Together,
              we&apos;ll make your ideas come to life.
            </p>
          </Card>
        </div>
      </div>

      {/* Service Area */}
      <div className="max-w-4xl mx-auto mb-4 text-center">
        <p className="text-lg text-gray-700">
          Proudly serving the East Bay and greater Bay Area with premium
          painting services since 1985.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Let&apos;s bring your vision to life with the care and quality you
          deserve.
        </p>
      </div>
    </div>
  );
}
