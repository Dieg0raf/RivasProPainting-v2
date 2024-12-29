"use client";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { useModal } from "@/hooks/useModal";
import OurServicesContent from "./OurServicesContent";

const ServicesSection = () => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    // <section className="py-16 px-4 bg-gradient-to-b space-y-8 md:space-y-16 lg:space-y-32">
    <section className="py-16 px-4 ">
      <OurServicesContent openModal={openModal} />
      <OurServicesContent openModal={openModal} isInterior={false} />
      <QuoteModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default ServicesSection;
