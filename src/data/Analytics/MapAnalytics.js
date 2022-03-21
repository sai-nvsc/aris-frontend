import React from "react";
import "leaflet/dist/leaflet.css";
import { features } from "../../helpers/TaguigAdministraiveGeoJSON";
const MapAnalytics = ({ barangay }) => {
  const feature = features.map((feature) => {
    feature.properties = { ...feature.properties, TOTAL: 5 };
  });
  return <div>MapAnalytics</div>;
};

export default MapAnalytics;
