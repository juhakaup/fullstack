import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { DataGridForStations } from '../DataGrid';

test('component is rendered with correct information', () => {
  const stations = [{
    'id': 111,
    'station': { 'name': 'Lauttasaari', 'id': 123 },
    'address': { 'street': 'Vattuniementie 1', 'city': 'Helsinki' },
    'operator': 'CityBike Finland',
    'capacity': 12,
    'location': [60, 20],
  }];

  const setSelectedStation = () => (null);
  const setShowModal = () => (null);

  const component = render(
    <DataGridForStations 
      type="module"
      stations={stations} 
      setSelectedStation={setSelectedStation} 
      setShowModal={setShowModal}
    />)

    const element = screen.getByRole('grid');

  expect(element).toBeDefined()

  expect(component.container).toHaveTextContent('Lauttasaari Vattuniementie 1 Helsinki')
  expect(component.container).toHaveTextContent('CityBike Finland')
})

test('component is rendered when station list is empty', () => {
  const stations = [];

  const setSelectedStation = () => (null);
  const setShowModal = () => (null);

  const component = render(
    <DataGridForStations 
      type="module"
      stations={stations} 
      setSelectedStation={setSelectedStation} 
      setShowModal={setShowModal}
    />)

    const element = screen.getByRole('grid');

  expect(element).toBeDefined()
  expect(component.container).toHaveTextContent('StationAddressOperator')
})