import { renderToString } from 'react-dom/server'
import React, { useState } from 'react';

import './OwnLocationMarker.css'

import L from 'leaflet'
import { Marker } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { colors } from './MarkerToggles';

const OwnLocationMarker = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  navigator.geolocation

  var myIcon = L.divIcon({
    className: 'ownLocationMarker',
    iconSize: [20, 20],
    html: renderToString(
      <div>
        <FontAwesomeIcon
          icon={faCircle}
          size='lg'
          style={{
            animation: 'pulseDot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite',
            color: colors.own_location,
            border: '2px solid #FFF',
            borderRadius: '50%',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            position: 'relative',
            zIndex: 20,
          }}
        />
        <FontAwesomeIcon
          icon={faCircle}
          size='3x'
          style={{
            animation: 'pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
            color: colors.own_location,
            position: 'absolute',
            top: -9,
            left: -8,
            zIndex: 10,
          }}
        />
      </div>
    )
  });

  const watch = true;
  const {
    latitude,
    longitude,
    error,
  } = usePosition(watch, {enableHighAccuracy: true});

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setError(null);
        },
        (error) => {
          setError('Error getting user location: ' + error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Marker
      position={[latitude || 0, longitude || 0]}
      icon={myIcon}
    >
    </Marker>
  )
}

export default OwnLocationMarker;
