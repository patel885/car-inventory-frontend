import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Car } from '../api/queries';
import { ResponsiveCarImage } from './ResponsiveCarImage';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Card
      elevation={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <ResponsiveCarImage
        mobile={car.mobile}
        tablet={car.tablet}
        desktop={car.desktop}
        alt={`${car.year} ${car.make} ${car.model}`}
      />
      <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 }}
        >
          {car.make}
        </Typography>
        <Typography variant="h6" component="h2" fontWeight={700} sx={{ mt: 0.5, mb: 1.5 }}>
          {car.model}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Chip label={car.year} size="small" variant="outlined" />
          <Chip
            label={car.color}
            size="small"
            sx={{
              textTransform: 'capitalize',
              backgroundColor: '#f1f5f9',
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};