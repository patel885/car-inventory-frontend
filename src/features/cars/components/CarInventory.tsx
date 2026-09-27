import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useCars } from '../hooks/useCars';
import { CarCard } from './CarCard';
import { CarFilterBar } from './CarFilterBar';
import { CreateCarModal } from './CreateCarModal';

export const CarInventory: React.FC = () => {
  const {
    cars,
    loading,
    error,
    refetch,
    searchModel,
    setSearchModel,
    selectedYear,
    setSelectedYear,
    sortBy,
    setSortBy,
    createCar,
    isCreating,
  } = useCars();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container maxWidth="xl" sx={{ py: 5, px: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          Car Inventory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore vehicle availability across models with adaptive screen assets.
        </Typography>
      </Box>

      <CarFilterBar
        searchModel={searchModel}
        onSearchChange={setSearchModel}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onOpenCreate={() => setIsModalOpen(true)}
      />

      {loading && !cars.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => void refetch()}>
              Retry
            </Button>
          }
          sx={{ mb: 4 }}
        >
          Failed to load car inventory. {error.message}
        </Alert>
      )}

      {!loading && !error && cars.length === 0 && (
        <Box
          sx={{
            py: 8,
            textAlign: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            border: '1px dashed #d0d7de',
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No vehicles match your search
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Try updating your model name or clearing the year filter.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchModel('');
              setSelectedYear('');
            }}
          >
            Reset Filters
          </Button>
        </Box>
      )}

      {cars.length > 0 && (
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid key={car.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <CarCard car={car} />
            </Grid>
          ))}
        </Grid>
      )}

      <CreateCarModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createCar}
        isLoading={isCreating}
      />
    </Container>
  );
};