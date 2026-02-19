import { generateCompatibilityReport } from '@/utils/browserCompatibility';

/**
 * Cross-browser compatibility test runner
 * 
 * This script runs comprehensive browser compatibility tests for the map click behavior system.
 * Execute this in the browser console to verify functionality.
 */

declare const google: any;

export function runBrowserCompatibilityTests() {
  console.log('🧪 Starting browser compatibility tests...');
  
  const report = generateCompatibilityReport();
  
  console.log('📊 Browser Compatibility Report:');
  console.log('=====================================');
  
  // Browser information
  console.log('🌐 Browser Info:');
  console.log(`   Browser: ${report.compatibility.browser.browser} ${report.compatibility.browser.version}`);
  console.log(`   Device: ${report.compatibility.device}`);
  console.log(`   OS: ${report.compatibility.operatingSystem}`);
  
  // Event support
  console.log('\n🎯 Event Support:');
  console.log(`   Pointer Events: ${report.compatibility.eventSupport.pointerEvents ? '✅' : '❌'}`);
  console.log(`   Touch Events: ${report.compatibility.eventSupport.touchEvents ? '✅' : '❌'}`);
  console.log(`   Mouse Events: ${report.compatibility.eventSupport.mouseEvents ? '✅' : '❌'}`);
  console.log(`   Passive Listeners: ${report.compatibility.eventSupport.passiveListeners ? '✅' : '❌'}`);
  console.log(`   Event Constructors: ${report.compatibility.eventSupport.eventConstructors ? '✅' : '❌'}`);
  
  // Google Maps compatibility
  console.log('\n🗺️ Google Maps Compatibility:');
  console.log(`   Maps Loaded: ${report.compatibility.googleMaps.loaded ? '✅' : '❌'}`);
  console.log(`   Geometry Library: ${report.compatibility.googleMaps.geometryLibrary ? '✅' : '❌'}`);
  console.log(`   WebGL Support: ${report.compatibility.googleMaps.webGL ? '✅' : '❌'}`);
  console.log(`   Modern Features: ${report.compatibility.googleMaps.modernFeatures ? '✅' : '❌'}`);
  
  // Performance capabilities
  console.log('\n⚡ Performance Capabilities:');
  console.log(`   High Precision Timer: ${report.compatibility.performance.highPrecisionTimer ? '✅' : '❌'}`);
  console.log(`   Memory Info: ${report.compatibility.performance.memoryInfo ? '✅' : '❌'}`);
  console.log(`   Hardware Concurrency: ${report.compatibility.performance.hardwareConcurrency ? '✅' : '❌'}`);
  console.log(`   Estimated Performance: ${report.compatibility.performance.estimated}`);
  
  // CSS support
  console.log('\n🎨 CSS Support:');
  console.log(`   Cursor Support: ${report.compatibility.css.cursor ? '✅' : '❌'}`);
  console.log(`   Transitions: ${report.compatibility.css.transitions ? '✅' : '❌'}`);
  console.log(`   Transforms: ${report.compatibility.css.transforms ? '✅' : '❌'}`);
  console.log(`   Filters: ${report.compatibility.css.filters ? '✅' : '❌'}`);
  
  // Click behavior tests
  console.log('\n🖱️ Click Behavior Tests:');
  console.log(`   Click Event Support: ${report.clickBehavior.clickEventSupport ? '✅' : '❌'}`);
  console.log(`   Coordinate Validation: ${report.clickBehavior.coordinateValidation ? '✅' : '❌'}`);
  console.log(`   Distance Calculation: ${report.clickBehavior.distanceCalculation ? '✅' : '❌'}`);
  console.log(`   Hover State Management: ${report.clickBehavior.hoverStateManagement ? '✅' : '❌'}`);
  console.log(`   Cursor Transitions: ${report.clickBehavior.cursorTransitions ? '✅' : '❌'}`);
  console.log(`   Error Handling: ${report.clickBehavior.errorHandling ? '✅' : '❌'}`);
  
  // Recommendations
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }
  
  console.log('\n✅ Browser compatibility tests completed!');
  console.log('=====================================');
  
  return report;
}

