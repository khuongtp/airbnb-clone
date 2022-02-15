import { getCenter } from "geolib";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ searchResults }) => {
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));
  const center = getCenter(coordinates);
  const [viewState, setViewState] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <ReactMapGL
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox15222/ckznzjees003a14to5mgujnho"
      {...viewState}
      style={{ width: "100%", height: "100%" }}
      onMove={(e) => setViewState(e.viewState)}
    >
      {searchResults.map((result, index) => (
        <div key={index}>
          <Marker longitude={result.long} latitude={result.lat}>
            <p
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
              role="img"
              onClick={() => setSelectedLocation(result)}
            >
              📌
            </p>
          </Marker>
        </div>
      ))}
      {selectedLocation.long && (
        <Popup
          longitude={selectedLocation.long}
          latitude={selectedLocation.lat}
          onClose={() => setSelectedLocation({})}
          closeOnClick={false}
        >
          {selectedLocation.title}
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
