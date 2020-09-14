interface Result {
  periodLength: number; // 天数
  trainingDays: number; // 训练日数
  average: number;// 平均时间
  target: number, // 目标值
  success: boolean; // 是否达到目标
  rating: number; // 1-3的数字，区分满足小时数的程度
  ratingDescription: string, // 评级解释
}

const calculateExercises = (days: Array<number>, target: number): Result => {
  const periodLength = days.length;
  let sum = 0;
  let trainingDays = 0;
  days.forEach(hours => {
    if (hours > 0) {
      sum += hours;
      trainingDays += 1;
    }
  });

  const average = sum / periodLength;

  return {
    periodLength,
    trainingDays,
    average,
    target,
    success: average > target,
    rating: 2,
    ratingDescription: ''
  };
};

export default calculateExercises;

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3], 2));
