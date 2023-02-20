import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.json({ 'error': 'malformatted parameters' }).status(400);
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    'weight': weight,
    'height': height,
    'bmi': bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) { return res.json({ error: "parameters missing"}); }
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) { return res.json({ error: "malformatted parameters"}); }

  const results = calculateExercises(Number(target), daily_exercises as number[]);

  return res.json(results);
});

const PORT = 3002;
app.listen(PORT, ()=> {
  console.log(`Server running on port: ${PORT}`);
});
