import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Calculator,
  Scale,
  Ruler,
  AlertCircle,
  Lock,
  LogOut,
} from "lucide-react";
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
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "../contexts/AuthContext";

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

const BmiWarning = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.warning}10,
    ${(props) => props.theme.colors.warning}05
  );
  border: 1px solid ${(props) => props.theme.colors.warning}30;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.lg};
  text-align: center;

  .warning-title {
    font-weight: 600;
    color: ${(props) => props.theme.colors.warning};
    margin-bottom: ${(props) => props.theme.spacing.sm};
    font-size: 0.875rem;
  }

  .warning-text {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.75rem;
    line-height: 1.5;
  }
`;

const ConsultationInvite = styled.div`
  background: linear-gradient(135deg, #e8f5e8, #d4edda);
  border: 2px solid #28a745;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  margin-top: ${(props) => props.theme.spacing.lg};
  text-align: center;

  .invite-title {
    font-weight: 700;
    color: #155724;
    margin-bottom: ${(props) => props.theme.spacing.md};
    font-size: 1.2rem;
  }

  .invite-text {
    color: #155724;
    line-height: 1.6;
    margin-bottom: ${(props) => props.theme.spacing.lg};
    font-size: 1rem;
  }

  .invite-benefits {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${(props) => props.theme.spacing.sm};
    margin-bottom: ${(props) => props.theme.spacing.lg};
    text-align: left;
  }

  .benefit-item {
    color: #155724;
    font-size: 0.9rem;
    font-weight: 500;
  }

  button {
    margin-top: ${(props) => props.theme.spacing.md};
  }
`;

const LockedSection = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 2px dashed ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.lg};

  .lock-icon {
    color: ${(props) => props.theme.colors.textSecondary};
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  .lock-text {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.875rem;
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }

  .lock-subtext {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.75rem;
    opacity: 0.8;
  }
`;

const LoginSection = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}10
  );
  border: 2px dashed ${(props) => props.theme.colors.primary}30;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  margin-top: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary}50;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary}15,
      ${(props) => props.theme.colors.secondary}15
    );
  }

  .login-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.xs};
  }

  .login-subtitle {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.875rem;
    margin-bottom: ${(props) => props.theme.spacing.lg};
    line-height: 1.5;
  }

  .google-button-container {
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  .divider {
    display: flex;
    align-items: center;
    margin: ${(props) => props.theme.spacing.lg} 0;
    position: relative;

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent,
        ${(props) => props.theme.colors.border},
        transparent
      );
    }

    span {
      padding: 0 ${(props) => props.theme.spacing.md};
      color: ${(props) => props.theme.colors.textSecondary};
      font-size: 0.75rem;
      background: ${(props) => props.theme.colors.background};
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .or-manual-text {
    font-size: 0.8125rem;
    color: ${(props) => props.theme.colors.textSecondary};
    font-weight: 500;
  }
`;

const SuccessMessage = styled.div`
  background: ${(props) => props.theme.colors.primary}10;
  border: 1px solid ${(props) => props.theme.colors.primary}30;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  text-align: center;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  gap: ${(props) => props.theme.spacing.sm};

  .user-details {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    flex: 1;
    min-width: 0; /* Permite que o texto seja truncado */
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .user-text {
    flex: 1;
    min-width: 0; /* Permite que o texto seja truncado */

    .user-name {
      font-weight: 600;
      color: ${(props) => props.theme.colors.text};
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .user-email {
      color: ${(props) => props.theme.colors.textSecondary};
      font-size: 0.75rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* Botão de sair responsivo */
  button {
    flex-shrink: 0;
    min-width: fit-content;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: ${(props) => props.theme.spacing.sm};

    .user-details {
      justify-content: center;
      text-align: center;
    }

    .user-text {
      .user-name,
      .user-email {
        white-space: normal;
        text-align: center;
      }
    }

    button {
      align-self: center;
      width: fit-content;
    }
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
  onNavigate?: (path: string) => void;
}

const BmiCalculator: React.FC<BmiCalculatorProps> = ({
  onCalculate,
  initialData,
  onNavigate,
}) => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [bmi, setBmi] = useState<number | null>(null);
  const [classification, setClassification] =
    useState<BmiClassification | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isCalculatorUnlocked, setIsCalculatorUnlocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
    trigger,
    setValue,
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

  // Carregar dados do usuário do localStorage quando montar
  useEffect(() => {
    if (isAuthenticated && user) {
      // Pré-preencher dados do Google
      setValue("name", user.name);
      setValue("email", user.email);

      // Pré-preencher WhatsApp se estiver salvo
      if (user.whatsapp) {
        setValue("whatsApp", user.whatsapp);
      }
    }
  }, [isAuthenticated, user, setValue]);

  // Verificar se os dados básicos estão preenchidos para liberar a calculadora
  useEffect(() => {
    if (isAuthenticated && user) {
      // Se logado com Google, verificar apenas WhatsApp
      const hasWhatsApp =
        watchedValues.whatsApp &&
        watchedValues.whatsApp.replace(/\D/g, "").length >= 10;

      setIsCalculatorUnlocked(hasWhatsApp);
    } else {
      // Se não logado, verificar se preencheu manualmente
      const hasBasicData =
        watchedValues.name &&
        watchedValues.email &&
        watchedValues.whatsApp &&
        watchedValues.name.length >= 2 &&
        watchedValues.email.includes("@") &&
        watchedValues.whatsApp.replace(/\D/g, "").length >= 10;

      setIsCalculatorUnlocked(hasBasicData);
    }
  }, [
    isAuthenticated,
    user,
    watchedValues.name,
    watchedValues.email,
    watchedValues.whatsApp,
    setValue,
  ]);

  // Calculate BMI whenever weight or height changes (only if calculator is unlocked)
  useEffect(() => {
    if (!isCalculatorUnlocked) return;

    const weight = parseFloat(watchedValues.weight);
    const height = parseFloat(watchedValues.height);

    if (weight > 0 && height > 0) {
      // Converter altura de cm para metros
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
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
  }, [watchedValues.weight, watchedValues.height, isCalculatorUnlocked]);

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
      setShowResult(true);
      onCalculate?.(data, bmi, classification);
    }
  };

  const resetForm = () => {
    reset();
    setBmi(null);
    setClassification(null);
    setDescription("");
    setIsCalculatorUnlocked(false);
    setShowResult(false);
  };

  const handleGoogleSuccess = (userData: {
    name: string;
    email: string;
    picture?: string;
  }) => {
    login(userData);
  };

  const handleGoogleError = (error: string) => {
    console.error("Erro no Google Login:", error);
    // Aqui você pode adicionar uma notificação de erro se quiser
  };

  const handleLogout = () => {
    // Limpar o formulário antes de fazer logout
    reset();
    setBmi(null);
    setClassification(null);
    setDescription("");
    setIsCalculatorUnlocked(false);
    setShowResult(false);

    // Fazer logout do AuthContext
    logout();
  };

  return (
    <CalculatorContainer>
      <StyledCard $variant="elevated">
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
          {!isAuthenticated && !isCalculatorUnlocked && (
            <LoginSection>
              <div className="login-title">🚀 Preenchimento Rápido</div>
              <div className="login-subtitle">
                Faça login com Google e economize tempo! <br />
                Seus dados serão preenchidos automaticamente.
              </div>
              <div className="google-button-container">
                <GoogleLoginButton
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
              </div>
              <div className="divider">
                <span>ou</span>
              </div>
              <div className="or-manual-text">
                Preencha seus dados manualmente abaixo 👇
              </div>
            </LoginSection>
          )}

          {isAuthenticated && (
            <>
              <UserInfo>
                <div className="user-details">
                  {user?.picture && (
                    <img
                      src={user.picture}
                      alt="Avatar"
                      className="user-avatar"
                    />
                  )}
                  <div className="user-text">
                    <div className="user-name">{user?.name}</div>
                    <div className="user-email">{user?.email}</div>
                  </div>
                </div>
                <StyledButton
                  $variant="outline"
                  $size="sm"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Sair
                </StyledButton>
              </UserInfo>
              {!isCalculatorUnlocked && (
                <SuccessMessage>
                  ✅ Nome e e-mail preenchidos! Agora é só preencher o WhatsApp
                  👇
                </SuccessMessage>
              )}
            </>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGrid>
              <InputGroup>
                <Label htmlFor="name">Nome Completo *</Label>
                <StyledInput
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  disabled={isAuthenticated}
                  {...register("name", {
                    required: "Nome é obrigatório",
                    minLength: {
                      value: 2,
                      message: "Nome deve ter pelo menos 2 caracteres",
                    },
                  })}
                  $error={!!errors.name}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
                {isAuthenticated && (
                  <HelperText>Preenchido automaticamente via Google</HelperText>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">E-mail *</Label>
                <StyledInput
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  disabled={isAuthenticated}
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "E-mail inválido",
                    },
                  })}
                  $error={!!errors.email}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
                {isAuthenticated && (
                  <HelperText>Preenchido automaticamente via Google</HelperText>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="whatsApp">WhatsApp *</Label>
                <PhoneInput
                  id="whatsApp"
                  placeholder="11 99999-9999"
                  value={watch("whatsApp") || ""}
                  onChange={(value) => {
                    setValue("whatsApp", value, { shouldValidate: true });

                    // Salvar WhatsApp no AuthContext quando alterado
                    if (isAuthenticated && user && value) {
                      const updatedUser = { ...user, whatsapp: value };
                      login(updatedUser);
                    }
                  }}
                  onBlur={() => {
                    trigger("whatsApp");
                  }}
                  $error={!!errors.whatsApp}
                />
                {errors.whatsApp && (
                  <ErrorMessage>{errors.whatsApp.message}</ErrorMessage>
                )}
                <HelperText>Digite apenas o DDD e número</HelperText>
                {/* Campo oculto para registro no react-hook-form */}
                <input
                  type="hidden"
                  {...register("whatsApp", {
                    required: "WhatsApp é obrigatório",
                    validate: (value) => {
                      const numbers = value.replace(/\D/g, "");
                      return (
                        numbers.length >= 10 || "Número de telefone inválido"
                      );
                    },
                  })}
                />
              </InputGroup>
            </FormGrid>

            {!isCalculatorUnlocked && (
              <LockedSection>
                <Lock size={48} className="lock-icon" />
                <div className="lock-text">
                  {isAuthenticated
                    ? "🔒 Preencha seu WhatsApp para liberar a calculadora"
                    : "🔒 Preencha seus dados acima para liberar a calculadora"}
                </div>
                <div className="lock-subtext">
                  {isAuthenticated
                    ? "WhatsApp é obrigatório para calcular o IMC"
                    : "Nome, e-mail e WhatsApp são obrigatórios"}
                </div>
              </LockedSection>
            )}

            {isCalculatorUnlocked && (
              <>
                <FormGrid>
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
                      $error={!!errors.weight}
                    />
                    {errors.weight && (
                      <ErrorMessage>{errors.weight.message}</ErrorMessage>
                    )}
                    <HelperText>Exemplo: 70.5</HelperText>
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="height">Altura (cm) *</Label>
                    <StyledInput
                      id="height"
                      type="number"
                      step="1"
                      min="50"
                      max="300"
                      placeholder="175"
                      {...register("height", {
                        required: "Altura é obrigatória",
                        min: {
                          value: 50,
                          message: "Altura deve ser maior que 50cm",
                        },
                        max: {
                          value: 300,
                          message: "Altura deve ser menor que 300cm",
                        },
                      })}
                      $error={!!errors.height}
                    />
                    {errors.height && (
                      <ErrorMessage>{errors.height.message}</ErrorMessage>
                    )}
                    <HelperText>Exemplo: 175</HelperText>
                  </InputGroup>
                </FormGrid>
              </>
            )}

            {showResult && bmi && classification && (
              <ResultSection>
                <BmiValue classification={classification}>
                  {bmi.toFixed(1)}
                </BmiValue>
                <Classification classification={classification}>
                  {classification}
                </Classification>
                <Description>{description}</Description>

                <BmiWarning>
                  <div className="warning-title">⚠️ Importante</div>
                  <div className="warning-text">
                    O IMC é apenas uma referência inicial e não deve ser a única
                    base para avaliar sua saúde. Fatores como composição
                    corporal, idade, sexo, atividade física e histórico médico
                    são fundamentais para uma avaliação completa. Consulte
                    sempre um profissional de saúde qualificado.
                  </div>
                </BmiWarning>

                <ConsultationInvite>
                  <div className="invite-title">
                    💡 Quer saber mais sobre sua saúde?
                  </div>
                  <div className="invite-text">
                    Agende uma consulta com a nutricionista Letícia Conde para
                    uma avaliação completa e personalizada do seu estado
                    nutricional.
                  </div>
                  <div className="invite-benefits">
                    <div className="benefit-item">
                      ✅ Avaliação nutricional completa
                    </div>
                    <div className="benefit-item">
                      ✅ Plano alimentar personalizado
                    </div>
                    <div className="benefit-item">
                      ✅ Acompanhamento contínuo
                    </div>
                    <div className="benefit-item">
                      ✅ Consulta online no conforto da sua casa
                    </div>
                  </div>
                  <StyledButton
                    $variant="gradient"
                    $size="lg"
                    $rounded
                    onClick={() => onNavigate?.("/pre-consulta")}
                  >
                    Agendar Consulta Agora
                  </StyledButton>
                </ConsultationInvite>
              </ResultSection>
            )}

            {isCalculatorUnlocked && (
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
                  $loading={false}
                >
                  Calcular IMC
                </StyledButton>
              </div>
            )}
          </form>
        </CardBody>
      </StyledCard>
    </CalculatorContainer>
  );
};

export default BmiCalculator;
