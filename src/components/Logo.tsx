"use client";
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const dims = {
    sm:  { w: 95,  h: 41  },
    md:  { w: 140, h: 61  },
    lg:  { w: 190, h: 82  },
  }[size];

  return (
    <svg
      width={dims.w}
      height={dims.h}
      viewBox="0 0 190 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AK Logo"
    >
      <rect x="1" y="1" width="188" height="80" rx="7"
        stroke="#C9A84C" strokeWidth="1.2" opacity="0.35"/>
      <rect x="5" y="5" width="180" height="72" rx="4"
        stroke="#C9A84C" strokeWidth="0.4" opacity="0.1"/>
      <text x="12" y="56"
        fontFamily="'Courier New', Courier, monospace"
        fontSize="28" fontWeight="700" fill="#C9A84C" opacity="0.9">&lt;</text>
      <text x="42" y="57"
        fontFamily="'Courier New', Courier, monospace"
        fontSize="40" fill="#ffffff">AK</text>
      <text x="118" y="56"
        fontFamily="'Courier New', Courier, monospace"
        fontSize="28" fontWeight="700" fill="#C9A84C" opacity="0.9">/&gt;</text>
    </svg>
  );
}
