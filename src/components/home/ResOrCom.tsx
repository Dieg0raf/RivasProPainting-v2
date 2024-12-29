"use client";

import { QuoteModal } from "@/components/shared/QuoteModal";
import { useModal } from "@/hooks/useModal";
import ResOrComContent from "./ResOrComContent";

export default function ResOrCom() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <section className="py-16">
      <ResOrComContent openModal={openModal} />
      <QuoteModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
}
