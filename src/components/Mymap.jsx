import React,{useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap,ZoomControl } from "react-leaflet";

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};
function Ma(props) {
  return (<MapContainer
    center={props.mapCenter}
    zoom={13}
    scrollWheelZoom={true}
    ZoomControl={false}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <ZoomControl position="bottomright"/>
    <Marker position={props.mapCenter}>
      <Popup>
        Here is, Your Love
      </Popup>
    </Marker>
    <RecenterAutomatically lat={props.mapCenter[0]} lng={props.mapCenter[1]} />
  </MapContainer>
  );
}
export default Ma;
