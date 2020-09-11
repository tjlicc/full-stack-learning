import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/Hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (isNaN(weight) || isNaN(height)) {
    res.json({
      error: "malformatted parameters"
    });
  } else {
    res.json({
      weight,
      height,
      bmi: calculateBmi(weight, height)
    });
  }
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.json({
      error: "parameters missing"
    });
    return;
  }

  if (isNaN(Number(target))) {
    res.json({
      error: "malformatted parameters"
    });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});