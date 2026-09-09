import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

function LocationMap({ latitude, longitude }) {
  return (
    <div className="location-map">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            You are here.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LocationMap;