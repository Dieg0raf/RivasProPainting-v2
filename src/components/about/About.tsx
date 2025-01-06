import { Card } from "@/components/ui/card";
import { Heart, Star, Shield, Users } from "lucide-react";
import HeadlineText from "../shared/HeadlineText";

const COMPANY_INFO = {
  name: "Rivas Pro Painting",
  founderName: "Enrique Rafael",
  yearStarted: 1985,
  yearsExperience: 35,
  yearEstablished: 2015,
};

const AboutSection = () => {
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
            For over {COMPANY_INFO.yearsExperience} years, I&apos;ve lived and
            breathed the art of painting. My journey began in 1985 with just a
            ladder, some brushes, and an unwavering dedication to quality. Every
            weekend, while others rested, I was studying new techniques,
            learning about materials, and perfecting my craft. This wasn&apos;t
            just a job for me – it was my calling.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            In 2015, after three decades of hands-on experience, I took the leap
            to establish {COMPANY_INFO.name}. But even as we&apos;ve grown,
            I&apos;ve never lost sight of what matters most: the smile on a
            homeowner&apos;s face when they see their space transformed.
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
              I believe that true craftsmanship means never cutting corners.
              Every project gets my personal attention, ensuring that even the
              smallest details meet our high standards.
            </p>
          </Card>

          <Card className="p-6 bg-orange-50">
            <Shield className="w-8 h-8 text-blue-900 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Trust & Integrity</h3>
            <p className="text-gray-700">
              Your home is your sanctuary, and I treat it with the respect it
              deserves. We&apos;re always transparent about our process,
              timeline, and pricing.
            </p>
          </Card>

          <Card className="p-6 bg-red-50">
            <Star className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quality Above All</h3>
            <p className="text-gray-700">
              I personally select all materials and tools we use, ensuring only
              the best products touch your walls. This attention to quality is
              why our work stands the test of time.
            </p>
          </Card>

          <Card className="p-6 bg-gray-50">
            <Users className="w-8 h-8 text-blue-900 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Family Values</h3>
            <p className="text-gray-700">
              Today, I lead a team of five dedicated professionals who share my
              values. We&apos;re not just workers – we&apos;re a family
              committed to bringing your vision to life.
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
};

export default AboutSection;
