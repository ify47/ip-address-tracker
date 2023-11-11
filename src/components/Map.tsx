import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";

type PositionTypes = {
  lat: number;
  lng: number;
};

function ChangeMapView({ coords }: { coords: PositionTypes }) {
  const map = useMap();
  map.flyTo(coords, map.getZoom()); // the MapContainer is immutable, so we use the useMap prop to change the values as it is treated as mutable
  return null;
}

export const Map = () => {
  const { data, loading } = useAppSelector((state) => state.geoData);
  const [position, setPosition] = useState<PositionTypes>({
    lat: 40.6679,
    lng: -73.9432,
  });

  useEffect(() => {
    if (!loading && data) {
      setPosition({ lat: data.location.lat, lng: data.location.lng });
    }
  }, [loading, data]);

  return (
    <MapContainer
      style={{ position: "absolute" }}
      center={position}
      zoom={16}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?"
      />
      <Marker position={position}></Marker>
      <ChangeMapView coords={position} />
    </MapContainer>
  );
};
