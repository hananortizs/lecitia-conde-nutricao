import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Calculator, Scale, Ruler, AlertCircle } from "lucide-react";
import { BmiFormData, BmiClassification } from "../types";
import {
  StyledInput,
  InputGroup,
  Label,
  ErrorMessage,
  HelperText,
} from "./styled/Input";
import PhoneInput from "./styled/PhoneInput";
import { StyledButton } from "./styled/Button";
import { StyledCard, CardHeader, CardBody } from "./styled/Card";
import { bmiColors } from "../theme";

const CalculatorContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: ${(props) =>
    props.theme.spacing.xs}; /* Mobile pequeno (320-479px) */
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: ${(props) =>
      props.theme.spacing.sm}; /* Mobile grande (480-767px) */
  }

  @media (min-width: 768px) {
    padding: ${(props) => props.theme.spacing.lg}; /* Desktop (768px+) */
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Mobile pequeno (320-479px) - 1 coluna */
  gap: ${(props) => props.theme.spacing.sm}; /* Mobile pequeno - gap menor */
  margin-bottom: ${(props) =>
    props.theme.spacing.md}; /* Mobile pequeno - margin menor */

  @media (min-width: 480px) {
    gap: ${(props) =>
      props.theme.spacing.md}; /* Mobile grande (480-767px) - gap médio */
    margin-bottom: ${(props) =>
      props.theme.spacing.lg}; /* Mobile grande - margin maior */
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr; /* Desktop (768px+) - 2 colunas */
    gap: ${(props) => props.theme.spacing.lg}; /* Desktop - gap maior */
  }
`;

const ResultSection = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}10
  );
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  margin-top: ${(props) => props.theme.spacing.lg};
  text-align: center;
`;

const BmiValue = styled.div<{ classification: BmiClassification }>`
  font-size: 2rem; /* Mobile first - menor */
  font-weight: 700;
  color: ${(props) =>
    bmiColors[props.classification.toLowerCase() as keyof typeof bmiColors] ||
    props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  @media (min-width: 768px) {
    font-size: 3rem; /* Desktop - maior */
  }
`;

const Classification = styled.div<{ classification: BmiClassification }>`
  font-size: 1rem; /* Mobile first - menor */
  font-weight: 600;
  color: ${(props) =>
    bmiColors[props.classification.toLowerCase() as keyof typeof bmiColors] ||
    props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  @media (min-width: 768px) {
    font-size: 1.25rem; /* Desktop - maior */
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.75rem; /* Mobile first - menor */
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 0.875rem; /* Desktop - maior */
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.75rem; /* 60px */
  height: 3.75rem; /* 60px */
  background-color: ${(props) => props.theme.colors.primary}20;
  border-radius: 50%;
  margin: 0 auto ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.primary};
`;

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.error}10;
  border: 0.0625rem solid ${(props) => props.theme.colors.error}30;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.error};
