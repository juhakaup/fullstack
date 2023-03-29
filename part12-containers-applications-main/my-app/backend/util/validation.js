const validJourney = (csvLine) => {
  const values = csvLine.split(',');

  // Check that we have the right amount of attributes
  if (values.length != 8) {
    return false;
  }

  // Check that departure date is valid
  const departureDate = new Date(values[0]);
  if (!(departureDate instanceof Date) || isNaN(departureDate)) {
    return false;
  }
  
  // Check that return date is valid
  const returnDate = new Date(values[1]);
  if (!(returnDate instanceof Date) || isNaN(returnDate)) {
    return false;
  }
  
  // Check that return is not earlier than departure
  if (departureDate > returnDate) {
    return false;
  }

  // Check that departure station id is valid
  const departureStationId = Number(values[2])
  if (isNaN(departureStationId) || departureStationId < 0) {
    return false;
  }
  
  // Check that return station id is valid
  const returnStationId = Number(values[4])
  if (isNaN(returnStationId) || returnStationId < 0) {
    return false;
  }

  // Check that duration is valid number and is not less than 10
  const duration = Number(values[6])
  if (isNaN(duration) || duration < 10) {
    return false;
  }

  // Check that distance is valid number and is not less than 10
  const distance = Number(values[7])
  if (isNaN(distance) || distance < 10) {
    return false;
  }

  return true;
}

const validStation = (csvLine) => {
  const values = csvLine.split(",");

  // Check that we have the right amount of attributes
  if (values.length != 13) {
    return false;
  }

  // Check that station id is valid positive number
  const id = Number(values[1]);
  if (isNaN(id) || id < 0) {
    return false;
  }

  // Check that station capacity is valid positive number
  const capacity = Number(values[10]);
  if (isNaN(capacity) || capacity < 0) {
    return false;
  }

  // Check that longitude is valid number and is between -180 and 180
  const longitude = Number(values[11]);
  if (isNaN(longitude) || Math.abs(longitude) > 180) {
    return false;
  }

  // Check that latitude is valid number and is between -90 and 90
  const latitude = Number(values[12]);
  if (isNaN(latitude) || Math.abs(latitude) > 90) {
    return false;
  }

  return true
} 

module.exports = { validJourney, validStation };