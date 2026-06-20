"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  showChevron?: boolean;
}

export function Menu({
  trigger,
  children,
  align = "left",
  showChevron = true,
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown
            className="ml-2 -mr-1 h-4 w-4 text-white"
            aria-hidden="true"
          />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-md bg-[#1c1c1c] shadow-lg ring-1 ring-white/10 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export function MenuItem({
  children,
  onClick,
  disabled = false,
  icon,
  isActive = false,
}: MenuItemProps) {
  return (
    <button
      className={`relative flex items-center justify-center w-full h-full rounded-full group
        ${disabled ? "text-gray-500 cursor-not-allowed" : `text-black hover:text-[#ff5500]`}
        ${isActive ? "bg-black/10 text-[#ff5500]" : ""}
      `}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex items-center justify-center h-full">
        {icon && (
          <span className="h-6 w-6 transition-all duration-200 group-hover:[&_svg]:stroke-[2.5]">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  );
}

export function MenuContainer({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Close menu if a child link is clicked
  const handleChildClick = (child: any) => {
    if (child.props.onClick) {
      child.props.onClick();
    }
    setIsExpanded(false);
  };

  return (
    <>
      {/* Glassmorphism Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isExpanded
            ? "bg-black/40 backdrop-blur-md opacity-100 pointer-events-auto"
            : "bg-transparent backdrop-blur-none opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsExpanded(false)}
      />

      <div className="relative w-14 h-14 z-50" data-expanded={isExpanded}>
        {/* Container for all items */}
        <div className="relative">
          {/* First item - always visible */}
          <div
            className="relative w-14 h-14 bg-[#f0f0f0] border-black/10 border shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer rounded-full group will-change-transform z-50 flex items-center justify-center transition-colors duration-300"
            onClick={handleToggle}
          >
            {childrenArray[0]}
          </div>

          {/* Other items */}
          {childrenArray.slice(1).map((child: any, index) => (
            <div
              key={index}
              className="absolute top-0 left-0 w-14 h-14 bg-[#f0f0f0] border-black/10 border shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-full flex items-center justify-center will-change-transform"
              style={{
                transform: `translateY(${isExpanded ? (index + 1) * 64 : 0}px)`,
                opacity: isExpanded ? 1 : 0,
                pointerEvents: isExpanded ? "auto" : "none",
                zIndex: 40 - index,
                clipPath:
                  index === childrenArray.length - 2
                    ? "circle(50% at 50% 50%)"
                    : "circle(50% at 50% 55%)",
                transition: `transform ${isExpanded ? "300ms" : "300ms"} cubic-bezier(0.4, 0, 0.2, 1),
                           opacity ${isExpanded ? "300ms" : "350ms"}`,
                backfaceVisibility: "hidden",
                perspective: 1000,
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {React.cloneElement(child, {
                onClick: () => handleChildClick(child),
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
