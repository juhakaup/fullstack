const request = require('supertest');
const app = require('../../app');

describe('api/station', () => {
  it('should return -200 Ok- if valid request', async () => {
    const response = await request(app).get('/api/stations');
    expect(response.statusCode).toEqual(200);
  });

  it('returns -404 not found- if given station does not exist', async () => {
    const response = await request(app).get('/api/stations/999');
    expect(response.statusCode).toEqual(404);
  });

  it('returns -400 bad request- if given station id is negative', async () => {
    const response = await request(app).get('/api/stations/-123');
    expect(response.statusCode).toEqual(400);
  });

  it('returns -400 bad request- if given station id is not valid number', async () => {
    const response = await request(app).get('/api/stations/null');
    expect(response.statusCode).toEqual(400);
  });
});