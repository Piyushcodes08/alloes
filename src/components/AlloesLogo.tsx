import React from 'react';

interface AlloesLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export default function AlloesLogo({ className = '', size = 56, showText = true, variant = 'dark' }: AlloesLogoProps) {
  const isLight = variant === 'light';
  return (
    <div className={`flex items-center gap-3 ${className} select-none`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        {/* Definitions for Gradients */}
        <defs>
          {/* Main green gradient for stylized A */}
          <linearGradient id="alloesAGradient" x1="60" y1="20" x2="60" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B4D3A" />
            <stop offset="45%" stopColor="#1E8251" />
            <stop offset="100%" stopColor="#4BB055" />
          </linearGradient>
          
          {/* Metallic Gold Gradient for Outer Ring */}
          <linearGradient id="goldMetallic" x1="15" y1="15" x2="105" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="25%" stopColor="#FFF3A8" />
            <stop offset="50%" stopColor="#9A7007" />
            <stop offset="75%" stopColor="#FFF8D4" />
            <stop offset="100%" stopColor="#805B00" />
          </linearGradient>
        </defs>

        {/* Circular Background */}
        <circle cx="60" cy="60" r="56" fill="#FFFFFF" />

        {/* Outer Premium Gold Ring */}
        <circle cx="60" cy="60" r="53" fill="none" stroke="url(#goldMetallic)" strokeWidth="4.5" />

        {/* Stylized 'A' with leaf/wave elements and white circle cutout */}
        {/* Left leg and top point */}
        <path
          d="M 60,20 
             C 53,30 45,45 37,59 
             C 35.5,61.5 35.8,64 38,64 
             L 45,64 
             C 47,64 48.5,62.5 49.5,60 
             L 54,49 
             C 54.5,48 55.5,47.5 56.5,48.5 
             C 57.5,49.5 57,51 56,53 
             L 51.5,62 
             C 50.5,64 51.2,65 53.5,65 
             L 59,65 
             C 61,65 62,64 62.5,62 
             L 66,48 
             C 66.5,46 68,44 70,44 
             C 72,44 73,45.5 72.5,47.5 
             L 66,66 
             C 65.5,67.5 66.5,68.5 68.5,68.5 
             L 76,68.5 
             C 79,68.5 81.5,66.5 83,63.5 
             C 85,59.5 81,58 78,59 
             C 75,60 73.5,58.5 74.5,56 
             L 79,44 
             C 82,34 70,22 60,20 Z"
          fill="url(#alloesAGradient)"
        />

        {/* White circle cutout detail in stylized A */}
        <circle cx="60" cy="40" r="7.5" fill="#FFFFFF" />
        {/* Subtle swoosh cutting into the right leg */}
        <path
          d="M 60,40 C 65,40 73,43 73,50 C 73,56 65,56 60,56 C 55,56 52,50 60,40 Z"
          fill="#FFFFFF"
        />
        <path
          d="M 50,33 
             C 54,34 58,37 58,40 
             C 58,43 55,45 52,44 
             C 49,43 47,38 50,33 Z"
          fill="url(#alloesAGradient)"
        />

        {/* AlloES Text inside logo container */}
        <g transform="translate(18, 70)">
          {/* A */}
          <text
            x="0"
            y="16"
            fontFamily="Georgia, serif"
            fontSize="18"
            fontWeight="bold"
            fill="#1C2826"
            letterSpacing="-0.5"
          >
            All
          </text>

          {/* Custom Split 'o' */}
          <g transform="translate(24, 2)">
            {/* Left/Bottom-left half (Green) */}
            <path
              d="M 5,14 
                 A 7.5,7.5 0 0,1 5,-1 
                 L 5,14 Z"
              fill="#34A853"
              transform="rotate(45, 5, 6.5)"
            />
            {/* Right/Top-right half (Deep Blue) */}
            <path
              d="M 5,-1 
                 A 7.5,7.5 0 0,1 5,14 
                 L 5,-1 Z"
              fill="#0D47A1"
              transform="rotate(45, 5, 6.5)"
            />
            {/* Small diagonal white separator gap */}
            <line
              x1="-1"
              y1="13.5"
              x2="11"
              y2="1.5"
              stroke="#FFFFFF"
              strokeWidth="1.6"
            />
          </g>

          {/* ES */}
          <text
            x="36"
            y="16"
            fontFamily="Georgia, serif"
            fontSize="18"
            fontWeight="bold"
            fill="#1C2826"
            letterSpacing="-0.5"
          >
            ES
          </text>

          {/* Registered trademark symbol (R) */}
          <text
            x="59"
            y="4"
            fontFamily="sans-serif"
            fontSize="5.5"
            fontWeight="bold"
            fill="#1C2826"
          >
            ®
          </text>
        </g>

        {/* PHARMACEUTICALS subtitle */}
        <text
          x="60"
          y="102"
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize="6.5"
          fontWeight="bold"
          fill="#1C2826"
          letterSpacing="1.8"
        >
          PHARMACEUTICALS
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-headline text-md md:text-xl font-bold tracking-tight leading-none transition-colors ${
            isLight ? 'text-white group-hover:text-secondary' : 'text-primary group-hover:text-trust-gold'
          }`}>
            Alloes
          </span>
          <span className={`text-[8px] font-sans font-bold uppercase tracking-widest leading-none mt-1 ${
            isLight ? 'text-white/70' : 'text-text-muted'
          }`}>
            Pharmaceuticals
          </span>
        </div>
      )}
    </div>
  );
}
