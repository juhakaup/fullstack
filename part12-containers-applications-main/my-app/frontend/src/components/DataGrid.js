import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import journeyService from '../services/journeys';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { convertDateToReadable, metersToReadable, minutesToReadable } from '../utils/Formatter';

/**
 * List journeys
 * @returns DataGrid
 */
const DataGridForJourneys = ({ setSelectedStation, setShowModal }) => {
  const [journeys, setJourneys] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);
  const [rowCount, setRowCount] = useState(0);
  const [sortBy, setSortBy] = useState({field: 'departure', sort: 'asc'});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    journeyService.getJourneys(page, pageSize, sortBy.field, sortBy.sort)
    .then(res => {
      const data = res.content.map(journey => ({
        'id': journey.id,
        'departure': {'station': journey.departureStationName, 'time': journey.departure, 'id': journey.departureStationId},
        'return': {'station': journey.returnStationName, 'time': journey.return, 'id': journey.returnStationId},
        'distance': journey.distance,
        'duration': journey.duration,
      }));
      setJourneys(data);
      setRowCount(res.rows);
      setLoading(false);
    })
  }, [pageSize, page, sortBy]);

  const columns = [
    // Departure
    {field: "departure", headerName: "Departure", width: 270, 
    renderCell: (params) => (
      <Box>
        <Button variant="text" sx={{ minHeight: 0, minWidth: 0, padding: 0, underline: "none", color: "inherit" }}>{params.value.station}</Button>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom> {convertDateToReadable(params.value.time)} </Typography>
      </Box>
    )},

    // Return
    {field: "return", headerName: "Return", width: 270, 
    renderCell: (params) => (
      <Box>
        <Button variant="text" sx={{ minHeight: 0, minWidth: 0, padding: 0, underline: "none", color: "inherit" }}>{params.value.station}</Button>
        <Typography color="textSecondary" variant="caption" display="block" gutterBottom> {convertDateToReadable(params.value.time)} </Typography>
      </Box>
    )},

    {field: "distance", headerName: "Distance", width: 120,
      renderCell: (params) => (<Typography> {metersToReadable(params.value)} </Typography>)
    },

    {field: "duration", headerName: "Duration", width: 120,
      renderCell: (params) => (<Typography> {minutesToReadable(params.value)} </Typography>)
    },
  ]

  const handleSortModelChange = (e) => {
    setSortBy(e[0]);
  }

  const handleOnCellClick = (params) => {
    if (params.field === 'departure' || params.field === 'return') {
      setSelectedStation({name: params.value.station ,id: params.value.id})
      setShowModal(true);
    }
  };
  
  return (
    <div style={{ display: 'flex', width:'800px' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={journeys}
          columns={columns}
          rowsPerPageOptions={[15,25,50,100]}
          autoHeight 
          pagination
          paginationMode="server"
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          rowCount={rowCount}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          loading={loading}
          onCellClick={handleOnCellClick}
        />
       </div>
    </div>
  )
}

DataGridForJourneys.propTypes = {
  setSelectedStation: PropTypes.func,
  setShowModal: PropTypes.func
}

/**
 * DataGrid for listing stations
 * @returns DataGrid
 */
const DataGridForStations = ({ stations, setSelectedStation, setShowModal }) => {
  const columns = [
    {field: "station", headerName: "Station", width: 250,
      renderCell: (params) => (
          <Button variant="text" sx={{ minHeight: 0, minWidth: 0, padding: 0, underline: "none", color: "inherit" }}>{params.value.name}</Button>
      ), sortComparator: (v1, v2) => v1.name.localeCompare(v2.name)
    },

    {field: "address", headerName: "Address", width: 250, 
      renderCell: (params) => (
        <div>
          <Typography variant="subtitle2"> {params.value.street} </Typography>
          <Typography color="textSecondary" variant="caption" display="block" gutterBottom>{params.value.city}</Typography>
        </div>
      ), sortComparator: (v1, v2) => v1.street.localeCompare(v2.street)
    },

    {field: "operator", headerName: "Operator", width: 180 },
    {field: "capacity", headerName: "Capacity", width: 100 }
  ]

  const handleOnCellClick = (params) => {
    if (params.field === 'station') {
      setSelectedStation({name: params.value.name, id: params.value.id})
      setShowModal(true);
    }
  };
  
  return (
    <div style={{ display: 'flex', width:'800px' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={stations}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15,25,50,100]}
          autoHeight
          onCellClick={handleOnCellClick}
        />
       </div>
    </div>
  )
}

DataGridForStations.propTypes = {
  stations: PropTypes.array,
  setSelectedStation: PropTypes.func,
  setShowModal: PropTypes.func
}

export { DataGridForJourneys, DataGridForStations };