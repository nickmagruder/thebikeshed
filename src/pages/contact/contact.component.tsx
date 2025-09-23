import { FC } from 'react';
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './contact.styles.scss';

const Contact: FC = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const INITIAL_CENTER: [number, number] = [-122.3493, 47.6205];
  const INITIAL_ZOOM = 10.12;

  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const handleButtonClick = () => {
    mapRef.current?.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: center,
        zoom: zoom,
      });
    }

    if (mapRef.current) {
      mapRef.current.on('move', () => {
        // get the current center coordinates and zoom level from the map
        const mapCenter = mapRef.current!.getCenter();
        const mapZoom = mapRef.current!.getZoom();

        // update state
        setCenter([mapCenter.lng, mapCenter.lat]);
        setZoom(mapZoom);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="contact-page">
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
        Zoom: {zoom.toFixed(2)}
      </div>
      <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button>
      <div id="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Contact;
