import { calculateBmi } from './bmiCalculator';

import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.json({ 'error': 'malformatted parameters' }).status(400);
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    'weight': weight,
    'height': height,
    'bmi': bmi,
  })
})

const PORT = 3001;
app.listen(PORT, ()=> {
  console.log(`Server running on port: ${PORT}`);
});
