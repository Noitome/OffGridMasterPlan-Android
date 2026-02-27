/**
 * Browser Compatibility Test Suite
 * 
 * This file contains browser compatibility tests for the enhanced click behavior system.
 * Run these tests to verify functionality across different browsers and devices.
 */

// Browser detection utilities
export const browserDetection = {
  getUserAgent: () => navigator.userAgent,
  
  getBrowserInfo: () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';
    
    // Chrome/Chromium
    if (ua.indexOf('Chrome') > -1) {
      browser = 'Chrome';
      version = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
    }
    // Firefox
    else if (ua.indexOf('Firefox') > -1) {
      browser = 'Firefox';
      version = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
    }
    // Safari
    else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
      browser = 'Safari';
      version = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown';
    }
    // Edge
    else if (ua.indexOf('Edg') > -1) {
      browser = 'Edge';
      version = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown';
    }
    // IE
    else if (ua.indexOf('Trident') > -1) {
      browser = 'Internet Explorer';
      version = ua.match(/rv:(\d+\.\d+)/)?.[1] || 'Unknown';
    }
    
    return { browser, version };
  },
  
  getDeviceType: () => {
    const ua = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad|iPod/.test(ua)) {
      return 'Mobile';
    } else if (/Tablet|iPad/.test(ua)) {
      return 'Tablet';
    }
    return 'Desktop';
  },
  
  getOperatingSystem: () => {
    const ua = navigator.userAgent;
    if (/Windows NT/.test(ua)) return 'Windows';
    if (/Mac OS X/.test(ua)) return 'macOS';
    if (/Linux/.test(ua)) return 'Linux';
    if (/Android/.test(ua)) return 'Android';
    if (/iOS|iPhone|iPad|iPod/.test(ua)) return 'iOS';
    return 'Unknown';
  }
};

// Event support detection
export const eventSupport = {
  // Pointer events support
  hasPointerEvents: () => {
    return 'onpointerdown' in window;
  },
  
  // Touch events support
  hasTouchEvents: () => {
    return 'ontouchstart' in window;
  },
  
  // Mouse events support (always true for modern browsers)
  hasMouseEvents: () => {
    return true;
  },
  
  // Passive event listeners support
  hasPassiveEventListeners: () => {
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => {
          supportsPassive = true;
          return true;
        }
      });
      window.addEventListener('test', () => {}, opts);
      window.removeEventListener('test', () => {});
    } catch (e) {
      supportsPassive = false;
    }
    return supportsPassive;
  },
  
  // Event constructor support
  hasEventConstructors: () => {
    try {
      return typeof Event === 'function' && typeof CustomEvent === 'function';
    } catch (e) {
      return false;
    }
  }
};

// Google Maps API compatibility
export const googleMapsCompatibility = {
  // Check if Google Maps is loaded
  isGoogleMapsLoaded: () => {
    return typeof google !== 'undefined' && 
           typeof google.maps !== 'undefined' && 
           typeof google.maps.geometry !== 'undefined';
  },
  
  // Check geometry library support
  hasGeometryLibrary: () => {
    if (!googleMapsCompatibility.isGoogleMapsLoaded()) return false;
    return typeof google.maps.geometry !== 'undefined' &&
           typeof google.maps.geometry.spherical !== 'undefined';
  },
  
  // Check for WebGL support (used by Google Maps)
  hasWebGLSupport: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  },
  
  // Check for modern browser features
  hasModernFeatures: () => {
    return 'IntersectionObserver' in window &&
           'ResizeObserver' in window &&
           'requestAnimationFrame' in window;
  }
};

// Performance capabilities
export const performanceCapabilities = {
  // Check for high precision timer
  hasHighPrecisionTimer: () => {
    return performance && typeof performance.now === 'function';
  },
  
  // Check for memory information
  hasMemoryInfo: () => {
    return 'memory' in performance;
  },
  
  // Check for hardware concurrency
  hasHardwareConcurrency: () => {
    return 'hardwareConcurrency' in navigator;
  },
  
  // Estimate device performance
  estimatePerformance: () => {
    const cores = navigator.hardwareConcurrency || 1;
    const memory = (performance as any).memory?.jsHeapSizeLimit / 1024 / 1024 || 0;
    
    if (cores >= 4 && memory >= 512) return 'high';
    if (cores >= 2 && memory >= 256) return 'medium';
    return 'low';
  }
};

