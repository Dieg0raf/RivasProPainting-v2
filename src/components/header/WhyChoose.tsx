import { Check } from "lucide-react";

interface BenefitItem {
  text: string;
}

const benefits: BenefitItem[] = [
  { text: "Locally Owned" },
  { text: "Quick and Clean paint work" },
  { text: "Quick and within budget" },
  { text: "Professional & Licensed Painters" },
  { text: "Clean Paint Work" },
];

const WhyChooseSection = () => {
  return (
    <section className="bg-primary-blue text-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-32 items-start">
          {/* Left side - Title */}
          <div className="flex flex-col justify-start pl-4">
            {" "}
            {/* Added pl-4, removed center justify */}
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              Why Choose
              <br />
              Rivas Pro
              <br />
              Painting?
            </h2>
          </div>

          {/* Right side - Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-base md:text-lg"
              >
                <Check className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
