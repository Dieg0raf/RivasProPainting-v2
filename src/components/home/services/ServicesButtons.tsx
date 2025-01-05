"use client";
import { scrollToSection } from "@/components/header/utils";
import { QuoteButton } from "@/components/shared/QuoteButton";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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
  const { openModal } = useContext(ModalContext);

  // reuse the QuoteButton component to create a button that opens the QuoteModal
  const linkText = quote?.linkText
    ? quote?.linkText
    : `Explore Our ${type} Work`;

  const router = useRouter();
  const pathname = usePathname();

  // Function to handle button click (redirect to section on home page or another page)
  function handleHomeClick(
    e: React.MouseEvent<HTMLButtonElement>,
    itemId: string
  ) {
    e.preventDefault();

    if (pathname === "/our-work") {
      scrollToSection(itemId);
    } else {
      router.push(`/our-work`);
      // Set timeout to scroll to section after the page has changed
      setTimeout(() => {
        scrollToSection(itemId);
      }, 300);
    }
  }

  return (
    <div className={`${className} text-center`}>
      <QuoteButton
        className="inline-flex items-center "
        onClick={openModal}
        buttonText={quote.quoteText}
      />

      {!quote?.justQuote && (
        <div>
          {type !== "header" && (
            <button
              className={`text-${quote.colorLink}-500 focus:text-${quote.colorLink}-600 mt-4 hover:text-${quote.colorLink}-600 font-medium inline-flex items-center group transition-colors duration-300 ${quote.underLinkClassName}`}
              aria-label={linkText}
              onClick={(e) => {
                handleHomeClick(e, `${type?.toLowerCase()}-gallery`);
                console.log("type:", type);
              }}
            >
              <span>{linkText}</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-focus-within:translate-x-1 group-hover:translate-x-1" />
            </button>
          )}
          {type === "header" && (
            <Link
              href="tel:925-594-6142"
              className={`text-${quote.colorLink}-500 focus:text-${quote.colorLink}-600 mt-4 hover:text-${quote.colorLink}-600 font-medium inline-flex items-center group transition-colors duration-300 ${quote.underLinkClassName}`}
              aria-label={linkText}
            >
              <span>{linkText}</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-focus-within:translate-x-1 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