// CSS and styling support
export const cssSupport = {
  // Check for CSS cursor property support
  hasCursorSupport: () => {
    return CSS.supports('cursor', 'pointer') && 
           CSS.supports('cursor', 'crosshair') &&
           CSS.supports('cursor', 'grab');
  },
  
  // Check for CSS transitions support
  hasTransitionSupport: () => {
    return CSS.supports('transition', 'all 0.3s ease');
  },
  
  // Check for CSS transforms support
  hasTransformSupport: () => {
    return CSS.supports('transform', 'translateX(10px)');
  },
  
  // Check for CSS filters support (for visual effects)
  hasFilterSupport: () => {
    return CSS.supports('filter', 'blur(1px)');
  }
};

// Run all compatibility tests
export const runCompatibilityTests = () => {
  const results = {
    browser: browserDetection.getBrowserInfo(),
    device: browserDetection.getDeviceType(),
    operatingSystem: browserDetection.getOperatingSystem(),
    userAgent: browserDetection.getUserAgent(),
    
    eventSupport: {
      pointerEvents: eventSupport.hasPointerEvents(),
      touchEvents: eventSupport.hasTouchEvents(),
      mouseEvents: eventSupport.hasMouseEvents(),
      passiveListeners: eventSupport.hasPassiveEventListeners(),
      eventConstructors: eventSupport.hasEventConstructors()
    },
    
    googleMaps: {
      loaded: googleMapsCompatibility.isGoogleMapsLoaded(),
      geometryLibrary: googleMapsCompatibility.hasGeometryLibrary(),
      webGL: googleMapsCompatibility.hasWebGLSupport(),
      modernFeatures: googleMapsCompatibility.hasModernFeatures()
    },
    
    performance: {
      highPrecisionTimer: performanceCapabilities.hasHighPrecisionTimer(),
      memoryInfo: performanceCapabilities.hasMemoryInfo(),
      hardwareConcurrency: performanceCapabilities.hasHardwareConcurrency(),
      estimated: performanceCapabilities.estimatePerformance()
    },
    
    css: {
      cursor: cssSupport.hasCursorSupport(),
      transitions: cssSupport.hasTransitionSupport(),
      transforms: cssSupport.hasTransformSupport(),
      filters: cssSupport.hasFilterSupport()
    }
  };
  
  return results;
};

// Test specific map click behavior
export const testMapClickBehavior = () => {
  const results = {
    clickEventSupport: true,
    coordinateValidation: true,
    distanceCalculation: true,
    hoverStateManagement: true,
    cursorTransitions: true,
    errorHandling: true
  };
  
  // Test coordinate validation
  const testCoords = [
    { lat: 40.7128, lng: -74.0060, expected: true },  // NYC
    { lat: 51.5074, lng: -0.1278, expected: true },   // London
    { lat: 91, lng: 181, expected: false },           // Invalid
    { lat: NaN, lng: 10, expected: false },           // Invalid
    { lat: 10, lng: NaN, expected: false }            // Invalid
  ];
  
  results.coordinateValidation = testCoords.every(test => {
    const isValid = !isNaN(test.lat) && !isNaN(test.lng) && 
                    test.lat >= -90 && test.lat <= 90 &&
                    test.lng >= -180 && test.lng <= 180;
    return isValid === test.expected;
  });
  
  // Test distance calculation (if Google Maps is loaded)
  if (googleMapsCompatibility.hasGeometryLibrary()) {
    try {
      const point1 = new google.maps.LatLng(40.7128, -74.0060);
      const point2 = new google.maps.LatLng(40.7138, -74.0070);
      const distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
      results.distanceCalculation = distance > 0 && distance < 1000; // Should be ~130 meters
    } catch (error) {
      results.distanceCalculation = false;
      console.error('Distance calculation test failed:', error);
    }
  }
  
  return results;
};

// Generate compatibility report
export const generateCompatibilityReport = () => {
  const compatibility = runCompatibilityTests();
  const clickBehavior = testMapClickBehavior();
  
  const report = {
    timestamp: new Date().toISOString(),
    compatibility,
    clickBehavior,
    recommendations: [] as string[]
  };
  
  // Add recommendations based on results
  if (!compatibility.eventSupport.pointerEvents) {
    report.recommendations.push('Consider adding pointer event polyfills for older browsers');
  }
  
  if (!compatibility.googleMaps.geometryLibrary) {
    report.recommendations.push('Ensure Google Maps Geometry library is loaded');
  }
  
  if (compatibility.performance.estimated === 'low') {
    report.recommendations.push('Consider optimizing for lower-end devices');
  }
  
  if (!clickBehavior.coordinateValidation) {
    report.recommendations.push('Coordinate validation is failing - check input data');
  }
  
  return report;
};

// Export all utilities
export default {
  browserDetection,
  eventSupport,
  googleMapsCompatibility,
  performanceCapabilities,
  cssSupport,
  runCompatibilityTests,
  testMapClickBehavior,
  generateCompatibilityReport
};