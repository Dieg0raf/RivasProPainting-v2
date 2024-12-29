import { ArrowRight } from "lucide-react";
import Link from "next/link";
interface link {
  isLink: boolean;
  link: string;
}
interface QuoteButtonProps {
  onClick?: () => void;
  className?: string;
  buttonText?: string;
  link?: link;
  ariaLabel?: string;
}

export function QuoteButton({
  onClick,
  buttonText = "Get Your Free Quote",
  ariaLabel = "Open Up Your Free Quote Form",
  className = "",
  link = { isLink: false, link: "#" },
}: QuoteButtonProps) {
  return (
    <>
      {link.isLink ? (
        <Link
          href={link.link}
          onClick={onClick}
          aria-label={ariaLabel}
          className={`bg-red-500 text-white px-6 py-3 rounded-md focus:bg-red-600 hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 group ${className}`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-focus-within:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <button
          onClick={onClick}
          aria-label={ariaLabel}
          className={`bg-red-500 text-white px-6 py-3 rounded-md focus:bg-red-600 hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 group ${className}`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 group-focus-within:translate-x-1 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </>
  );
}
