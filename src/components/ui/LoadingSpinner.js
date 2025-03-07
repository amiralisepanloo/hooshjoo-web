import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Custom styles for the loading component
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    width: '100%',
    padding: '20px',
  },
  message: {
    marginTop: '16px',
    textAlign: 'center',
  }
}));

/**
 * LoadingSpinner - A reusable loading indicator component
 * 
 * @param {Object} props
 * @param {string} props.message - Optional message to display below the spinner
 * @param {number} props.size - Size of the spinner (default: 60)
 * @param {string} props.color - Color of the spinner (default: 'primary')
 * @param {number} props.thickness - Thickness of the spinner (default: 5)
 * @param {Object} props.containerStyle - Additional styles for the container
 */
const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 60, 
  color = 'primary',
  thickness = 5,
  containerStyle = {}
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} style={containerStyle} data-testid="loading-spinner">
      <CircularProgress 
        size={size} 
        color={color} 
        thickness={thickness}
        aria-label="Loading content"
      />
      {message && (
        <Typography 
          variant="body1" 
          className={classes.message}
          aria-live="polite"
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
