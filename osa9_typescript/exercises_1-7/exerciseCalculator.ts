interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  target: number;
  hours: number[];
}

const parseExeArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments!')
  if (isNaN(Number(args[2]))) throw new Error('Invalid target value')

  const hours = args.slice(3).map(value => {
    if (isNaN(Number(value))) throw new Error('Invalid arguments');
    return Number(value)
  })

  return {
    "target": Number(args[2]),
    "hours": hours
  }
}

const calculateExercises = (target: number, hours: number[]): Result => {
  const trainingDays = hours.filter(hours => hours > 0);
  
  const totalHours = trainingDays.reduce((total, current) => total + current, 0);

  const average = totalHours / hours.length;

  let rating: number;
  let description: string;
  if (average >= target) {
    rating = 3;
    description = 'You did good';
  } else if (average > target / 2) {
    rating = 2;
    description = 'Not too bad, could be better';
  } else {
    rating = 1;
    description = 'You can do better';
  }

  return {
    'periodLength': hours.length,
    'trainingDays': trainingDays.length,
    'success': average >= target,
    'rating': rating,
    'ratingDescription': description,
    'target': target,
    'average': average
  }
}

try {
  const {target, hours} = parseExeArguments(process.argv)
  console.log(calculateExercises(target, hours));
} catch(error: unknown) {
  let errorMessage = "Error: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}