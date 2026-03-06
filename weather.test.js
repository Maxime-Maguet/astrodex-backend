const request = require('supertest');
const app = require('./app');

it('GET /weather sans lat et lon retourne 400', async () => {
  const res = await request(app).get('/weather');
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe('required latitude and longitude');
});