import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { SortField } from '../hooks/useCars';

interface CarFilterBarProps {
  searchModel: string;
  onSearchChange: (value: string) => void;
  selectedYear: number | '';
  onYearChange: (value: number | '') => void;
  sortBy: SortField;
  onSortChange: (value: SortField) => void;
  onOpenCreate: () => void;
}

export const CarFilterBar: React.FC<CarFilterBarProps> = ({
  searchModel,
  onSearchChange,
  selectedYear,
  onYearChange,
  sortBy,
  onSortChange,
  onOpenCreate,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flexGrow: 1 }}>
          <TextField
            label="Search by model"
            size="small"
            value={searchModel}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="e.g. Civic, Model 3"
            sx={{ minWidth: 200 }}
          />

          <TextField
            label="Year"
            size="small"
            type="number"
            value={selectedYear}
            onChange={(e) => {
              const val = e.target.value;
              onYearChange(val === '' ? '' : parseInt(val, 10));
            }}
            placeholder="e.g. 2022"
            sx={{ width: { xs: '100%', sm: 120 } }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sortBy}
              label="Sort by"
              onChange={(e) => onSortChange(e.target.value as SortField)}
            >
              <MenuItem value="year-desc">Year: Newest first</MenuItem>
              <MenuItem value="year-asc">Year: Oldest first</MenuItem>
              <MenuItem value="model-asc">Model: A to Z</MenuItem>
              <MenuItem value="make-asc">Make: A to Z</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onOpenCreate}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Add Car
        </Button>
      </Stack>
    </Box>
  );
};