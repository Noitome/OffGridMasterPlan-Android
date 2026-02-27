import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { Loader2, Eraser, MousePointer2, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DistanceMeasurementMapProps {
  center: { lat: number; lng: number };
  initialZoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

const libraries: ("drawing" | "geometry" | "places")[] = ["drawing", "geometry", "places"];

type Unit = 'meters' | 'kilometers' | 'feet' | 'miles';

export function DistanceMeasurementMap({ center, initialZoom = 19 }: DistanceMeasurementMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_SOLAR_API_KEY || '',
    libraries
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [points, setPoints] = useState<google.maps.LatLngLiteral[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [unit, setUnit] = useState<Unit>('meters');
  
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPoint = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setPoints(prev => [...prev, newPoint]);
    }
  }, []);

  // Calculate total distance whenever points change
  useEffect(() => {
    if (points.length < 2) {
      setTotalDistance(0);
      return;
    }

    let distance = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const from = new google.maps.LatLng(points[i]);
      const to = new google.maps.LatLng(points[i + 1]);
      distance += google.maps.geometry.spherical.computeDistanceBetween(from, to);
    }
    setTotalDistance(distance);
  }, [points]);

  const clearMeasurements = useCallback(() => {
    setPoints([]);
    setTotalDistance(0);
  }, []);

  const formatDistance = (meters: number, unit: Unit): string => {
    switch (unit) {
      case 'kilometers':
        return `${(meters / 1000).toFixed(2)} km`;
      case 'feet':
        return `${(meters * 3.28084).toFixed(2)} ft`;
      case 'miles':
        return `${(meters * 0.000621371).toFixed(2)} mi`;
      case 'meters':
      default:
        return `${meters.toFixed(2)} m`;
    }
  };

  useEffect(() => {
    if (map) {
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
          onClick={handleMapClick}
          mapTypeId="hybrid"
          options={{
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_LEFT
            },
            streetViewControl: false,
            fullscreenControl: true,
            tilt: 0,
            draggableCursor: 'crosshair' // Visual feedback for click readiness
          }}
        >
          {/* Render Points */}
          {points.map((point, index) => (
            <Marker
              key={index}
              position={point}
              label={{
                text: (index + 1).toString(),
                color: 'white',
                fontWeight: 'bold'
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#2563eb', // Blue
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2,
                scale: 10
              }}
            />
          ))}

          {/* Render Connecting Lines */}
          <Polyline
            path={points}
            options={{
              strokeColor: '#2563eb', // Blue
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true // Follow curvature of earth
            }}
          />
        </GoogleMap>

        {/* Measurement Panel */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
          <div className="bg-white/90 dark:bg-black/80 backdrop-blur p-3 rounded-lg shadow-lg pointer-events-auto border border-gray-200 dark:border-gray-700 flex flex-col gap-2 min-w-[200px]">
             <div className="flex items-center justify-between gap-4">
               <div className="text-xs font-semibold text-gray-500 uppercase">Total Distance</div>
               <Select value={unit} onValueChange={(v) => setUnit(v as Unit)}>
                  <SelectTrigger className="h-6 w-[100px] text-xs">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="kilometers">Kilometers</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="miles">Miles</SelectItem>
                  </SelectContent>
               </Select>
             </div>
             
             <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
               {formatDistance(totalDistance, unit)}
             </div>
             
             {points.length > 0 && (
               <div className="text-xs text-gray-500">
                 {points.length} point{points.length !== 1 ? 's' : ''} selected
               </div>
             )}
          </div>

          <div className="flex gap-2 pointer-events-auto">
            {points.length > 0 && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={clearMeasurements}
                className="shadow-lg"
              >
                <Eraser className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
        
        {/* Instruction Overlay (if no points) */}
        {points.length === 0 && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm pointer-events-none backdrop-blur-sm z-10 flex items-center">
            <Ruler className="h-4 w-4 inline mr-2" />
            Click map to measure distance
          </div>
        )}

      </CardContent>
    </Card>
  );
}
