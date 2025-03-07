import React, { Component } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for the error UI
const ErrorContainer = styled(Paper)(({ theme }) => ({
  padding: '24px',
  margin: '16px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  maxWidth: '800px',
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
}));

const ErrorImage = styled('img')({
  width: '180px',
  height: 'auto',
  marginBottom: '16px'
});

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: '16px'
}));

/**
 * ErrorBoundary - Catches JavaScript errors in child components,
 * logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // Update state when error is caught
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Lifecycle method called after an error is thrown
  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Here you would typically log to a service like Sentry or LogRocket
    // if (typeof window.logErrorToService === 'function') {
    //   window.logErrorToService(error, errorInfo);
    // }
  }

  // Reset the error state
  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Custom fallback UI
      return fallback || (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="300px"
          data-testid="error-boundary-fallback"
        >
          <ErrorContainer>
            <ErrorImage 
              src="/error-illustration.png" 
              alt="Error illustration" 
              onError={(e) => e.target.style.display = 'none'}
            />
            <Typography variant="h5" color="error" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              We're sorry, but there was an error loading this content. Please try again later.
            </Typography>
            {process.env.NODE_ENV !== 'production' && error && (
              <Box 
                sx={{ 
                  backgroundColor: '#f5f5f5', 
                  padding: 2, 
                  borderRadius: 1,
                  overflow: 'auto',
                  maxWidth: '100%',
                  maxHeight: '200px',
                  marginTop: 2
                }}
              >
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
                  {error.toString()}
                </Typography>
              </Box>
            )}
            <Box mt={3} display="flex" gap={2} justifyContent="center">
              <ActionButton 
                variant="contained" 
                color="primary" 
                onClick={() => window.location.reload()}
              >
                Reload Page
              </ActionButton>
              <ActionButton 
                variant="outlined" 
                onClick={this.handleReset}
              >
                Try Again
              </ActionButton>
            </Box>
          </ErrorContainer>
        </Box>
      );
    }

    // No error, render children normally
    return children;
  }
}

export default ErrorBoundary;