`;

interface BmiCalculatorProps {
  onCalculate?: (
    data: BmiFormData,
    bmi: number,
    classification: BmiClassification
  ) => void;
  initialData?: Partial<BmiFormData>;
}

const BmiCalculator: React.FC<BmiCalculatorProps> = ({
  onCalculate,
  initialData,
}) => {
  const [bmi, setBmi] = useState<number | null>(null);
  const [classification, setClassification] =
    useState<BmiClassification | null>(null);
  const [description, setDescription] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<BmiFormData>({
    defaultValues: initialData || {
      name: "",
      email: "",
      whatsApp: "",
      weight: "",
      height: "",
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  // Calculate BMI whenever weight or height changes
  useEffect(() => {
    const weight = parseFloat(watchedValues.weight);
    const height = parseFloat(watchedValues.height);

    if (weight > 0 && height > 0) {
      const calculatedBmi = weight / (height * height);
      setBmi(calculatedBmi);

      const { classification: newClassification, description: newDescription } =
        getBmiClassification(calculatedBmi);
      setClassification(newClassification);
      setDescription(newDescription);
    } else {
      setBmi(null);
      setClassification(null);
      setDescription("");
    }
  }, [watchedValues.weight, watchedValues.height]);

  const getBmiClassification = (
    bmiValue: number
  ): { classification: BmiClassification; description: string } => {
    if (bmiValue < 18.5) {
      return {
        classification: BmiClassification.Underweight,
        description:
          "Você está abaixo do peso ideal. Consulte um nutricionista para orientações sobre alimentação saudável.",
      };
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      return {
        classification: BmiClassification.Normal,
        description:
          "Parabéns! Seu peso está dentro da faixa considerada saudável. Mantenha hábitos alimentares equilibrados.",
      };
    } else if (bmiValue >= 25 && bmiValue < 30) {
      return {
        classification: BmiClassification.Overweight,
        description:
          "Você está com sobrepeso. Uma consulta nutricional pode ajudar a alcançar seu peso ideal de forma saudável.",
      };
    } else if (bmiValue >= 30 && bmiValue < 35) {
      return {
        classification: BmiClassification.ObesityI,
        description:
          "Você está com obesidade grau I. É importante buscar orientação nutricional para melhorar sua saúde.",
      };
    } else if (bmiValue >= 35 && bmiValue < 40) {
      return {
        classification: BmiClassification.ObesityII,
        description:
          "Você está com obesidade grau II. Recomendamos fortemente uma consulta com nutricionista.",
      };
    } else {
      return {
        classification: BmiClassification.ObesityIII,
        description:
          "Você está com obesidade grau III. É essencial buscar acompanhamento nutricional especializado.",
      };
    }
  };

  const onSubmit = (data: BmiFormData) => {
    if (bmi && classification) {
      onCalculate?.(data, bmi, classification);
    }
  };

  const resetForm = () => {
    reset();
    setBmi(null);
    setClassification(null);
    setDescription("");
  };

  return (
    <CalculatorContainer>
      <StyledCard variant="elevated">
        <CardHeader>
          <IconWrapper>
            <Calculator size={32} />
          </IconWrapper>
          <h2>Calculadora de IMC</h2>
          <p>
            Descubra seu Índice de Massa Corporal e receba orientações
            personalizadas
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGrid>
              <InputGroup>
                <Label htmlFor="name">Nome Completo *</Label>
                <StyledInput
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  {...register("name", {
                    required: "Nome é obrigatório",
                    minLength: {
                      value: 2,
                      message: "Nome deve ter pelo menos 2 caracteres",
                    },
                  })}
                  error={!!errors.name}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">E-mail *</Label>
                <StyledInput
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "E-mail inválido",
                    },
                  })}
                  error={!!errors.email}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="whatsApp">WhatsApp *</Label>
                <PhoneInput
                  id="whatsApp"
                  placeholder="11 99999-9999"
                  value={watch("whatsApp") || ""}
                  onChange={(value) => {
                    // Atualiza o valor no formulário
                    const event = {
                      target: { name: "whatsApp", value: value },
                    } as any;
                    register("whatsApp", {
                      required: "WhatsApp é obrigatório",
                      validate: (value) => {
                        const numbers = value.replace(/\D/g, "");
                        return (
                          numbers.length >= 10 || "Número de telefone inválido"
                        );
                      },
                    }).onChange(event);
                  }}
                  onBlur={() =>
                    register("whatsApp").onBlur({
                      target: { name: "whatsApp" },
                    } as any)
                  }
                  error={!!errors.whatsApp}
                />
                {errors.whatsApp && (
                  <ErrorMessage>{errors.whatsApp.message}</ErrorMessage>
                )}
                <HelperText>Digite apenas o DDD e número</HelperText>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="weight">Peso (kg) *</Label>
                <StyledInput
                  id="weight"
                  type="number"
                  step="0.1"
                  min="1"
                  max="500"
                  placeholder="70.5"
                  {...register("weight", {
                    required: "Peso é obrigatório",
                    min: { value: 1, message: "Peso deve ser maior que 0" },
                    max: {
                      value: 500,
                      message: "Peso deve ser menor que 500kg",
                    },
                  })}
                  error={!!errors.weight}
                />
                {errors.weight && (
                  <ErrorMessage>{errors.weight.message}</ErrorMessage>
                )}
                <HelperText>Exemplo: 70.5</HelperText>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="height">Altura (m) *</Label>
                <StyledInput
                  id="height"
                  type="number"
                  step="0.01"
                  min="0.5"
                  max="3.0"
                  placeholder="1.75"
                  {...register("height", {
                    required: "Altura é obrigatória",
                    min: {
                      value: 0.5,
                      message: "Altura deve ser maior que 0.5m",
                    },
                    max: {
                      value: 3.0,
                      message: "Altura deve ser menor que 3.0m",
                    },
                  })}
                  error={!!errors.height}
                />
                {errors.height && (
                  <ErrorMessage>{errors.height.message}</ErrorMessage>
                )}
                <HelperText>Exemplo: 1.75</HelperText>
              </InputGroup>
            </FormGrid>

            {bmi && classification && (
              <ResultSection>
                <BmiValue classification={classification}>
                  {bmi.toFixed(1)}
                </BmiValue>
                <Classification classification={classification}>
                  {classification}
                </Classification>
                <Description>{description}</Description>
              </ResultSection>
            )}

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <StyledButton
                type="button"
                $variant="outline"
                onClick={resetForm}
              >
                Limpar
              </StyledButton>
              <StyledButton
                type="submit"
                $variant="primary"
                disabled={!isValid || !bmi}
                loading={false}
              >
                Calcular IMC
              </StyledButton>
            </div>
          </form>
        </CardBody>
      </StyledCard>
    </CalculatorContainer>
  );
};

export default BmiCalculator;
