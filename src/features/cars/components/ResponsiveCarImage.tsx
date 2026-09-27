import React from 'react';
import Box from '@mui/material/Box';

interface ResponsiveCarImageProps {
  mobile: string;
  tablet: string;
  desktop: string;
  alt: string;
}

export const ResponsiveCarImage: React.FC<ResponsiveCarImageProps> = ({
  mobile,
  tablet,
  desktop,
  alt,
}) => {
  return (
    <Box
      component="picture"
      sx={{
        display: 'block',
        width: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        backgroundColor: 'grey.100',
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        },
      }}
    >
      {/* Desktop: >= 1024px */}
      <source media="(min-width: 1024px)" srcSet={desktop} />
      {/* Tablet: 640px to 1023px */}
      <source media="(min-width: 640px)" srcSet={tablet} />
      {/* Fallback to Mobile: <= 639px */}
      <img src={mobile} alt={alt} loading="lazy" />
    </Box>
  );
};