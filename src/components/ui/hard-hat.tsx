
import React from "react";

export const HardHat = ({ className = "w-12 h-12 mb-4 text-white" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"></path>
      <path d="M4 14V9a8 8 0 0 1 16 0v5"></path>
      <path d="M9 14v1"></path>
      <path d="M15 14v1"></path>
    </svg>
  );
};
