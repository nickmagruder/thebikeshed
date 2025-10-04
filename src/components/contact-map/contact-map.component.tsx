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

  // State for directions functionality
  const [startAddress, setStartAddress] = useState('');
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);

  // Handler for getting directions
  const handleGetDirections = async () => {
    if (!startAddress.trim() || !mapRef.current) return;

    setIsLoadingDirections(true);

    try {
      // Geocode the start address
      const geocodeResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          startAddress
        )}.json?access_token=${mapboxgl.accessToken}&limit=1`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.features && geocodeData.features.length > 0) {
        const startCoords = geocodeData.features[0].center;
        const endCoords = [-122.349121, 47.620506]; // 400 Broad St coordinates

        // Get directions
        const directionsResponse = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/cycling/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const directionsData = await directionsResponse.json();

        if (directionsData.routes && directionsData.routes.length > 0) {
          const route = directionsData.routes[0];

          // Remove existing route if any
          if (mapRef.current.getSource('route')) {
            mapRef.current.removeLayer('route');
            mapRef.current.removeSource('route');
          }

          // Add the route to the map
          mapRef.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route.geometry
            }
          });

          mapRef.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#2c5aa0',
              'line-width': 4
            }
          });

          // Fit the map to show the entire route
          const coordinates = route.geometry.coordinates;
          const bounds = coordinates.reduce(
            (bounds: mapboxgl.LngLatBounds, coord: [number, number]) => {
              return bounds.extend(coord);
            },
            new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
          );

          mapRef.current.fitBounds(bounds, {
            padding: 50
          });
        }
      }
    } catch (error) {
      console.error('Error getting directions:', error);
    } finally {
      setIsLoadingDirections(false);
    }
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
        {/* Directions input panel */}
        <div className="directions-panel">
          <div className="directions-input">
            <input
              type="text"
              placeholder="Enter starting address..."
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGetDirections()}
              disabled={isLoadingDirections}
            />
            <button
              onClick={handleGetDirections}
              disabled={!startAddress.trim() || isLoadingDirections}
              className="directions-button"
            >
              {isLoadingDirections ? 'Loading...' : 'Get Directions'}
            </button>
          </div>
        </div>
        {/* Map container element */}
        <div id="map-container" ref={mapContainerRef} />
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
