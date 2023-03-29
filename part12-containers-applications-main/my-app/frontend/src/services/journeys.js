import axios from "axios";
const connection = axios.create({baseURL: process.env.BACKEND_URL});

const url = '/api/journeys'
console.log(url, )

const getJourneys = (page, pageSize, field, order) => {
  const request = connection.get(`${url}?page=${page}&size=${pageSize}&field=${field}&order=${order}`)
  return request.then(res => res.data);
}

// eslint-disable-next-line
export default { getJourneys }