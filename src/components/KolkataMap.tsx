"use client";

import React, { useRef, useEffect, useMemo } from "react";
import L from "leaflet";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Approximate Science City area coordinates for Kolkata, West Bengal, India
const SCIENCE_CITY_COORDS: [number, number] = [22.5484, 88.3973];
const DEFAULT_ZOOM = 14;
const OSM_EXPLORE_URL =
  "https://www.openstreetmap.org/?mlat=22.5484&mlon=88.3973#map=14/22.5484/88.3973";

export function KolkataMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Custom Teal Location Marker Icon (avoids default Leaflet image 404 asset bugs)
  const customMarkerIcon = useMemo(() => {
    return L.divIcon({
      className: "kolkata-teal-div-icon",
      html: `
        <div class="relative flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer" role="button" aria-label="Science City area location marker">
          <span class="absolute w-7 h-7 rounded-full bg-[var(--color-primary-accent)]/30 animate-ping opacity-75"></span>
          <span class="absolute w-5 h-5 rounded-full bg-[var(--color-primary-accent)]/35"></span>
          <div class="relative w-3.5 h-3.5 rounded-full bg-[var(--color-primary-accent)] border-2 border-[var(--color-main-bg)] shadow-md"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -14],
    });
  }, []);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Initialize exactly one Leaflet map instance on this container using official API
    const map = L.map(container, {
      center: SCIENCE_CITY_COORDS,
      zoom: DEFAULT_ZOOM,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });
    mapInstanceRef.current = map;

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add custom styled Science City location marker
    const marker = L.marker(SCIENCE_CITY_COORDS, { icon: customMarkerIcon }).addTo(map);

    // Bind teal popup to marker
    const popupContent = `
      <div class="py-0.5 px-1 text-center font-sans">
        <h4 class="text-xs sm:text-sm font-bold text-[var(--color-main-text)] tracking-tight">
          Science City Area, Kolkata
        </h4>
        <p class="text-[11px] text-[var(--color-primary-accent)] font-medium mt-0.5 whitespace-nowrap">
          Open to Global Collaboration
        </p>
      </div>
    `;

    marker.bindPopup(popupContent, {
      className: "kolkata-teal-popup",
      autoPan: false,
    });

    // Cleanup: tear down Leaflet instance on unmount using documented Leaflet lifecycle
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [customMarkerIcon]);

  return (
    <div className="w-full flex flex-col">
      {/* Location Metadata Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-xs mb-3 px-0.5">
        <div className="flex items-center gap-2 font-semibold text-[var(--color-main-text)]">
          <MapPin className="w-3.5 h-3.5 text-[var(--color-primary-accent)] shrink-0" />
          <span className="text-xs sm:text-sm">Science City Area, Kolkata, West Bengal, India</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-primary-accent)]">
          <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted-text)] font-sans">
            REMOTE COLLABORATION:
          </span>
          <span className="font-semibold">WORLDWIDE ↗</span>
        </div>
      </div>

      {/* Interactive Map Canvas Container (Responsive: Mobile ~250px, Tablet ~290px, Desktop ~330px) */}
      <div
        ref={mapContainerRef}
        className="kolkata-map-container relative w-full h-[250px] sm:h-[290px] lg:h-[330px] rounded-2xl overflow-hidden border border-[var(--portfolio-skill-card-border)] bg-[var(--portfolio-skill-card-bg)] shadow-xs transition-colors duration-250 isolate z-0 font-sans"
        aria-label="Interactive location map of Science City Area, Kolkata, India"
        tabIndex={0}
      />

      {/* Explore Map Action Link Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 px-0.5 text-xs text-[var(--color-muted-text)]">
        <span className="text-[11px] sm:text-xs opacity-75">
          Approximate area location · Not a residential address
        </span>
        <a
          href={OSM_EXPLORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary-accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] rounded-sm transition-colors self-start sm:self-auto"
          aria-label="Explore Science City area, Kolkata on OpenStreetMap in a new tab"
        >
          <span>Explore Map ↗</span>
        </a>
      </div>
    </div>
  );
}

export default KolkataMap;
