"use client";
import { QuoteButton } from "@/components/shared/QuoteButton";
// import { QuoteModal } from "@/components/shared/QuoteModal";
import Link from "next/link";
// import { useModal } from "@/hooks/useModal";
import { ArrowRight } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

interface ServicesButtonsProps {
  type?: string;
  className?: string;
  quote?: {
    justQuote?: boolean;
    quoteText?: string;
    linkText?: string;
    colorLink?: string;
    underLinkClassName?: string;
  };
}

export default function ServicesButtons({
  type,
  quote = {
    justQuote: false,
    quoteText: "Ready for your quote? Click here",
    colorLink: "orange",
    underLinkClassName: "",
  },
  className = "",
}: ServicesButtonsProps) {
  // const { isOpen, openModal, closeModal } = useModal();
  const { openModal } = useContext(ModalContext);

  // reuse the QuoteButton component to create a button that opens the QuoteModal
  const href = type === "header" ? "tel:925-594-6142" : "/gallery";
  const linkText = quote?.linkText
    ? quote?.linkText
    : `Explore Our ${type} Work`;

  return (
    <div className={`${className} text-center`}>
      <QuoteButton
        className="inline-flex items-center "
        onClick={openModal}
        buttonText={quote.quoteText}
      />

      {!quote?.justQuote && (
        <div>
          <Link
            href={href}
            className={`text-${quote.colorLink}-500 focus:text-${quote.colorLink}-600 mt-4 hover:text-${quote.colorLink}-600 font-medium inline-flex items-center group transition-colors duration-300 ${quote.underLinkClassName}`}
            aria-label="Request your free quote"
          >
            <span>{linkText}</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-focus-within:translate-x-1 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
