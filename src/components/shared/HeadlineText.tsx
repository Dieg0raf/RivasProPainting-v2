interface HeadlineTextProps {
  text: string;
  colorType: "black" | "white";
  headingType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export default function HeadlineText({
  text,
  colorType,
  headingType,
  className = "",
}: HeadlineTextProps) {
  const HeadingTag = headingType;

  const textColorClass = colorType === "black" ? "text-gray-900" : "text-white";

  return (
    <div className="relative inline-block">
      <HeadingTag
        className={`${textColorClass} ${className} font-bold text-center text-4xl mb-2`}
      >
        {text}
      </HeadingTag>
      <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-orange-500" />
    </div>
  );
}
