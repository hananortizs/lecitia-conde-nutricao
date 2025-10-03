/**
 * BMI Calculator Utility for Frontend
 * Provides instant BMI calculation and classification
 */

/**
 * Calculates BMI based on weight and height
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in meters
 * @returns {number} BMI value rounded to 2 decimal places
 */
export function calculateBmi(weight, height) {
  if (!weight || !height || height <= 0) {
    throw new Error("Weight and height must be positive numbers");
  }

  const bmi = weight / (height * height);
  return Math.round(bmi * 100) / 100; // Round to 2 decimal places
}

/**
 * Classifies BMI according to WHO standards
 * @param {number} bmi - BMI value
 * @returns {object} Classification object with classification and description
 */
export function classifyBmi(bmi) {
  if (bmi < 18.5) {
    return {
      classification: "Underweight",
      description:
        "You are underweight. Consult a nutritionist for guidance on healthy weight gain.",
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      classification: "Normal weight",
      description: "Congratulations! Your weight is within the healthy range.",
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      classification: "Overweight",
      description:
        "You are overweight. A nutritional consultation can help you reach your ideal weight.",
    };
  } else if (bmi >= 30 && bmi < 35) {
    return {
      classification: "Obesity Grade I",
      description:
        "You have grade I obesity. It's important to seek nutritional guidance for your health.",
    };
  } else if (bmi >= 35 && bmi < 40) {
    return {
      classification: "Obesity Grade II",
      description:
        "You have grade II obesity. We strongly recommend a nutritional consultation.",
    };
  } else {
    return {
      classification: "Obesity Grade III",
      description:
        "You have grade III obesity. It's essential to seek specialized nutritional care.",
    };
  }
}

/**
 * Calculates BMI and returns complete result
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in meters
 * @returns {object} Complete BMI result with value, classification and description
 */
export function calculateBmiResult(weight, height) {
  const bmi = calculateBmi(weight, height);
  const classification = classifyBmi(bmi);

  return {
    bmi,
    classification: classification.classification,
    description: classification.description,
  };
}

/**
 * Validates weight and height inputs
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in meters
 * @returns {object} Validation result with isValid and errors
 */
export function validateBmiInputs(weight, height) {
  const errors = [];

  if (!weight || weight <= 0) {
    errors.push("Weight must be a positive number");
  } else if (weight < 1 || weight > 500) {
    errors.push("Weight must be between 1 and 500 kg");
  }

  if (!height || height <= 0) {
    errors.push("Height must be a positive number");
  } else if (height < 0.5 || height > 3.0) {
    errors.push("Height must be between 0.5 and 3.0 meters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
