import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class MapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[MapErrorBoundary] Caught error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service if available
    if ((window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <Card className="w-full h-[500px] flex items-center justify-center">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Map Loading Error
            </CardTitle>
            <CardDescription>
              Something went wrong while loading the map. This might be due to:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm text-gray-600">
              <ul className="list-disc list-inside space-y-1">
                <li>Network connectivity issues</li>
                <li>Google Maps API key problems</li>
                <li>Browser compatibility issues</li>
                <li>Invalid location data</li>
              </ul>
            </div>
            
            {this.state.error && (
              <details className="mt-4 p-3 bg-gray-50 rounded-lg">
                <summary className="cursor-pointer text-sm font-medium text-gray-700">
                  Technical Details
                </summary>
                <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-32">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            
            <div className="flex gap-2 mt-4">
              <Button onClick={this.handleReset} variant="default">
                Try Again
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                Reload Page
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              If the problem persists, please check your internet connection or contact support.
            </p>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default MapErrorBoundary;