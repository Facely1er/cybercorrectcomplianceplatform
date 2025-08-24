import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ENV } from '../config/environment';
import { errorMonitoring } from '../lib/errorMonitoring';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
  showErrorDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
  errorId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, errorId: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, errorId: Date.now().toString() };
  }

  componentDidCatch(error: Error, errorInfo: any) { 
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({ error, errorInfo });

    // Send to error monitoring
    errorMonitoring.captureException(error, {
      extra: errorInfo,
      tags: { type: 'reactError', boundary: 'ErrorBoundary' },
      level: 'error'
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReportError = () => { 
    const errorReport = {
      error: {
        message: this.state.error?.message || 'Unknown error',
        stack: this.state.error?.stack || 'No stack trace',
        name: this.state.error?.name || 'Error'
      },
      context: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        errorId: this.state.errorId
      },
      componentStack: this.state.errorInfo?.componentStack || ''
    };

    // Copy to clipboard for easy reporting
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
        .then(() => alert('Error details copied to clipboard'))
        .catch(() => console.log('Error details:', errorReport));
    } else {
      console.log('Error details:', errorReport);
      alert('Error details logged to console');
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but something unexpected happened. Our team has been notified and is working on a fix.
            </p>

            {this.props.showErrorDetails && ENV.isDevelopment && this.state.error && (
              <details className="mb-6 text-left bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Error Details (Development Mode)
                </summary>
                <div className="text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto max-h-40 bg-gray-50 dark:bg-gray-800 p-3 rounded border">
                  <div className="mb-2">
                    <strong>Error ID:</strong> {this.state.errorId}
                  </div>
                  <div className="mb-2">
                    <strong>Message:</strong> {this.state.error.message}
                  </div>
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">{this.state.error.stack}</pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go Home
              </button>
              
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reload Page
              </button>
            </div>

            {this.props.showErrorDetails && (
              <button
                onClick={this.handleReportError}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Report This Error
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping routes with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode,
  onError?: (error: Error, errorInfo: any) => void
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary 
      fallback={errorFallback}
      onError={onError}
      showErrorDetails={ENV.isDevelopment}
    >
      <Component {...props } />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};