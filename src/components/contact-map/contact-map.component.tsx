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

  // Default map coordinates (400 Broad St, Seattle) - memoized to prevent recreation
  const INITIAL_CENTER = useMemo<[number, number]>(
    () => [-122.349121, 47.620506],
    []
  );
  // Default zoom level - no need to memoize primitive values, but doing so for consistency
  const INITIAL_ZOOM = useMemo(() => 15, []);

  // State to track current map center coordinates - initialized with memoized values
  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  // State to track current map zoom level - initialized with memoized value
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  // Initialize map on component mount - runs only once
  useEffect(() => {
    // Get Mapbox access token from environment variables
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

    // Initialize map if container is available
    if (mapContainerRef.current) {
      // Create the map with initial values
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v12', // Outdoors style shows cycling routes and trails
        center: INITIAL_CENTER, // Use constant instead of state
        zoom: INITIAL_ZOOM // Use constant instead of state
      });

      // Add zoom controls to the map
      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add marker for 400 Broad St when map loads
      mapRef.current.on('load', () => {
        if (mapRef.current) {
          // Create a custom pinpoint marker element
          const markerElement = document.createElement('div');
          markerElement.innerHTML = `
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20C24 5.373 18.627 0 12 0zm0 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" fill="#2c5aa0"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `;
          markerElement.style.cursor = 'pointer';
          markerElement.style.width = '24px';
          markerElement.style.height = '32px';

          // Add marker at 400 Broad St coordinates (approximately)
          new mapboxgl.Marker(markerElement)
            .setLngLat([-122.349121, 47.620506]) // Coordinates for 400 Broad St, Seattle
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                '<div style="font-family: \'Open Sans Condensed\', sans-serif; color: #333;"><strong>The Bike Shed</strong><br>400 Broad St<br>Seattle, WA 98109</div>'
              )
            )
            .addTo(mapRef.current);
        }
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
      <div className="map-wrapper">
        {/* Map container element */}
        <div id="map-container" ref={mapContainerRef} />
        {/* Display current coordinates - using the center state */}
        <div className="map-coordinates">
          Longitude: {center[0].toFixed(4)}, Latitude: {center[1].toFixed(4)},
          Zoom: {zoom.toFixed(2)}
        </div>
      </div>
      {/* Address and phone information sidebar */}
      <div className="info-sidebar">
        <div className="address">
          <h3>Address</h3>
          <p>
            <a
              href="https://maps.google.com/maps?q=400+Broad+St,+Seattle,+WA+98109"
              target="_blank"
              rel="noopener noreferrer"
            >
              400 Broad St
              <br />
              Seattle, WA 98109
            </a>
          </p>
        </div>
        <div className="phone">
          <h3>Phone</h3>
          <p>
            <a href="tel:206-555-2453">206-555-BIKE</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
