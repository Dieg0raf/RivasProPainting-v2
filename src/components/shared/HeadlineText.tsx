interface HeadlineTextProps {
  text: string;
  colorType: "black" | "white";
  headingType: "h1" | "h2";
}

export default function HeadlineText({
  text,
  colorType,
  headingType,
}: HeadlineTextProps) {
  const HeadingTag = headingType;

  const textColorClass = colorType === "black" ? "text-gray-900" : "text-white";

  return (
    <div className="relative inline-block">
      <HeadingTag
        className={`${textColorClass} font-bold text-center text-4xl mb-2`}
      >
        {text}
      </HeadingTag>
      <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-orange-500" />
    </div>
  );
}