// Test specific click scenarios
export function testClickScenarios() {
  console.log('🧪 Testing specific click scenarios...');
  
  const scenarios = [
    {
      name: 'Valid coordinate click',
      test: () => {
        const lat = 40.7128;
        const lng = -74.0060;
        const isValid = !isNaN(lat) && !isNaN(lng) && 
                       lat >= -90 && lat <= 90 &&
                       lng >= -180 && lng <= 180;
        console.log(`   Valid NYC coordinates (${lat}, ${lng}): ${isValid ? '✅' : '❌'}`);
        return isValid;
      }
    },
    {
      name: 'Invalid coordinate click',
      test: () => {
        const lat = 91; // Invalid latitude
        const lng = 181; // Invalid longitude
        const isValid = !isNaN(lat) && !isNaN(lng) && 
                       lat >= -90 && lat <= 90 &&
                       lng >= -180 && lng <= 180;
        console.log(`   Invalid coordinates (${lat}, ${lng}): ${!isValid ? '✅' : '❌'}`);
        return !isValid;
      }
    },
    {
      name: 'Distance calculation',
      test: () => {
        if (typeof google !== 'undefined' && google.maps && google.maps.geometry) {
          try {
            const point1 = new google.maps.LatLng(40.7128, -74.0060);
            const point2 = new google.maps.LatLng(40.7138, -74.0070);
            const distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
            const isValid = distance > 0 && distance < 1000; // Should be ~130 meters
            console.log(`   Distance calculation (~130m): ${isValid ? '✅' : '❌'} (${distance.toFixed(1)}m)`);
            return isValid;
          } catch (error) {
            console.log(`   Distance calculation: ❌ Error - ${error.message}`);
            return false;
          }
        } else {
          console.log('   Distance calculation: ⚠️ Google Maps not loaded');
          return null;
        }
      }
    }
  ];
  
  const results = scenarios.map(scenario => ({
    name: scenario.name,
    passed: scenario.test()
  }));
  
  console.log('\n📊 Scenario Test Results:');
  results.forEach(result => {
    const status = result.passed === null ? '⚠️' : (result.passed ? '✅' : '❌');
    console.log(`   ${status} ${result.name}`);
  });
  
  return results;
}

// Performance testing
export function testPerformance() {
  console.log('⚡ Running performance tests...');
  
  // Test click processing speed
  const clickTest = () => {
    const iterations = 1000;
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      // Simulate coordinate validation
      const lat = Math.random() * 180 - 90;
      const lng = Math.random() * 360 - 180;
      const isValid = !isNaN(lat) && !isNaN(lng) && 
                     lat >= -90 && lat <= 90 &&
                     lng >= -180 && lng <= 180;
    }
    
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / iterations;
    
    console.log(`   Click validation speed: ${averageTime.toFixed(3)}ms per click`);
    return averageTime < 0.1; // Should be very fast
  };
  
  // Test memory usage
  const memoryTest = () => {
    if ((performance as any).memory) {
      const initialMemory = (performance as any).memory.usedJSHeapSize;
      
      // Simulate creating many points
      const points = [];
      for (let i = 0; i < 1000; i++) {
        points.push({
          lat: Math.random() * 180 - 90,
          lng: Math.random() * 360 - 180
        });
      }
      
      const finalMemory = (performance as any).memory.usedJSHeapSize;
      const memoryIncrease = (finalMemory - initialMemory) / 1024 / 1024;
      
      console.log(`   Memory usage increase: ${memoryIncrease.toFixed(2)}MB for 1000 points`);
      return memoryIncrease < 10; // Should be reasonable
    } else {
      console.log('   Memory test: ⚠️ Memory API not available');
      return null;
    }
  };
  
  const results = {
    clickSpeed: clickTest(),
    memoryUsage: memoryTest()
  };
  
  console.log('\n📈 Performance Test Results:');
  console.log(`   Click processing: ${results.clickSpeed ? '✅ Fast' : '❌ Slow'}`);
  console.log(`   Memory efficiency: ${results.memoryUsage === null ? '⚠️ N/A' : (results.memoryUsage ? '✅ Efficient' : '❌ High usage')}`);
  
  return results;
}

type ResponsiveAuditOptions = {
  limit?: number;
  thresholdPx?: number;
};

export function runResponsiveAudit(options: ResponsiveAuditOptions = {}) {
  const limit = options.limit ?? 20;
  const thresholdPx = options.thresholdPx ?? 1;

  const viewportWidth = document.documentElement.clientWidth;
  const scrollWidth = document.documentElement.scrollWidth;

  const nodes = Array.from(document.body.querySelectorAll<HTMLElement>('*'));

  const offenders = nodes
    .map((el) => {
      const rect = el.getBoundingClientRect();
      if (!Number.isFinite(rect.width) || !Number.isFinite(rect.height)) return null;
      if (rect.width <= 0 || rect.height <= 0) return null;

      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return null;

      const leftOverflow = Math.max(0, -rect.left);
      const rightOverflow = Math.max(0, rect.right - viewportWidth);
      const overflow = Math.max(leftOverflow, rightOverflow);
      if (overflow <= thresholdPx) return null;

      const id = el.id ? `#${el.id}` : '';
      const classes = el.className && typeof el.className === 'string'
        ? `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}`
        : '';
      const selector = `${el.tagName.toLowerCase()}${id}${classes}`;

      return {
        selector,
        overflow: Math.round(overflow),
        width: Math.round(rect.width),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        position: style.position,
      };
    })
    .filter((v): v is NonNullable<typeof v> => Boolean(v))
    .sort((a, b) => b.overflow - a.overflow)
    .slice(0, limit);

  const report = {
    viewportWidth,
    scrollWidth,
    overflowPx: Math.round(scrollWidth - viewportWidth),
    offenders,
  };

  console.log('📐 Responsive Audit');
  console.table(report.offenders);

  return report;
}

// Export all test functions
export default {
  runBrowserCompatibilityTests,
  testClickScenarios,
  testPerformance,
  runResponsiveAudit
};
