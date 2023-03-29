import React from "react";
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const StationsOnMap = ({ stations, setShowModal, setSelectedStation }) => {
  return (
    <MapContainer center={[60.209857, 24.938379]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />;

      {/* Markers for the stations */}
      {stations.map(station => (
        <Marker 
          key={station.id} 
          position={ station.location }
          eventHandlers={{ click: () => {setSelectedStation(station.station); setShowModal(true); }}}
        />
      ))};
  </MapContainer>
  )
}

StationsOnMap.propTypes = {
  stations: PropTypes.array,
  setSelectedStation: PropTypes.func,
  setShowModal: PropTypes.func,
}

export default StationsOnMap