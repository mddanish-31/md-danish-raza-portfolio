import React from "react";
import Image from "next/image";

export function AnimeCharacter() {
  return (
    <div className="hero-character relative flex flex-col items-center justify-center select-none w-full h-full">
      {/* Full-body anime character: preserves 2:3 aspect ratio, never crops head or sneakers */}
      <div className="hero-character-float relative flex items-center justify-center h-full max-h-full">
        <Image
          src="/images/danish-anime.png"
          alt="MD Danish Raza - Full-body anime illustration in cream patterned shirt with arms crossed"
          width={1024}
          height={1536}
          priority
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 50vw"
          className="w-auto h-[64svh] sm:h-[72svh] md:h-[78svh] lg:h-[calc(100svh-11.625rem)] xl:h-[calc(100svh-11.5rem)] max-h-full max-w-[92vw] sm:max-w-2xl lg:max-w-3xl object-contain select-none pointer-events-none"
        />

        {/* Subtle floor contact shadow under sneakers */}
        <div
          className="absolute -bottom-1 sm:-bottom-1.5 w-56 sm:w-72 lg:w-88 h-3.5 rounded-[100%] bg-black/10 dark:bg-black/30 blur-sm pointer-events-none -z-10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
