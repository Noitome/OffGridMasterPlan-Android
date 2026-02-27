import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, Polygon } from '@react-google-maps/api';
import { Loader2, Eraser, RotateCcw, Check, MousePointer2, Droplets, Sun, Sprout, AlertCircle, Edit3, Target, Unlock, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { MapsAPIErrorHandler } from './MapsAPIErrorHandler';
import { MAP_LIBRARIES } from '@/config/maps';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MultiLayerMapProps {
  center: { lat: number; lng: number };
  activeLayer: 'water' | 'solar' | 'food';
  onAreaUpdate: (layer: 'water' | 'solar' | 'food', area: number) => void;
  onGeometryUpdate?: (layer: 'water' | 'solar' | 'food', polygons: { id: string; area: number; points: { lat: number; lng: number }[] }[]) => void;
  waterMaterialKey?: string;
  initialZoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

type Unit = 'metric' | 'imperial';

interface PolygonData {
  id: string;
  points: google.maps.LatLngLiteral[];
  isClosed: boolean;
  area: number;
  materialKey?: string;
}

interface LayerData {
  polygons: PolygonData[];
}

const LAYER_CONFIG = {
  water: {
    color: '#3b82f6', // Blue-500
    fillColor: '#60a5fa', // Blue-400
    label: 'Water Capture',
    icon: Droplets
  },
  solar: {
    color: '#eab308', // Yellow-500
    fillColor: '#facc15', // Yellow-400
    label: 'Solar Capture',
    icon: Sun
  },
  food: {
    color: '#22c55e', // Green-500
    fillColor: '#4ade80', // Green-400
    label: 'Food Production',
    icon: Sprout
  }
};

const MIN_DISTANCE_METERS = 0.05;

const WATER_MATERIAL_COLORS: Record<string, { stroke: string; fill: string }> = {
  impermeable_0_95: { stroke: '#1d4ed8', fill: '#2563eb' },
  hard_0_9: { stroke: '#1e40af', fill: '#3b82f6' },
  paved_0_85: { stroke: '#1e3a8a', fill: '#60a5fa' },
  compacted_0_5: { stroke: '#0ea5e9', fill: '#93c5fd' },
  vegetation_0_2: { stroke: '#38bdf8', fill: '#bfdbfe' },
};

export function MultiLayerMap({ center, activeLayer, onAreaUpdate, onGeometryUpdate, waterMaterialKey, initialZoom = 19 }: MultiLayerMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_SOLAR_API_KEY || '',
    libraries: MAP_LIBRARIES
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Store data for all layers independently
  const [layers, setLayers] = useState<Record<'water' | 'solar' | 'food', LayerData>>({
    water: { polygons: [] },
    solar: { polygons: [] },
    food: { polygons: [] }
  });

  const [unit, setUnit] = useState<Unit>('metric');
  const [cursorPos, setCursorPos] = useState<google.maps.LatLngLiteral | null>(null);
  const [hoveringMarker, setHoveringMarker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPolygonId, setSelectedPolygonId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const clickCountRef = useRef<number>(0);
  const previousActiveLayerRef = useRef<'water' | 'solar' | 'food'>(activeLayer);
  const polygonRefs = useRef<Record<string, google.maps.Polygon | null>>({});

  const lastGeometryHashRef = useRef<Record<'water' | 'solar' | 'food', string>>({
    water: '',
    solar: '',
    food: '',
  });

  useEffect(() => {
    if (previousActiveLayerRef.current === activeLayer) return;
    previousActiveLayerRef.current = activeLayer;
    setEditMode(false);
    setCursorPos(null);
    setHoveringMarker(false);
    setSelectedPolygonId(null);
  }, [activeLayer]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    map.setMapTypeId('hybrid');
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Helper to get active polygon (last one if open, or undefined)
  const getActivePolygonIndex = (layerKey: 'water' | 'solar' | 'food') => {
    const polys = layers[layerKey].polygons;
    if (polys.length === 0) return -1;
    const lastIndex = polys.length - 1;
    if (!polys[lastIndex].isClosed) return lastIndex;
    return -1;
  };

  // Update calculations whenever points change for the active layer
  useEffect(() => {
    if (!window.google) return;

    const currentPolygons = layers[activeLayer].polygons;
    let totalArea = 0;
    let updated = false;

    const newPolygons = currentPolygons.map(poly => {
      let area = poly.area;
      if (poly.points.length > 2) {
        try {
          const path = poly.points.map(p => new google.maps.LatLng(p));
          const calculatedArea = google.maps.geometry.spherical.computeArea(path);
          if (Math.round(calculatedArea) !== Math.round(poly.area)) {
            area = calculatedArea;
            updated = true;
          }
        } catch (error) {
          console.error('[MultiLayerMap] Area calculation error:', error);
        }
      }
      totalArea += area;
      return { ...poly, area };
    });

    if (updated) {
      setLayers(prev => ({
        ...prev,
        [activeLayer]: { polygons: newPolygons }
      }));
    }
    
    // Always notify parent of total area
    // Use a ref or check if total changed to avoid loop, but onAreaUpdate should be stable
    // We can just call it if updated OR if we just want to ensure sync
    // But be careful of infinite loops if onAreaUpdate triggers a re-render that resets something
    // The previous logic checked for area change. Let's keep that.
    
    // Calculate previous total to compare?
    // Actually, we can just rely on 'updated' flag for internal state update, 
    // and call onAreaUpdate. 
    // BUT onAreaUpdate might be called too often.
    // Let's optimize: only call if totalArea changed significantly?
    // Or just rely on the parent to handle it efficiently.
    // Let's store the last emitted area in a ref to avoid redundant calls.
  }, [layers, activeLayer]); // Depend on 'layers' (deep) might be heavy. 
  // Better: Depend on layers[activeLayer].polygons.
  
  // Ref to track total area to prevent loops
  const lastTotalAreaRef = useRef<number>(0);

  const activeLayerPolygons = layers[activeLayer].polygons;

  useEffect(() => {
    if (!window.google) return;
    const total = activeLayerPolygons.reduce((sum, p) => sum + p.area, 0);

    if (Math.round(total) !== Math.round(lastTotalAreaRef.current)) {
      lastTotalAreaRef.current = total;
      onAreaUpdate(activeLayer, Math.round(total));
    }
  }, [activeLayer, activeLayerPolygons, onAreaUpdate]);

  useEffect(() => {
    if (!onGeometryUpdate) return;

    const payload = activeLayerPolygons
      .filter((poly) => poly.isClosed && poly.points.length > 2)
      .map((poly) => ({
        id: poly.id,
        area: Math.round(poly.area * 10) / 10,
        points: poly.points.map((pt) => ({
          lat: Math.round(pt.lat * 1e6) / 1e6,
          lng: Math.round(pt.lng * 1e6) / 1e6,
        })),
        materialKey: poly.materialKey,
      }));

    const hash = JSON.stringify(payload);
    if (hash === lastGeometryHashRef.current[activeLayer]) return;
    lastGeometryHashRef.current[activeLayer] = hash;
    onGeometryUpdate(activeLayer, payload as unknown as { id: string; area: number; points: { lat: number; lng: number }[] }[]);
  }, [activeLayer, activeLayerPolygons, onGeometryUpdate]);


  const handlePolygonClick = useCallback((e: google.maps.PolyMouseEvent, polyId: string) => {
    e.stop();
    setSelectedPolygonId(prev => prev === polyId ? null : polyId);
  }, []);

  const handleDeleteClick = useCallback(() => {
    if (selectedPolygonId) {
      setShowDeleteDialog(true);
      return;
    }
    
    const polys = layers[activeLayer].polygons;
    const closedPolys = polys.filter(p => p.isClosed);
    
    if (closedPolys.length === 1) {
      setSelectedPolygonId(closedPolys[0].id);
      setShowDeleteDialog(true);
      return;
    }
    
    if (closedPolys.length > 1) {
      toast.info("Please select an area on the map to delete.");
      return;
    }
  }, [selectedPolygonId, activeLayer, layers]);

  const confirmDelete = useCallback(() => {
    if (!selectedPolygonId) return;
    
    setLayers(prev => {
      const newPolys = prev[activeLayer].polygons.filter(p => p.id !== selectedPolygonId);
      return {
        ...prev,
        [activeLayer]: { polygons: newPolys }
      };
    });
    
    setShowDeleteDialog(false);
    setSelectedPolygonId(null);
    toast.success("Area successfully deleted");
  }, [activeLayer, selectedPolygonId]);

  // Handle polygon edits (drag points or whole shape)
  const handlePolygonEdit = useCallback((key: string, polyIndex: number) => {
    const polyId = layers[key as 'water' | 'solar' | 'food'].polygons[polyIndex].id;
    const polyRef = polygonRefs.current[`${key}-${polyId}`];
    if (!polyRef) return;

    const path = polyRef.getPath();
    const newPoints: google.maps.LatLngLiteral[] = [];
    for (let i = 0; i < path.getLength(); i++) {
      const p = path.getAt(i);
      newPoints.push({ lat: p.lat(), lng: p.lng() });
    }

    setLayers(prev => {
      const layerKey = key as 'water' | 'solar' | 'food';
      const newPolygons = [...prev[layerKey].polygons];
      const currentPoints = newPolygons[polyIndex].points;

      if (currentPoints.length === newPoints.length && 
          currentPoints.every((p, i) => p.lat === newPoints[i].lat && p.lng === newPoints[i].lng)) {
        return prev;
      }

      newPolygons[polyIndex] = { ...newPolygons[polyIndex], points: newPoints };
      
      // Recalc area immediately for this polygon
      if (window.google && newPoints.length > 2) {
         const pathObj = newPoints.map(p => new google.maps.LatLng(p));
         newPolygons[polyIndex].area = google.maps.geometry.spherical.computeArea(pathObj);
      }

      return {
        ...prev,
        [layerKey]: { polygons: newPolygons }
      };
    });
  }, [layers]);

  const onPolygonLoad = useCallback((poly: google.maps.Polygon, key: string, id: string, index: number) => {
    const refKey = `${key}-${id}`;
    polygonRefs.current[refKey] = poly;
    
    const path = poly.getPath();
    const triggerUpdate = () => handlePolygonEdit(key, index);
    
    google.maps.event.addListener(path, 'set_at', triggerUpdate);
    google.maps.event.addListener(path, 'insert_at', triggerUpdate);
    google.maps.event.addListener(path, 'remove_at', triggerUpdate);
  }, [handlePolygonEdit]);

  const onPolygonUnmount = useCallback((key: string, id: string) => {
    polygonRefs.current[`${key}-${id}`] = null;
  }, []);

  // Check if a point is too close to ANY existing point in the ACTIVE polygon
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
      console.error('[MultiLayerMap] Distance calculation error:', error);
    }
    
    return { tooClose: false };
  };

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    clickCountRef.current++;
    
    if (!e.latLng) {
      return;
    }
    
    // Determine active polygon (create new if needed, or append to open one)
    let activePolyIndex = getActivePolygonIndex(activeLayer);
    
    // If edit mode is on, we don't add points via map click (unless we specifically allow adding to open shape?)
    // Actually edit mode usually means dragging existing points.
    if (editMode) {
      return;
    }

    if (selectedPolygonId) {
      setSelectedPolygonId(null);
      return;
    }

    // If no active polygon (all closed or empty), we start a new one automatically?
    // Or we require user to click "Add Area"?
    // User requested "Next capture area button".
    // So if all are closed, we do NOTHING until they click Add.
    // EXCEPT for the very first one.
    
    if (activePolyIndex === -1) {
      if (layers[activeLayer].polygons.length === 0) {
        // Auto-start first one
        activePolyIndex = 0;
        setLayers(prev => ({
          ...prev,
          [activeLayer]: { polygons: [{ id: Date.now().toString(), points: [], isClosed: false, area: 0, materialKey: activeLayer === 'water' ? (waterMaterialKey ?? 'hard_0_9') : undefined }] }
        }));
        // We need to wait for state update? No, we can't sync add point immediately if we just set state.
        // We should add the point IN the same state update.
      } else {
        // All closed. Do nothing. Wait for "Add Area" button.
        toast.info("Click 'Add New Area' to draw another shape.");
        return;
      }
    }

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    if (isNaN(lat) || isNaN(lng)) {
      return;
    }

    const newPoint = { lat, lng };
    
    // Check constraint against the active polygon's points
    // We need to access the LATEST state. 'layers' dependency is good.
    // If we just created it (case above), points are empty, so no check needed.
    // But we need to handle the state update carefully.
    
    setLayers(prev => {
      const currentPolys = prev[activeLayer].polygons;
      let targetIndex = getActivePolygonIndex(activeLayer);
      
      // If we are auto-starting the first one
      if (targetIndex === -1 && currentPolys.length === 0) {
        return {
          ...prev,
          [activeLayer]: {
            polygons: [{ 
              id: Date.now().toString(), 
              points: [newPoint], 
              isClosed: false, 
              area: 0 
            }]
          }
        };
      }
      
      // If still -1 (all closed), ignore (handled by early return, but safe check here)
      if (targetIndex === -1) return prev;

      const targetPoly = currentPolys[targetIndex];
      const check = isTooCloseToExisting(newPoint, targetPoly.points);
      
      if (check.tooClose) {
        if (check.distance && check.distance > 0.01) {
          toast.info(`Point too close to existing marker. Try clicking further away.`);
        }
        return prev;
      }

      const newPolys = [...currentPolys];
      newPolys[targetIndex] = {
        ...targetPoly,
        points: [...targetPoly.points, newPoint]
      };

      return {
        ...prev,
        [activeLayer]: { polygons: newPolys }
      };
    });
    
  }, [activeLayer, layers, editMode, selectedPolygonId]);

  const handleAddArea = useCallback(() => {
    if (getActivePolygonIndex(activeLayer) !== -1) {
      toast.error("Finish the current shape first.");
      return;
    }
    
    setLayers(prev => ({
      ...prev,
      [activeLayer]: {
        polygons: [
          ...prev[activeLayer].polygons,
          { id: Date.now().toString(), points: [], isClosed: false, area: 0, materialKey: activeLayer === 'water' ? (waterMaterialKey ?? 'hard_0_9') : undefined }
        ]
      }
    }));
    setEditMode(false);
  }, [activeLayer, layers, waterMaterialKey]);

  const handleCloseShape = useCallback(() => {
    const index = getActivePolygonIndex(activeLayer);
    if (index === -1) return;

    if (layers[activeLayer].polygons[index].points.length < 3) {
      toast.error("Need at least 3 points to close a shape.");
      return;
    }
    
    setLayers(prev => {
      const newPolys = [...prev[activeLayer].polygons];
      newPolys[index] = { ...newPolys[index], isClosed: true };
      return {
        ...prev,
        [activeLayer]: { polygons: newPolys }
      };
    });
    setEditMode(true);
  }, [activeLayer, layers]);

  const handleReset = useCallback(() => {
    setLayers(prev => ({
      ...prev,
      [activeLayer]: { polygons: [] }
    }));
    onAreaUpdate(activeLayer, 0);
    setEditMode(false);
  }, [activeLayer, onAreaUpdate]);

  const handleUndo = useCallback(() => {
    const index = getActivePolygonIndex(activeLayer);
    
    // If no active open polygon, maybe we want to unclose the last closed one?
    // Or just delete the last polygon if it's empty?
    
    setLayers(prev => {
      const polys = [...prev[activeLayer].polygons];
      
      // If we have an active open polygon
      if (index !== -1) {
        const p = polys[index];
        if (p.points.length > 0) {
          // Remove last point
          polys[index] = { ...p, points: p.points.slice(0, -1) };
        } else {
          // Remove empty polygon entirely
          polys.splice(index, 1);
        }
      } else {
        // No open polygon. Check if we have any closed ones to "Reopen"?
        // Or just do nothing?
        // User might expect "Undo" to re-open the last shape.
        const lastIndex = polys.length - 1;
        if (lastIndex >= 0 && polys[lastIndex].isClosed) {
           polys[lastIndex] = { ...polys[lastIndex], isClosed: false };
           // Also exit edit mode?
           setEditMode(false); // Can't be in edit mode if we are drawing
        }
      }
      
      return {
        ...prev,
        [activeLayer]: { polygons: polys }
      };
    });
    
    if (editMode) setEditMode(false);
  }, [activeLayer, layers, editMode]);

  const handleMouseMove = useCallback((e: google.maps.MapMouseEvent) => {
    const index = getActivePolygonIndex(activeLayer);
    if (e.latLng && index !== -1 && !editMode) {
      setCursorPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    } else {
      setCursorPos(null);
    }
  }, [activeLayer, layers, editMode]);

  const handleRecenter = useCallback(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(initialZoom);
    }
  }, [map, center, initialZoom]);

  const toggleEditMode = () => {
    if (layers[activeLayer].polygons.length === 0) return;
    setEditMode((prev) => !prev);
  };

  const formatArea = (sqm: number) => {
    if (unit === 'metric') {
      return sqm > 10000 ? `${(sqm/10000).toFixed(2)} ha` : `${Math.round(sqm)} m²`;
    } else {
      const sqft = sqm * 10.7639;
      return sqft > 43560 ? `${(sqft/43560).toFixed(2)} ac` : `${Math.round(sqft)} sq ft`;
    }
  };

  useEffect(() => {
    if (map) {
      map.panTo(center);
    }
  }, [center.lat, center.lng, map]);

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

  // Defensive check for activeLayer
  if (!layers[activeLayer]) {
    console.error(`[MultiLayerMap] Invalid activeLayer: ${activeLayer}`);
    return null;
  }

  const activePolygons = layers[activeLayer].polygons;
  const activePolyIndex = getActivePolygonIndex(activeLayer);
  const isClosed = activePolyIndex === -1 && activePolygons.length > 0 && activePolygons.every(p => p.isClosed);
  const drawingPoly = activePolyIndex !== -1 ? activePolygons[activePolyIndex] : null;
  
  const ghostPath = (drawingPoly && !editMode && drawingPoly.points.length > 0 && cursorPos) 
    ? [drawingPoly.points[drawingPoly.points.length - 1], cursorPos] 
    : [];

  const getCursor = () => {
    if (editMode) return 'default';
    // If we have an active open polygon, crosshair.
    if (activePolyIndex !== -1) return 'crosshair';
    // If all closed, default (until Add Area clicked)
    return 'default';
  };

  // Calculate total area for active layer
  const totalActiveArea = layers[activeLayer].polygons.reduce((sum, p) => sum + p.area, 0);
  const activePolyCount = layers[activeLayer].polygons.length;
  
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
              disableDoubleClickZoom: !editMode, 
              gestureHandling: 'greedy',
            }}
          >
            {(Object.keys(layers) as Array<keyof typeof layers>).map((layerKey) => {
              const layerData = layers[layerKey];
              const config = LAYER_CONFIG[layerKey];
              const isActiveLayer = layerKey === activeLayer;
              
              // We render all polygons for all layers? 
              // Usually we might want to hide non-active layers to reduce clutter, 
              // or show them with lower opacity.
              // The previous code showed all but styled differently.
              
              return layerData.polygons.map((poly, index) => {
                const isActivePoly = isActiveLayer && !poly.isClosed;
                const isSelected = selectedPolygonId === poly.id;

                const opacity = isActiveLayer ? 1 : 0.4;
                let strokeColor = config.color;
                let strokeWeight = isActiveLayer ? 3 : 2;
                let fillOpacity = poly.isClosed ? (isActiveLayer ? 0.4 : 0.2) : 0.1;

                if (layerKey === 'water' && poly.materialKey && WATER_MATERIAL_COLORS[poly.materialKey]) {
                  strokeColor = WATER_MATERIAL_COLORS[poly.materialKey].stroke;
                }
                
                if (isSelected) {
                   strokeWeight = 4;
                   fillOpacity = 0.6;
                   strokeColor = '#ef4444';
                }
                
                return (
                  <React.Fragment key={`${layerKey}-${poly.id}`}>
                    {/* Points - Only show when drawing or open. In edit mode, native handles take over. */}
                    {isActiveLayer && !poly.isClosed && poly.points.map((point, ptIndex) => (
                      <Marker
                        key={`${layerKey}-${poly.id}-${ptIndex}`}
                        position={point}
                        draggable={editMode}
                        clickable={editMode} 
                        onMouseOver={() => setHoveringMarker(true)}
                        onMouseOut={() => setHoveringMarker(false)}
                        onDragEnd={(e) => {
                          // This is for points during drawing? 
                          // Or dragging points in manual mode (if implemented).
                          // Currently editMode uses Polygon editable=true, so Markers aren't needed for closed shapes.
                          // But for open shapes, we might want to drag points.
                          // The previous logic handled it. Let's keep it but update state update.
                          if (e.latLng) {
                            setLayers(prev => {
                              const newPolys = [...prev[layerKey].polygons];
                              const newPts = [...newPolys[index].points];
                              newPts[ptIndex] = { lat: e.latLng!.lat(), lng: e.latLng!.lng() };
                              newPolys[index] = { ...newPolys[index], points: newPts };
                              return { ...prev, [layerKey]: { polygons: newPolys } };
                            });
                          }
                        }}
                        label={{
                          text: (ptIndex + 1).toString(),
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          className: 'map-marker-label'
                        }}
                        icon={{
                          path: google.maps.SymbolPath.CIRCLE,
                          fillColor: ptIndex === 0 ? '#ffffff' : config.color,
                          fillOpacity: 1,
                          strokeColor: config.color,
                          strokeWeight: 2,
                          scale: 7
                        }}
                      />
                    ))}

                    <Polyline
                      path={poly.isClosed ? [...poly.points, poly.points[0]] : poly.points}
                      options={{
                        strokeColor: strokeColor,
                        strokeOpacity: opacity,
                        strokeWeight: strokeWeight,
                        zIndex: isSelected ? 20 : (isActiveLayer ? 10 : 1),
                        clickable: false
                      }}
                    />

                    {poly.points.length > 2 && (
                      <Polygon
                        paths={poly.points}
                        onLoad={(p) => onPolygonLoad(p, layerKey, poly.id, index)}
                        onUnmount={() => onPolygonUnmount(layerKey, poly.id)}
                        onMouseUp={() => handlePolygonEdit(layerKey, index)}
                        onDragEnd={() => handlePolygonEdit(layerKey, index)}
                        onClick={(e) => handlePolygonClick(e, poly.id)}
                        options={{
                          fillColor: isSelected
                            ? '#ef4444'
                            : (layerKey === 'water' && poly.materialKey && WATER_MATERIAL_COLORS[poly.materialKey]
                                ? WATER_MATERIAL_COLORS[poly.materialKey].fill
                                : config.fillColor),
                          fillOpacity: fillOpacity,
                          strokeWeight: 0,
                          clickable: isActiveLayer && poly.isClosed,
                          zIndex: isSelected ? 19 : (isActiveLayer ? 9 : 0),
                          editable: isActiveLayer && editMode && poly.isClosed && !isSelected,
                          draggable: isActiveLayer && editMode && poly.isClosed && !isSelected
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              });
            })}

            {ghostPath.length > 0 && (
              <Polyline
                path={ghostPath}
                options={{
                  strokeColor: '#fff',
                  strokeOpacity: 0.8,
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

          <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
            <div className="bg-white/95 dark:bg-black/85 backdrop-blur p-4 rounded-xl shadow-xl pointer-events-auto border border-gray-200 dark:border-gray-700 min-w-[280px]">
               <div className="flex items-center justify-between gap-4 mb-3">
                 <div className="flex items-center gap-2">
                   {React.createElement(LAYER_CONFIG[activeLayer].icon, { 
                     className: "h-4 w-4", 
                     style: { color: LAYER_CONFIG[activeLayer].color } 
                   })}
                   <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                     {LAYER_CONFIG[activeLayer].label}
                   </div>
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
                 <div className="text-3xl font-bold" style={{ color: LAYER_CONFIG[activeLayer].color }}>
                   {formatArea(totalActiveArea)}
                 </div>
                 
                 <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex gap-3 text-[10px] text-gray-500">
                   {(Object.keys(layers) as Array<keyof typeof layers>).map(key => {
                     if (key === activeLayer) return null;
                     const total = layers[key].polygons.reduce((sum, p) => sum + p.area, 0);
                     return (
                       <div key={key} className="flex items-center gap-1">
                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LAYER_CONFIG[key].color }} />
                         <span>{Math.round(total)} m²</span>
                       </div>
                     );
                   })}
                 </div>
               </div>

               {activePolyCount > 0 && (
                 <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                   <div className="flex gap-2">
                     <Badge variant="secondary" className="text-xs font-normal">
                       {activePolyCount} Area{activePolyCount !== 1 ? 's' : ''}
                     </Badge>
                     {editMode && (
                        <Badge variant="outline" className="text-xs font-normal border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20">
                          Editing
                        </Badge>
                     )}
                   </div>
                   
                  <div className="flex flex-col items-center gap-2">
                    {activePolyIndex !== -1 && layers[activeLayer].polygons[activePolyIndex].points.length > 2 ? (
                      <Button 
                        size="sm" 
                        className="h-7 text-xs text-white"
                        style={{ backgroundColor: LAYER_CONFIG[activeLayer].color }}
                        onClick={handleCloseShape}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Close Shape
                      </Button>
                    ) : activePolyIndex === -1 ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={handleAddArea}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add New Area
                      </Button>
                    ) : null}

                    {activePolyIndex === -1 && activePolygons.some((p) => p.isClosed) && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={handleDeleteClick}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete Area</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
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

              {/* Show Edit only if we have at least one closed polygon */}
              {activePolygons.some(p => p.isClosed) && (
                <Button 
                  variant={editMode ? "default" : "secondary"}
                  size="sm" 
                  onClick={toggleEditMode}
                  className={`shadow-lg transition-all ${editMode ? 'bg-green-600 hover:bg-green-700 text-white ring-2 ring-green-600 ring-offset-2 font-bold scale-105' : ''}`}
                >
                  {editMode ? <Check className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                  {editMode ? 'Done Editing' : 'Edit Areas'}
                </Button>
              )}
              
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={handleUndo}
                disabled={activePolyIndex === -1 && activePolygons.every(p => p.isClosed)}
                className="shadow-lg bg-white dark:bg-gray-800"
                title="Undo last point"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleReset}
                disabled={activePolygons.length === 0}
                className="shadow-lg"
              >
                <Eraser className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
          
          {!isClosed && !editMode && activePolyIndex === -1 && activePolygons.length === 0 && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/75 text-white px-5 py-2.5 rounded-full text-sm pointer-events-none backdrop-blur-md shadow-lg z-10 flex items-center border border-white/20">
              <MousePointer2 className="h-4 w-4 inline mr-2 animate-pulse" />
              Click map to draw {LAYER_CONFIG[activeLayer].label} area
            </div>
          )}

        </CardContent>
      </Card>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this area?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MapsAPIErrorHandler>
  );
}
