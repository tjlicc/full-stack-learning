const calculateBmi = (weight: number, height: number): string => {
  const heihgtInMeter = height / 100;
  const bmi = weight / (heihgtInMeter * heihgtInMeter);

  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'overweight';
  } else {
    return 'obease';
  }
};

export default calculateBmi;

console.log(calculateBmi(72, 168));