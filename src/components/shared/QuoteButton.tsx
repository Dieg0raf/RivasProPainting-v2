import { ArrowRight } from "lucide-react";
// components/shared/QuoteButton.tsx
interface link {
  isLink: boolean;
  link: string;
}
interface QuoteButtonProps {
  onClick: () => void;
  className?: string;
  buttonText?: string;
  link?: link;
}

export function QuoteButton({
  onClick,
  buttonText = "Get Your Free Quote",
  className = "",
  link = { isLink: false, link: "#" },
}: QuoteButtonProps) {
  return (
    <>
      {link.isLink ? (
        <a
          href={link.link}
          onClick={onClick}
          className={`bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 group ${className}`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      ) : (
        <button
          onClick={onClick}
          className={`bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 group ${className}`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </>
  );
}
