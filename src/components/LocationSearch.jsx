// src/components/LocationSearch.jsx
import React, { useEffect, useRef } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const LocationSearch = ({ value, onChange, placeholder, enableCurrentLocation }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
      } else {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      if (inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          onChange(place.formatted_address || inputRef.current.value);
        });
      }
    };

    loadGoogleMaps();
  }, [onChange]);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json();
        if (data?.results?.[0]) {
          onChange(data.results[0].formatted_address);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg"
      />
      {enableCurrentLocation && (
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-500 underline"
        >
          Use current location
        </button>
      )}
    </div>
  );
};

export default LocationSearch;
