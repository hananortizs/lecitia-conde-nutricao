import { useState, useCallback } from "react";
import { calculateBmiResult, validateBmiInputs } from "../utils/bmiCalculator";

/**
 * Custom hook for BMI calculation
 * Provides state management and calculation logic
 */
export function useBmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);

  /**
   * Calculates BMI and updates state
   */
  const calculateBmi = useCallback(() => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Validate inputs
    const validation = validateBmiInputs(weightNum, heightNum);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setBmiResult(null);
      setIsCalculated(false);
      return null;
    }

    // Clear errors and calculate
    setErrors([]);

    try {
      const result = calculateBmiResult(weightNum, heightNum);
      setBmiResult(result);
      setIsCalculated(true);
      return result;
    } catch (error) {
      setErrors([error.message]);
      setBmiResult(null);
      setIsCalculated(false);
      return null;
    }
  }, [weight, height]);

  /**
   * Resets all values
   */
  const reset = useCallback(() => {
    setWeight("");
    setHeight("");
    setBmiResult(null);
    setErrors([]);
    setIsCalculated(false);
  }, []);

  /**
   * Updates weight value
   */
  const updateWeight = useCallback((value) => {
    setWeight(value);
    setIsCalculated(false);
  }, []);

  /**
   * Updates height value
   */
  const updateHeight = useCallback((value) => {
    setHeight(value);
    setIsCalculated(false);
  }, []);

  return {
    // State
    weight,
    height,
    bmiResult,
    errors,
    isCalculated,

    // Actions
    calculateBmi,
    reset,
    updateWeight,
    updateHeight,
  };
}
