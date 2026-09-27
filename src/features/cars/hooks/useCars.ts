import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CARS, CREATE_CAR, Car, CreateCarInput } from '../api/queries';

export type SortField = 'year-asc' | 'year-desc' | 'model-asc' | 'make-asc';

export function useCars() {
  const [searchModel, setSearchModel] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<SortField>('year-desc');

  // Query against MSW endpoint
  const { data, loading, error, refetch } = useQuery<{ cars: Car[] }>(GET_CARS, {
    variables: {
      model: searchModel.trim() || undefined,
      year: selectedYear === '' ? undefined : Number(selectedYear),
    },
      notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  // Mutation with cache update so UI immediately updates without hard reload
  const [createCarMutation, { loading: isCreating, error: createError }] = useMutation<
    { createCar: Car },
    { input: CreateCarInput }
  >(CREATE_CAR, {
    update(cache, { data: mutationResult }) {
      if (!mutationResult?.createCar) return;

      const newCar = mutationResult.createCar;
      const existing = cache.readQuery<{ cars: Car[] }>({
        query: GET_CARS,
      });

      if (existing?.cars) {
        cache.writeQuery({
          query: GET_CARS,
          data: {
            cars: [newCar, ...existing.cars],
          },
        });
      }
    },
  });

  // Client-side sorting on retrieved records
  const sortedCars = useMemo(() => {
    if (!data?.cars) return [];
    const list = [...data.cars];

    return list.sort((a, b) => {
      switch (sortBy) {
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'model-asc':
          return a.model.localeCompare(b.model);
        case 'make-asc':
          return a.make.localeCompare(b.make);
        default:
          return 0;
      }
    });
  }, [data?.cars, sortBy]);

  const createCar = async (input: CreateCarInput) => {
    return createCarMutation({ variables: { input } });
  };

  return {
    cars: sortedCars,
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
    createError,
  };
}