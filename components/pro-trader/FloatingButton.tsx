// components/pro-trader/FloatingButton.tsx
"use client";

import { MdAdd } from "react-icons/md";

interface FloatingButtonProps {
  onClick?: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-secondary text-on-secondary shadow-lg shadow-secondary/30 flex items-center justify-center transition-all hover:bg-secondary-container hover:scale-105 active:scale-95 z-50"
    >
      <MdAdd className="text-2xl" />
    </button>
  );
}
