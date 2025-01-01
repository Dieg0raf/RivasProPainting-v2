// contexts/ModalContext.tsx
"use client";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { createContext } from "react";
import { useModal } from "@/hooks/useModal";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
      <QuoteModal isOpen={isOpen} onClose={closeModal} />
    </ModalContext.Provider>
  );
}
