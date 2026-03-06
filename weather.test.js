const request = require('supertest');
const app = require('./app');

it('GET /weather sans lat et lon retourne 400', async () => {
  const res = await request(app).get('/weather');
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe('required latitude and longitude');
});

it('GET /weather avec lat et lon retourne 200', async () => {
  const res = await request(app).get('/weather?lat=48.5&lon=7.7');
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('temp');
  expect(res.body).toHaveProperty('clouds');
  expect(res.body).toHaveProperty('visibility');
});