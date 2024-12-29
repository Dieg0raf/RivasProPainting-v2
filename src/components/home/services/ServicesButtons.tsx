"use client";
import { QuoteButton } from "@/components/shared/QuoteButton";
import { QuoteModal } from "@/components/shared/QuoteModal";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";
import { ArrowRight } from "lucide-react";

interface ServicesButtonsProps {
  type?: string;
  className?: string;
  quote?: {
    justQuote?: boolean;
    quoteText?: string;
    linkText?: string;
  };
}

export default function ServicesButtons({
  type,
  quote = {
    justQuote: false,
    quoteText: "Ready for your quote? Click here",
  },
  className = "",
}: ServicesButtonsProps) {
  const { isOpen, openModal, closeModal } = useModal();

  //  reuse the QuoteButton component to create a button that opens the QuoteModal
  const href = type === "header" ? "tel:925-594-6142" : "/gallery";
  const linkText = quote?.linkText
    ? quote?.linkText
    : `Explore Our ${type} Work`;

  return (
    <div className={`mt-12 text-center ${className}`}>
      <QuoteButton
        className="inline-flex items-center mb-4"
        onClick={openModal}
        buttonText={`Ready for your quote? Click here`}
      />

      {!quote?.justQuote && (
        <div>
          <Link
            href={href}
            className="text-orange-500 focus:text-orange-600 hover:text-orange-600 font-medium inline-flex items-center group transition-colors duration-300"
            aria-label="Request a quote"
          >
            <span>{linkText}</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-focus-within:translate-x-1 group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      <QuoteModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}
