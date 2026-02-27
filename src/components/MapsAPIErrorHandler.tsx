import React, { useState, useEffect } from 'react';
import { AlertCircle, WifiOff, Key, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MapsAPIErrorHandlerProps {
  children: React.ReactNode;
  onRetry?: () => void;
}

interface APIErrorState {
  hasError: boolean;
  errorType: 'network' | 'api_key' | 'quota' | 'unknown';
  errorMessage: string;
  retryCount: number;
  lastRetry: number;
}

export function MapsAPIErrorHandler({ children, onRetry }: MapsAPIErrorHandlerProps) {
  const [errorState, setErrorState] = useState<APIErrorState>({
    hasError: false,
    errorType: 'unknown',
    errorMessage: '',
    retryCount: 0,
    lastRetry: 0
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'valid' | 'invalid' | 'missing'>('checking');

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    const handleApiError = (event: any) => {
      if (event?.error?.message?.includes('google') || event?.filename?.includes('maps')) {
        analyzeError(event);
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    window.addEventListener('error', handleApiError);

    checkAPIKeyValidity();

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      window.removeEventListener('error', handleApiError);
    };
  }, []);

  const analyzeError = (error: any) => {
    const errorMessage = error?.message || error?.error?.message || 'Unknown error';
    const url = error?.filename || '';
    
    let errorType: APIErrorState['errorType'] = 'unknown';
    
    if (!isOnline) {
      errorType = 'network';
    } else if (errorMessage.includes('ApiNotActivatedMapError') || errorMessage.includes('InvalidKeyMapError')) {
      errorType = 'api_key';
    } else if (errorMessage.includes('QuotaExceeded') || errorMessage.includes('OVER_QUERY_LIMIT')) {
      errorType = 'quota';
    } else if (url.includes('maps.googleapis.com') && errorMessage.includes('ERR_ABORTED')) {
      errorType = 'network';
    }

    setErrorState(prev => ({
      ...prev,
      hasError: true,
      errorType,
      errorMessage
    }));

    console.error('[MapsAPIErrorHandler] API Error detected:', {
      type: errorType,
      message: errorMessage,
      url,
      timestamp: new Date().toISOString()
    });
  };

  const checkAPIKeyValidity = async () => {
    const apiKey = import.meta.env.VITE_GOOGLE_SOLAR_API_KEY;
    
    if (!apiKey) {
      setApiKeyStatus('missing');
      setErrorState(prev => ({
        ...prev,
        hasError: true,
        errorType: 'api_key',
        errorMessage: 'Google Maps API key is not configured'
      }));
      return;
    }

    // Simple API key format validation
    if (apiKey.length < 30 || !apiKey.startsWith('AIza')) {
      setApiKeyStatus('invalid');
      setErrorState(prev => ({
        ...prev,
        hasError: true,
        errorType: 'api_key',
        errorMessage: 'Google Maps API key format appears invalid'
      }));
      return;
    }

    setApiKeyStatus('valid');
  };

  const handleRetry = async () => {
    const now = Date.now();
    const timeSinceLastRetry = now - errorState.lastRetry;
    
    // Prevent rapid retry attempts
    if (timeSinceLastRetry < 2000) {
      console.warn('[MapsAPIErrorHandler] Retry too soon, waiting...');
      return;
    }

    setErrorState(prev => ({
      ...prev,
      retryCount: prev.retryCount + 1,
      lastRetry: now
    }));

    console.log('[MapsAPIErrorHandler] Attempting retry:', errorState.retryCount + 1);

    // Clear the error state temporarily
    setErrorState(prev => ({
      ...prev,
      hasError: false
    }));

    // Force reload of Google Maps
    if (window.google?.maps) {
      delete (window as any).google;
    }

    // Wait a moment then trigger retry
    setTimeout(() => {
      if (onRetry) {
        onRetry();
      } else {
        window.location.reload();
      }
    }, 1000);
  };

  const getErrorDetails = () => {
    switch (errorState.errorType) {
      case 'network':
        return {
          title: 'Network Connection Issue',
          description: 'Unable to connect to Google Maps servers. Please check your internet connection.',
          icon: <WifiOff className="h-6 w-6 text-blue-600" />,
          action: 'Check Connection'
        };
      case 'api_key':
        return {
          title: 'API Key Issue',
          description: 'There\'s a problem with the Google Maps API key configuration.',
          icon: <Key className="h-6 w-6 text-red-600" />,
          action: 'Fix API Key'
        };
      case 'quota':
        return {
          title: 'API Quota Exceeded',
          description: 'Google Maps API usage quota has been exceeded. Please try again later.',
          icon: <AlertCircle className="h-6 w-6 text-yellow-600" />,
          action: 'Wait & Retry'
        };
      default:
        return {
          title: 'Maps Loading Error',
          description: 'An unexpected error occurred while loading Google Maps.',
          icon: <AlertCircle className="h-6 w-6 text-gray-600" />,
          action: 'Retry'
        };
    }
  };

  if (!errorState.hasError) {
    return <>{children}</>;
  }

  const errorDetails = getErrorDetails();

  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {errorDetails.icon}
          </div>
          <CardTitle className="text-xl">{errorDetails.title}</CardTitle>
          <CardDescription className="mt-2">
            {errorDetails.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Error Type Badge */}
          <div className="flex justify-center">
            <Badge 
              variant="outline" 
              className={
                errorState.errorType === 'network' ? 'border-blue-200 text-blue-700' :
                errorState.errorType === 'api_key' ? 'border-red-200 text-red-700' :
                errorState.errorType === 'quota' ? 'border-yellow-200 text-yellow-700' :
                'border-gray-200 text-gray-700'
              }
            >
              {errorState.errorType.toUpperCase()}
            </Badge>
          </div>

          {/* Technical Details */}
          {errorState.errorMessage && (
            <details className="text-sm">
              <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                Technical Details
              </summary>
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs font-mono">
                {errorState.errorMessage}
              </div>
            </details>
          )}

          {/* API Key Status */}
          {errorState.errorType === 'api_key' && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
              <p className="font-medium text-yellow-800 dark:text-yellow-300">API Key Status:</p>
              <p className="text-yellow-700 dark:text-yellow-400">
                {apiKeyStatus === 'missing' && 'No API key found in environment variables'}
                {apiKeyStatus === 'invalid' && 'API key format appears invalid'}
                {apiKeyStatus === 'valid' && 'API key format is valid, but may have usage restrictions'}
                {apiKeyStatus === 'checking' && 'Checking API key...'}
              </p>
            </div>
          )}

          {/* Network Status */}
          {errorState.errorType === 'network' && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-300">Network Status:</p>
              <p className="text-blue-700 dark:text-blue-400">
                {isOnline ? '✅ Connected to internet' : '❌ No internet connection'}
              </p>
            </div>
          )}

          {/* Retry Information */}
          {errorState.retryCount > 0 && (
            <div className="text-center text-sm text-gray-500">
              Retry attempt {errorState.retryCount}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleRetry}
              className="flex-1"
              disabled={errorState.retryCount > 3}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {errorDetails.action}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/?debug=map'}
              className="flex-1"
            >
              Debug Mode
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>If the problem persists:</p>
            <ul className="text-left list-disc list-inside space-y-1">
              {errorState.errorType === 'api_key' && (
                <>
                  <li>Check your Google Cloud Console API key settings</li>
                  <li>Ensure Maps JavaScript API is enabled</li>
                  <li>Verify API key restrictions are correct</li>
                </>
              )}
              {errorState.errorType === 'network' && (
                <>
                  <li>Check your internet connection</li>
                  <li>Try refreshing the page</li>
                  <li>Check if Google Maps is accessible</li>
                </>
              )}
              {errorState.errorType === 'quota' && (
                <>
                  <li>Wait a few minutes before retrying</li>
                  <li>Check your Google Cloud billing status</li>
                  <li>Consider upgrading your API quota</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}