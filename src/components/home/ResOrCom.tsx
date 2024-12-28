"use client";
import HeadlineText from "@/components/shared/HeadlineText";
import { QuoteButton } from "@/components/shared/QuoteButton";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ResOrCom() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-48">
          {/* Residential Card */}
          <Card className="overflow-hidden max-w-md mx-auto w-full flex flex-col">
            <CardHeader>
              <HeadlineText
                text="Residential"
                colorType="black"
                headingType="h2"
              />
            </CardHeader>
            <div className="relative h-48">
              <Image
                src="/images/residential-painting.jpg"
                alt="Residential Painting"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-grow">
              <p className="text-gray-600">
                Transform your home with our professional residential painting
                services. We handle interior and exterior painting, delivering
                {/* exceptional results that increase your home's value and curb */}
                appeal.
              </p>
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              <div className="flex justify-end w-full">
                <QuoteButton onClick={openModal} />
              </div>
            </CardFooter>
          </Card>

          {/* Commercial Card */}
          <Card className="overflow-hidden max-w-md mx-auto w-full flex flex-col">
            <CardHeader>
              <HeadlineText
                text="Commercial"
                colorType="black"
                headingType="h2"
              />
            </CardHeader>
            <div className="relative h-48">
              <Image
                src="/images/commercial-painting.jpg"
                alt="Commercial Painting"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-grow">
              <p className="text-gray-600">
                Enhance your business environment with our commercial painting
                expertise. We work efficiently to minimize disruption while
                delivering professional results that maintain your business
                image.
              </p>
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              <div className="flex justify-end w-full">
                <QuoteButton onClick={openModal} />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <QuoteModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
}
