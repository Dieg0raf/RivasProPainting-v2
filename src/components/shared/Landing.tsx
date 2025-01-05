"use client";
import { motion } from "framer-motion";
import HeadlineText from "@/components/shared/HeadlineText";
import ServicesButtons from "../home/services/ServicesButtons";

export default function Landing({
  backgroundPath,
  landingText,
}: {
  backgroundPath: string;
  landingText: string;
}) {
  return (
    <section
      className={`relative min-h-[650px] h-[60vh] w-full bg-cover bg-fixed bg-center bg-no-repeat transition-all duration-500`}
      style={{ backgroundImage: `url(${backgroundPath})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col text-white items-center gap-10 justify-center max-w-6xl mx-auto px-4"
        >
          <div className="flex flex-col items-center">
            {/* <div className="w-20 h-1 bg-orange-500 mb-6" /> */}
            <HeadlineText
              text="Rivas Pro Painting Inc."
              colorType="white"
              lineColor="red-600"
              headingType="h1"
              className="text-5xl md:text-7xl font-bold tracking-tight text-center"
            />
          </div>

          <div className="relative">
            <h2 className="relative text-xl md:text-2xl font-light tracking-wide max-w-2xl text-center leading-relaxed">
              {landingText}
            </h2>
          </div>

          <ServicesButtons
            type="header"
            quote={{ linkText: "Or Call Us" }}
            className="mt-8 space-y-4"
          />
        </motion.div>
      </div>
    </section>
  );
}
