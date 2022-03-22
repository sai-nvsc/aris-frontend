import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { features } from "../../helpers/TaguigAdministraiveGeoJSON";
import "../../assets/Map.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
const MapAnalytics = ({ barangay }) => {
  const [onselect, setOnselect] = useState({});
  const highlightFeature = (e) => {
    var layer = e.target;
    const { ADM4_EN, TOTAL } = e.target.feature.properties;
    setOnselect({
      Barangay: ADM4_EN,
      Total: TOTAL,
    });
    layer.setStyle({
      weight: 1,
      color: "black",
      fillOpacity: 1,
    });
  };

  /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
  const resetHighlight = (e) => {
    setOnselect({});
    e.target.setStyle(style(e.target.feature));
  };
  /* this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
     highlightFeature and resetHighlight*/
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

  const mapPolygonColorToDensity = (density) => {
    return density > 90
      ? "#a50f15" //90-up
      : density > 80
      ? "#de2d26" //80-90
      : density > 60
      ? "#fb6a4a" //61-80
      : density > 40
      ? "#fc9272" //41-60
      : density > 25
      ? "#fcbba1" //26-40
      : "#fee5d9"; //0-25
  };
  const style = (feature) => {
    return {
      fillColor: mapPolygonColorToDensity(feature.properties.TOTAL),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "2",
      fillOpacity: 0.5,
    };
  };
  const mapStyle = {
    height: "55vh",
    width: "85%",
    margin: "0 auto",
  };

  const feature = features.map((feature) => {
    barangay.forEach((bgy) => {
      if (bgy._id === feature.properties.ADM4_EN) {
        return (feature.properties = {
          ...feature.properties,
          TOTAL: bgy.count,
        });
      }
    });
    return feature;
  });
  return (
    <div className="container">
      <div className="header">
        <h2 className="heading">Taguig Total Animal Bite Cases per Barangay</h2>
        <p className="text-muted">
          A choropleth map displaying Taguig total Animal Bite Cases per
          Barangay <br />
        </p>
        <div className="">
          <div className="">
            {!onselect.Barangay && (
              <div className="census-info-hover">
                <strong>Taguig Animal BiteCases</strong>
                <p>Hover on each county for more details</p>
              </div>
            )}
            {onselect.Barangay && (
              <ul className="census-info">
                <li>
                  <strong>{onselect.Barangay}</strong>
                </li>
                <br />
                <li>Total Bite Cases:{onselect.Total}</li>
              </ul>
            )}
            <MapContainer
              center={[14.520445, 121.053886]}
              zoom={12}
              scrollWheelZoom={true}
              style={mapStyle}
            >
              {feature && (
                <GeoJSON
                  data={feature}
                  style={style}
                  onEachFeature={onEachFeature}
                />
              )}
              <TileLayer
                attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapAnalytics;
