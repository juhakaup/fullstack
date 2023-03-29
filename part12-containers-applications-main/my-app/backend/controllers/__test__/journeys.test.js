const request = require('supertest');
const app = require('../../app');

describe('api/journeys', () => {
  it('should return -200 Ok- if request with no parameters', async () => {
    const res = await request(app).get('/api/journeys');
    expect(res.statusCode).toEqual(200);
  });
})