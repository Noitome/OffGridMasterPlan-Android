import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';
import { Loader2, Eraser, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AreaSelectorMapProps {
  center: { lat: number; lng: number };
  onAreaCalculated: (areaMeters: number) => void;
  initialZoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

const libraries: ("drawing" | "geometry" | "places")[] = ["drawing", "geometry", "places"];

export function AreaSelectorMap({ center, onAreaCalculated, initialZoom = 19 }: AreaSelectorMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_SOLAR_API_KEY || '',
    libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  // State to control drawing mode explicitly
  const [drawingMode, setDrawingMode] = useState<google.maps.drawing.OverlayType | null>(null);
  const [polygon, setPolygon] = useState<google.maps.Polygon | null>(null);
  const [area, setArea] = useState<number>(0);
  
  const polygonRef = useRef<google.maps.Polygon | null>(null);

  // Initialize drawing mode when API is ready
  useEffect(() => {
    if (isLoaded && !drawingMode && !polygon) {
       // Only set to polygon if we don't have a polygon yet
       setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
  }, [isLoaded, polygon]);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  // Clear existing polygon
  const clearSelection = useCallback(() => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    setPolygon(null);
    setArea(0);
    onAreaCalculated(0);
    
    // Reset drawing mode to polygon
    setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  }, [onAreaCalculated]);

  const onPolygonComplete = useCallback((poly: google.maps.Polygon) => {
    // If there was an existing polygon, remove it
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }

    polygonRef.current = poly;
    setPolygon(poly);

    // Turn off drawing mode
    setDrawingMode(null);

    // Calculate area
    const areaMeters = google.maps.geometry.spherical.computeArea(poly.getPath());
    setArea(Math.round(areaMeters));
    onAreaCalculated(Math.round(areaMeters));

    // Add listeners for editing
    poly.setEditable(true);
    poly.setDraggable(true);

    // Re-calculate on edit
    ['set_at', 'insert_at', 'remove_at'].forEach(event => {
      poly.getPath().addListener(event, () => {
        const newArea = google.maps.geometry.spherical.computeArea(poly.getPath());
        setArea(Math.round(newArea));
        onAreaCalculated(Math.round(newArea));
      });
    });
    
  }, [onAreaCalculated]);

  useEffect(() => {
    if (map) {
      // Any map updates
      map.panTo(center);
    }
  }, [center, map]);

  if (!isLoaded) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-gray-500">Loading Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border-2">
      <CardContent className="p-0 relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={initialZoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapTypeId="hybrid"
          options={{
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_LEFT
            },
            streetViewControl: false,
            fullscreenControl: true,
            tilt: 0 // Avoid 45deg imagery which makes drawing hard
          }}
        >
          <DrawingManager
            onPolygonComplete={onPolygonComplete}
            drawingMode={drawingMode}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  google.maps.drawing.OverlayType.POLYGON,
                ],
              },
              polygonOptions: {
                fillColor: "#22c55e", // Green
                fillOpacity: 0.4,
                strokeWeight: 2,
                strokeColor: "#15803d",
                editable: true,
                draggable: true,
                zIndex: 1,
              },
            }}
          />
        </GoogleMap>

        {/* Overlay Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
          <div className="bg-white/90 dark:bg-black/80 backdrop-blur p-3 rounded-lg shadow-lg pointer-events-auto border border-gray-200 dark:border-gray-700">
             <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Selected Area</div>
             <div className="text-2xl font-bold text-green-600 dark:text-green-400">
               {area.toLocaleString()} <span className="text-sm font-normal text-gray-500">m²</span>
             </div>
             {area > 0 && (
               <div className="text-xs text-gray-500 mt-1">
                 ~{(area * 10.764).toLocaleString()} sq ft
               </div>
             )}
          </div>

          <div className="flex gap-2 pointer-events-auto">
            {area > 0 && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={clearSelection}
                className="shadow-lg"
              >
                <Eraser className="h-4 w-4 mr-2" />
                Clear Selection
              </Button>
            )}
          </div>
        </div>
        
        {/* Instruction Overlay (if no area) */}
        {area === 0 && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm pointer-events-none backdrop-blur-sm z-10">
            <MousePointer2 className="h-4 w-4 inline mr-2" />
            Click points on the map to trace your area
          </div>
        )}

      </CardContent>
    </Card>
  );
}
