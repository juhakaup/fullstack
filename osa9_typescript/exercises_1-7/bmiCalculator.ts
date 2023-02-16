interface BMIValues {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: string[]): BMIValues => {
  if (args.length > 4) throw new Error('Too many arguments!')
  if (args.length < 4) throw new Error('Not enough arguments!')

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      "height": height,
      "weight": weight
    };
  } else {
    throw new Error('Invalid arguments!')
  }
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height/100) * (height/100));
  if (bmi >= 40) return 'Obese (Class III)';
  if (bmi >= 34.9) return 'Obese (Class II)';
  if (bmi >= 29.9) return 'Obese (Class I)';
  if (bmi >= 24.9) return 'Overweight (Pre-obese)';
  if (bmi >= 18.4) return 'Normal range';
  if (bmi >= 16.9) return 'Underweight (Mild thinness)';
  if (bmi >= 16) return 'Underweight (Moderate thinness)';
  return 'Underweight (Severe thinness)';
}


try {
  const {height, weight} = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Error: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi };