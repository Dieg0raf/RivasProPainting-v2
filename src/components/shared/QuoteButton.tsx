// components/shared/QuoteButton.tsx
interface QuoteButtonProps {
  onClick: () => void;
  className?: string;
}

export function QuoteButton({ onClick, className = "" }: QuoteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-red text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-medium ${className}`}
    >
      Get Your Free Quote Today
    </button>
  );
}
