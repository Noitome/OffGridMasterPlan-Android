# Interactive Resource Mapping: Verification & Testing Strategy

## 1. Analysis of Previous Implementation
*   **Water Selection:** Previously utilized a robust pattern (likely `DrawingManager` or similar in `AreaSelectorMap`) that allowed precise polygon drawing, vertex editing, and accurate area calculation.
*   **Solar/Food Selection:** utilized a custom-built "Click-to-Add-Point" system in `MultiLayerMap`.
    *   **Issues:** Lacked native vertex editing (drag to move points), required manual "Undo" buttons, and felt less responsive than the native Google Maps drawing tools.
    *   **Inconsistency:** Users experienced a different interaction model when switching between layers or compared to the expected standard.

## 2. Refactoring Summary
We have unified the logic in `MultiLayerMap.tsx` to use the **Google Maps DrawingManager** for ALL resource layers (`water`, `solar`, `food`).

*   **Consistent Event Handling:** All layers now use the `onPolygonComplete` event from `DrawingManager`.
*   **Identical Mapping Algorithms:** All layers use `google.maps.geometry.spherical.computeArea` on the generated paths.
*   **Unified UI/UX:** 
    *   **Drawing:** Click-and-drag or Click-click polygon creation (native Google Maps behavior).
    *   **Editing:** Once drawn, shapes are immediately editable (drag vertices, add midpoints) for all resource types.
    *   **Styling:** Unique colors (`Blue` for Water, `Yellow` for Solar, `Green` for Food) are applied via a configuration object, but the underlying render component (`<Polygon>`) is identical.

## 3. Verification Procedures

### A. Selection Accuracy
1.  **Test:** Draw a square of known size (e.g., using a reference landmark).
2.  **Verify:** The `Selected Area` readout should match the expected value within <1% margin of error.
3.  **Cross-Layer Check:** Draw the exact same shape on "Solar" and "Food" layers.
    *   *Pass Condition:* Area calculations must be identical for identical paths.

### B. Interactive Behavior Parity
1.  **Water Layer:**
    *   Select "Water". Draw a polygon.
    *   Drag a vertex. Verify area updates in real-time (or on mouse up).
    *   Click "Clear Water Capture". Verify shape disappears.
2.  **Solar Layer:**
    *   Select "Solar". Interaction must be *identical* to Water.
    *   Verify the polygon is Yellow/Orange.
3.  **Food Layer:**
    *   Select "Food". Interaction must be *identical* to Water.
    *   Verify the polygon is Green.

### C. Performance Consistency
1.  **Rapid Switching:** Draw shapes on all 3 layers. Switch tabs rapidly.
    *   *Pass Condition:* No flickering, state loss, or lag.
2.  **Editing:** Drag vertices on a complex polygon (10+ points).
    *   *Pass Condition:* Area updates smoothly without UI blocking.

## 4. Automated Testing Notes
The refactored component relies on `DrawingManager` which is an internal Google Maps class. Unit testing this requires extensive mocking of the Google Maps global object.
*   **Logic Tests:** Verify `updateLayerArea` correctly computes area from a list of LatLngs.
*   **Integration Tests:** Ensure `onAreaUpdate` prop is called with the correct `layer` and `value`.

## 5. Visual Identifiers
*   **Water:** 💧 Blue Fill (`#60a5fa`) / Blue Stroke
*   **Solar:** ☀️ Yellow Fill (`#facc15`) / Yellow Stroke
*   **Food:** 🌱 Green Fill (`#4ade80`) / Green Stroke

This implementation ensures a reliable, "Gold Standard" experience across the entire application.
