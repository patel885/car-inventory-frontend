import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { ApolloError } from '@apollo/client';
import { CreateCarInput } from '../api/queries';

interface CreateCarModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CreateCarInput) => Promise<unknown>;
  isLoading: boolean;
}

export const CreateCarModal: React.FC<CreateCarModalProps> = ({
  open,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [color, setColor] = useState('Black');
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setMake('');
    setModel('');
    setYear(new Date().getFullYear());
    setColor('Black');
    setFormError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!make.trim() || !model.trim()) {
      setFormError('Make and Model are required.');
      return;
    }

    try {
      await onSubmit({
        make: make.trim(),
        model: model.trim(),
        year: Number(year),
        color: color.trim(),
        mobile: '/images/car-mobile.svg',
        tablet: '/images/car-tablet.svg',
        desktop: '/images/car-desktop.svg',
      });
      handleClose();
    } catch (err: unknown) {
      if (err instanceof ApolloError) {
        const gqlError = err.graphQLErrors?.[0]?.message;
        setFormError(gqlError || err.message);
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Failed to create car record. Please verify fields.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Car to Inventory</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            {formError && <Alert severity="error">{formError}</Alert>}

            <TextField
              label="Make"
              required
              fullWidth
              value={make}
              onChange={(e) => setMake(e.target.value)}
              placeholder="e.g. Toyota"
              autoFocus
            />

            <TextField
              label="Model"
              required
              fullWidth
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. GR Supra"
            />

            <TextField
              label="Year"
              type="number"
              required
              fullWidth
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />

            <TextField
              label="Color"
              required
              fullWidth
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g. Midnight Blue"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Add Vehicle'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};