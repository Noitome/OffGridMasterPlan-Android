import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, Polygon } from '@react-google-maps/api';
import { Loader2, Eraser, Ruler, RotateCcw, Check, MousePointer2, AlertCircle, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MapsAPIErrorHandler } from './MapsAPIErrorHandler';
import { MAP_LIBRARIES } from '@/config/maps';

interface UnifiedMeasurementMapProps {
  center: { lat: number; lng: number };
  mode: 'distance' | 'area';
  onMeasurementComplete?: (value: number) => void;
  initialZoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

type Unit = 'metric' | 'imperial';

// RELAXED: Minimum distance reduced to 0.05 meters (5cm)
const MIN_DISTANCE_METERS = 0.05;

export function UnifiedMeasurementMap({ center, mode, onMeasurementComplete, initialZoom = 19 }: UnifiedMeasurementMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_SOLAR_API_KEY || '',
    libraries: MAP_LIBRARIES
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [points, setPoints] = useState<google.maps.LatLngLiteral[]>([]);
  const [measurement, setMeasurement] = useState<{ distance: number; area: number }>({ distance: 0, area: 0 });
  const [unit, setUnit] = useState<Unit>('metric');
  const [isClosed, setIsClosed] = useState(false);
  const [cursorPos, setCursorPos] = useState<google.maps.LatLngLiteral | null>(null);
  const [hoveringMarker, setHoveringMarker] = useState(false);
  
  // Refs for performance tracking
  const clickCountRef = useRef<number>(0);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    map.setMapTypeId('hybrid');
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Update calculations whenever points change
  useEffect(() => {
    if (!window.google) return;

    let dist = 0;
    let area = 0;

    try {
      // Calculate Distance (Perimeter)
      if (points.length > 1) {
        for (let i = 0; i < points.length - 1; i++) {
          dist += google.maps.geometry.spherical.computeDistanceBetween(points[i], points[i+1]);
        }
        // If closed, add the last segment
        if (isClosed && points.length > 2) {
          dist += google.maps.geometry.spherical.computeDistanceBetween(points[points.length - 1], points[0]);
        }
      }

      // Calculate Area
      if (points.length > 2) {
        // Create a closed path for area calculation
        const path = points.map(p => new google.maps.LatLng(p));
        area = google.maps.geometry.spherical.computeArea(path);
      }
    } catch (error) {
      console.error('[UnifiedMeasurementMap] Calculation error:', error);
    }

    setMeasurement({ distance: dist, area });

    // Callback with relevant value based on mode
    if (onMeasurementComplete) {
      if (mode === 'area') {
        onMeasurementComplete(Math.round(area));
      } else {
        onMeasurementComplete(Math.round(dist));
      }
    }
  }, [points, isClosed, mode, onMeasurementComplete]);

  // Check if a point is too close to ANY existing point
  const isTooCloseToExisting = (newPoint: google.maps.LatLngLiteral, existingPoints: google.maps.LatLngLiteral[]) => {
    if (existingPoints.length === 0) return { tooClose: false };

    try {
      for (let i = 0; i < existingPoints.length; i++) {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(existingPoints[i]),
          new google.maps.LatLng(newPoint)
        );
        
        if (distance < MIN_DISTANCE_METERS) {
          return { tooClose: true, distance, index: i };
        }
      }
    } catch (error) {
      console.error('[UnifiedMeasurementMap] Distance calculation error:', error);
    }
    
    return { tooClose: false };
  };

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    clickCountRef.current++;
    
    if (!e.latLng) {
      console.warn('[UnifiedMeasurementMap] Click event missing latLng data');
      return;
    }
    
    // If we already closed the shape, block adding points
    if (isClosed) {
      console.log('[UnifiedMeasurementMap] Click blocked - shape is closed');
      toast.info('Shape is already closed. Clear to start a new measurement.');
      return;
    }

