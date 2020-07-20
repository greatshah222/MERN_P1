import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

function Map(props) {
  const { center, zoom } = props;
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',

      center: center,
      // center: [-74.5, 40],

      zoom: zoom,
    });
    new mapboxgl.Marker().setLngLat(center).addTo(map);
  }, [zoom, center]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}

export default Map;
