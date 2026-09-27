import { gql } from '@apollo/client';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface CreateCarInput {
  make: string;
  model: string;
  year: number;
  color: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
}

export const GET_CARS = gql`
  query GetCars($make: String, $model: String, $year: Int, $color: String) {
    cars(make: $make, model: $model, year: $year, color: $color) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export const CREATE_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;