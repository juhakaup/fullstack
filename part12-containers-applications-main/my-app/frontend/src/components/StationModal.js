import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {  Divider, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import stationService from '../services/stations'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#efefef',
  border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const StationModal = ({ handleClose, open, selectedStation, stations}) => {
  const [topDestinations, setTopDestinations] = useState([]);
  const [topOrigins, setTopOrigins] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [fromCount, setFromCount] = useState(null);
  const [toCount, setToCount] = useState(null);

  const station = stations.find(element => element.id === selectedStation.id);

   // fetch stats and counts
   useEffect(() => {
    setLoadingStats(true);
    setLoadingCounts(true);
    stationService.getStats(station.id)
    .then(res => {
      setTopDestinations(res.topDestinations);
      setTopOrigins(res.topOrigins);
      setLoadingStats(false);
    });
    stationService.getCounts(station.id)
    .then(res => {
      setFromCount(res.journeysFromStation);
      setToCount(res.journeysToStation);
      setLoadingCounts(false);
    })
  }, [station.id])

  if (stations.length === 0 || selectedStation == null || selectedStation.name == null) {
    return (null)
  }
  
  return(
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">{selectedStation.name}</Typography>
        <Divider />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <div>
                <Typography color="textSecondary" variant="caption" display="block" sx={{ mt: 1, padding: 0 }}> Address: </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0, padding: 0 }}>
                  {station.address.street} 
                  <br />
                  {station.address.city === ' ' ? "Helsinki" : station.address.city}
                </Typography>
              </div>
            </Grid>
            <Grid xs={6}>
              <div>
                <Typography color="textSecondary" variant="caption" display="block" sx={{ mt: 1, padding: 0 }}> Capacity: </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0, padding: 0 }}> {station.capacity} </Typography>
                <Typography color="textSecondary" variant="caption" display="block" sx={{ mt: 0, padding: 0 }}> Operator: </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0, padding: 0 }}> {station.operator} </Typography>
              </div>
            </Grid>
            <Grid xs={6}>
              <div>
              <Typography color="textSecondary" variant="subtitle1" display="block" sx={{ mt: 0, padding: 0 }}> Journeys from this station: </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 0, padding: 0 }}> {loadingCounts ? '' : fromCount} </Typography>
              </div>
            </Grid>
            <Grid xs={6}>
              <div>
              <Typography color="textSecondary" variant="subtitle1" display="block" sx={{ mt: 0, padding: 0 }}> Journeys to this station: </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 0, padding: 0 }}> {loadingCounts ? '' : toCount} </Typography>
              </div>
            </Grid>
            <Grid xs={6}>
              <Typography id="modal-modal-description" sx={{ mt: 1, padding: 0 }}> Most popular destinations: </Typography>
              {loadingStats ? <p>Loading...</p> : <StationList list={topDestinations}/>}
            </Grid>
            <Grid xs={6}>
              <Typography id="modal-modal-description" sx={{ mt: 1, padding: 0 }}> Most visits from stations: </Typography>
              {loadingStats ? <p>Loading...</p> : <StationList list={topOrigins}/>}
            </Grid>
          </Grid>
        </Box>
      </Box>    
    </Modal>
  )
}

StationModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  selectedStation: PropTypes.any,
  stations: PropTypes.array
}

// Compact list for listing top stations
const StationList = ({ list }) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Station</TableCell>
            <TableCell>Journeys</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((station, index) => (
            <TableRow 
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{station.name}</TableCell>
              <TableCell align="right">{station.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

StationList.propTypes = {
  list: PropTypes.array,
  stations: PropTypes.array
}

export default StationModal