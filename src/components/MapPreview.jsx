// src/components/MapPreview.jsx
import React, { useEffect, useRef } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapPreview = ({ origin, destination }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 7,
        center: { lat: 20.5937, lng: 78.9629 }, // Default center (India)
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin,
          destination,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    };

    document.body.appendChild(script);
  }, [origin, destination]);

  return <div ref={mapRef} className="w-full h-64 rounded border mt-4" />;
};

export default MapPreview;
