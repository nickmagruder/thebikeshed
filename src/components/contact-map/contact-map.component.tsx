import { FC, useRef, useEffect, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

// Import the mapbox styles and component styles
import 'mapbox-gl/dist/mapbox-gl.css';
import './contact-map.styles.scss';

// ContactMap: Interactive map component using Mapbox GL
// Displays a map with coordinates and zoom level info
// Provides a reset button to return to initial position
const ContactMap: FC = () => {
  // Reference to the Mapbox instance
  const mapRef = useRef<mapboxgl.Map | null>(null);
  // Reference to the container DOM element
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Default map coordinates (Seattle area) - memoized to prevent recreation
  const INITIAL_CENTER = useMemo<[number, number]>(() => [-122.3493, 47.6205], []);
  // Default zoom level - no need to memoize primitive values, but doing so for consistency
  const INITIAL_ZOOM = useMemo(() => 10.12, []);

  // State to track current map center coordinates - initialized with memoized values
  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  // State to track current map zoom level - initialized with memoized value
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  // Handler for reset button - returns map to initial position
  const handleButtonClick = () => {
    mapRef.current?.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  // Initialize map on component mount - runs only once
  useEffect(() => {
    // Get Mapbox access token from environment variables
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

    // Initialize map if container is available
    if (mapContainerRef.current) {
      // Create the map with initial values
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11', // Dark theme map style
        center: INITIAL_CENTER, // Use constant instead of state
        zoom: INITIAL_ZOOM, // Use constant instead of state
      });
    }

    // Add move event listener to update coordinates and zoom in state
    if (mapRef.current) {
      mapRef.current.on('move', () => {
        // Get current center coordinates and zoom level from the map
        const mapCenter = mapRef.current!.getCenter();
        const mapZoom = mapRef.current!.getZoom();

        // Update state with new values
        setCenter([mapCenter.lng, mapCenter.lat]);
        setZoom(mapZoom);
      });
    }

    // Cleanup function to remove map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [INITIAL_CENTER, INITIAL_ZOOM]); // Added constants to satisfy ESLint

  return (
    <div className="contact-map">
      {/* Display current coordinates and zoom level */}
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
        Zoom: {zoom.toFixed(2)}
      </div>
      {/* Reset button to return to initial position */}
      <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button>
      {/* Map container element */}
      <div id="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default ContactMap;
