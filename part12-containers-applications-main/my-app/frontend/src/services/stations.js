import axios from "axios";
const url = '/api/stations'

const connection = axios.create({baseURL: process.env.BACKEND_URL});

/**
 * Get all stations
 * @returns Array of station-objects
 */
const getAll = () => {
  const request = connection.get(url);
  return request.then(res => res.data);
}

const getStats = (id) => {
  const request = connection.get(`${url}/${id}/stats`);
  return request.then(res => res.data);
}

const getCounts = (id) => {
  const request = connection.get(`${url}/${id}/counts`);
  return request.then(res => res.data);
}

// eslint-disable-next-line
export default { getAll, getStats, getCounts }