    // Validate coordinates
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.error('[UnifiedMeasurementMap] Invalid coordinates:', { lat, lng });
      toast.error('Invalid location coordinates detected');
      return;
    }

    const newPoint = { lat, lng };
    
    // Check distance against ALL points
    const check = isTooCloseToExisting(newPoint, points);
    
    if (check.tooClose) {
      console.log(`[UnifiedMeasurementMap] Click rejected: Too close to point ${check.index} (${check.distance?.toFixed(3)}m)`);
      if (check.distance && check.distance > 0.01) {
        toast.info(`Point too close to existing marker. Try clicking further away.`);
      }
      return;
    }

    console.log('[UnifiedMeasurementMap] Adding new point:', newPoint);
    
    setPoints(prev => [...prev, newPoint]);
    console.log('[UnifiedMeasurementMap] Point added successfully. Total points:', points.length + 1);
  }, [mode, isClosed, points]);

  const handleCloseShape = useCallback(() => {
    if (points.length < 3) {
      toast.error("Need at least 3 points to close a shape.");
      return;
    }
    setIsClosed(true);
  }, [points]);

  const handleReset = useCallback(() => {
    setPoints([]);
    setIsClosed(false);
    setMeasurement({ distance: 0, area: 0 });
    if (onMeasurementComplete) onMeasurementComplete(0);
  }, [onMeasurementComplete]);

  const handleUndo = useCallback(() => {
    if (isClosed) {
      setIsClosed(false);
    } else {
      setPoints(prev => prev.slice(0, -1));
    }
  }, [isClosed]);

  const handleMouseMove = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng && !isClosed) {
      setCursorPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    } else {
      setCursorPos(null);
    }
  }, [isClosed]);

  // Formatters
  const formatDist = (m: number) => {
    if (unit === 'metric') {
      return m > 1000 ? `${(m/1000).toFixed(2)} km` : `${Math.round(m)} m`;
    } else {
      const ft = m * 3.28084;
      return ft > 5280 ? `${(ft/5280).toFixed(2)} mi` : `${Math.round(ft)} ft`;
    }
  };

  const formatArea = (sqm: number) => {
    if (unit === 'metric') {
      return sqm > 10000 ? `${(sqm/10000).toFixed(2)} ha` : `${Math.round(sqm)} m²`;
    } else {
      const sqft = sqm * 10.7639;
      return sqft > 43560 ? `${(sqft/43560).toFixed(2)} ac` : `${Math.round(sqft)} sq ft`;
    }
  };

  // Re-center if prop changes
  useEffect(() => {
    if (map) {
      map.panTo(center);
    }
  }, [center.lat, center.lng, map]);

  const handleRecenter = useCallback(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(initialZoom);
    }
  }, [map, center, initialZoom]);

  // Handle API loading errors
  if (loadError) {
    return (
      <MapsAPIErrorHandler>
        <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Map Loading Error</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Unable to load Google Maps. Please check your connection.
            </p>
            <Button onClick={() => window.location.reload()} size="sm">
              Retry
            </Button>
          </div>
        </div>
      </MapsAPIErrorHandler>
    );
  }

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

  // Ghost line (rubber banding)
  const ghostPath = (!isClosed && points.length > 0 && cursorPos) 
    ? [points[points.length - 1], cursorPos] 
    : [];

  // Determine cursor style
  const getCursor = () => {
    if (isClosed) return 'default';
    return 'crosshair'; // Strictly crosshair during drawing
  };

  return (
    <MapsAPIErrorHandler>
      <Card className="overflow-hidden border-2">
        <CardContent className="p-0 relative">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={initialZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
            onMouseMove={handleMouseMove}
            mapTypeId="hybrid"
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
              tilt: 0,
              draggableCursor: getCursor(),
              clickableIcons: false,
              disableDoubleClickZoom: !isClosed, 
              gestureHandling: 'greedy',
            }}
          >
            {/* Render Points (Markers) */}
            {points.map((point, index) => (
              <Marker
                key={index}
                position={point}
                draggable={isClosed} // Only draggable when closed
                clickable={isClosed} // Only clickable when closed
                onMouseOver={() => setHoveringMarker(true)}
                onMouseOut={() => setHoveringMarker(false)}
                onDragEnd={(e) => {
                  if (e.latLng) {
                    const newPoints = [...points];
                    newPoints[index] = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                    setPoints(newPoints);
                  }
                }}
                label={{
                  text: (index + 1).toString(),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  className: 'map-marker-label'
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: index === 0 ? '#16a34a' : '#2563eb', // Green start, Blue others
                  fillOpacity: 1,
                  strokeColor: 'white',
                  strokeWeight: 2,
                  scale: 8
                }}
              />
            ))}

            {/* Render Lines (Polyline) - Always visible */}
            <Polyline
              path={isClosed ? [...points, points[0]] : points}
              options={{
                strokeColor: mode === 'area' && isClosed ? '#16a34a' : '#2563eb',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                clickable: false
              }}
            />

            {/* Render Polygon Fill - Only if Area mode and enough points */}
            {(mode === 'area' && points.length > 2) && (
              <Polygon
                paths={points}
                options={{
                  fillColor: '#22c55e',
                  fillOpacity: isClosed ? 0.35 : 0.15, // Lighter if open
                  strokeWeight: 0, // Stroke handled by Polyline
                  clickable: false
                }}
              />
            )}

            {/* Ghost Line (Rubber banding) */}
            {ghostPath.length > 0 && (
              <Polyline
                path={ghostPath}
                options={{
                  strokeColor: '#94a3b8', // Gray
                  strokeOpacity: 0.6,
                  strokeWeight: 2,
                  clickable: false,
                  icons: [{
                    icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2 },
                    offset: '0',
                    repeat: '10px'
                  }]
                }}
              />
            )}

          </GoogleMap>

          {/* UI Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
            
            {/* Stats Panel */}
            <div className="bg-white/95 dark:bg-black/85 backdrop-blur p-4 rounded-xl shadow-xl pointer-events-auto border border-gray-200 dark:border-gray-700 min-w-[240px]">
               <div className="flex items-center justify-between gap-4 mb-3">
                 <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                   {mode === 'area' ? 'Area Measurement' : 'Distance'}
                 </div>
                 <Select value={unit} onValueChange={(v) => setUnit(v as Unit)}>
                    <SelectTrigger className="h-6 w-[90px] text-xs bg-transparent border-gray-300 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric</SelectItem>
                      <SelectItem value="imperial">Imperial</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               
               <div className="flex flex-col gap-1">
                 {mode === 'area' ? (
                   <>
                     <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                       {formatArea(measurement.area)}
                     </div>
                     <div className="text-xs text-gray-500 flex justify-between">
                       <span>Perimeter: {formatDist(measurement.distance)}</span>
                     </div>
                   </>
                 ) : (
                   <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                     {formatDist(measurement.distance)}
                   </div>
                 )}
               </div>

               {points.length > 0 && (
                 <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                   <Badge variant="secondary" className="text-xs font-normal">
                     {points.length} Point{points.length !== 1 ? 's' : ''}
                   </Badge>
                   {!isClosed && mode === 'area' && points.length > 2 && (
                     <Button 
                       size="sm" 
                       className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
                       onClick={handleCloseShape}
                     >
                       <Check className="h-3 w-3 mr-1" />
                       Close Shape
                     </Button>
                   )}
                 </div>
               )}
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2 pointer-events-auto">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleRecenter}
                className="shadow-lg bg-white dark:bg-gray-800"
                title="Recenter Map"
              >
                <Target className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={handleUndo}
                disabled={points.length === 0}
                className="shadow-lg bg-white dark:bg-gray-800"
                title="Undo last point"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleReset}
                disabled={points.length === 0}
                className="shadow-lg"
              >
                <Eraser className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
          
          {/* Instruction Overlay */}
          {points.length === 0 && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/75 text-white px-5 py-2.5 rounded-full text-sm pointer-events-none backdrop-blur-md shadow-lg z-10 flex items-center border border-white/20">
              <MousePointer2 className="h-4 w-4 inline mr-2 animate-pulse" />
              Click map to start {mode === 'area' ? 'tracing area' : 'measuring'}
            </div>
          )}
          
        </CardContent>
      </Card>
    </MapsAPIErrorHandler>
  );
}
