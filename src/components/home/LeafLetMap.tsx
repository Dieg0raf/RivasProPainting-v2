"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // We need to ensure L is loaded before using it (Dynamically importing Leaflet)
    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      // Check if the map instance already exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
        return;
      }
      const map = L.map("map", {
        center: [37.9066, -122.0614],
        zoom: 8,
        zoomControl: false,
        dragging: false,
        // maxZoom: 8,
        // minZoom: 8,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        // boxZoom: false,
      });
      mapInstanceRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Force map to update its size
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // Polygon of the service area
      const areaOfServiceMarker = L.polygon(
        [
          [38.4, -122.7], // Santa Rosa
          [38.5, -122.3], // Napa Valley
          [38.4, -122.0], // Vacaville
          [38.2, -121.7], // Rio Vista
          [38.0, -121.6], // Antioch
          [37.9, -121.7], // Brentwood
          [37.7, -121.9], // Dublin/Pleasanton
          [37.5, -121.9], // Fremont
          [37.3, -121.9], // San Jose
          [37.2, -121.8], // South San Jose
          [37.3, -122.0], // Santa Clara
          [37.4, -122.2], // Palo Alto
          [37.6, -122.4], // San Mateo
          [37.8, -122.5], // San Francisco
          [37.9, -122.5], // Sausalito
          [38.1, -122.5], // San Rafael
          [38.3, -122.6], // Petaluma
        ],
        { color: "blue", weight: 2 }
      ).addTo(map);

      // Add a popup to the area of service marker (set to open by default)
      areaOfServiceMarker.bindPopup("<b>Our Area of Service.</b>").openPopup();

      return () => {
        map.remove();
        mapInstanceRef.current = null;
      };
    });
  }, []);

  return (
    <div className="w-full h-full">
      <div
        id="map"
        ref={mapRef}
        aria-label="Map showing our service area"
        role="img"
        className="z-10 w-full h-full min-h-[500px]"
      ></div>
    </div>
  );
}
