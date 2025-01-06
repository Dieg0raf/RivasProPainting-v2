interface HeadlineTextProps {
  text: string;
  colorType: "black" | "white";
  headingType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  lineColor?: string;
  footer?: boolean;
}

export default function HeadlineText({
  text,
  colorType,
  headingType,
  className = "",
  lineColor = "orange-500",
  footer = false,
}: HeadlineTextProps) {
  const HeadingTag = headingType;

  // const textColorClass = colorType === "black" ? "text-gray-900" : "text-white";
  const bgColor = `bg-${lineColor}`;
  // const bgColor = "bg-red-600";

  return (
    <div className="relative inline-block text-center">
      <HeadingTag
        className={`text-${colorType} ${className} font-bold text-center text-4xl mb-2`}
      >
        {text}
      </HeadingTag>
      {!footer && (
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 -bottom-1 mx-auto w-[40%] h-[3px] ${bgColor}`}
        />
      )}
      {footer && (
        <div
          // className={`absolute left-0  transform -translate-x-1/2 -bottom-1 mx-auto w-[40%] h-[3px] bg-${lineColor}`}
          className={`absolute -bottom-1 left-0 w-full h-[3px] ${bgColor}`}
        />
      )}
    </div>
  );
}
