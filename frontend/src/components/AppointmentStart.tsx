import React, { useState } from "react";
import styled from "styled-components";
import {
  MessageCircle,
  Clock,
  ShieldCheck,
  Phone,
  Calendar,
} from "lucide-react";
import { StyledButton } from "./styled/Button";
import { StyledCard, CardHeader, CardBody } from "./styled/Card";

const StartContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing.md};
  }
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};

  h1 {
    font-size: 2rem;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.sm};
    font-weight: 700;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.125rem;
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const OptionCard = styled.div<{ $isHighlighted?: boolean }>`
  background: ${(props) => props.theme.colors.background};
  border: 2px solid
    ${(props) =>
      props.$isHighlighted
        ? props.theme.colors.primary
        : props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: ${(props) => props.theme.spacing.xl};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: ${(props) => props.theme.colors.primary};
  }

  ${(props) =>
    props.$isHighlighted &&
    `
    background: linear-gradient(135deg, ${props.theme.colors.primary}10, ${props.theme.colors.secondary}05);
  `}

  .recommendation-badge {
    position: absolute;
    top: ${(props) => props.theme.spacing.xs};
    right: ${(props) => props.theme.spacing.xs};
    background: ${(props) => props.theme.colors.success};
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 1rem;
    font-size: 0.7rem;
    font-weight: 600;
    z-index: 10;

    @media (min-width: 480px) {
      top: ${(props) => props.theme.spacing.sm};
      right: ${(props) => props.theme.spacing.sm};
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
    }
  }

  .option-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary}20,
      ${(props) => props.theme.colors.secondary}20
    );
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${(props) => props.theme.spacing.sm} auto
      ${(props) => props.theme.spacing.md};
    color: ${(props) => props.theme.colors.primary};

    @media (min-width: 480px) {
      width: 64px;
      height: 64px;
      margin: 0 auto ${(props) => props.theme.spacing.lg};
    }
  }

  .option-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.sm};
    text-align: center;
    line-height: 1.2;

    @media (min-width: 480px) {
      font-size: 1.5rem;
    }
  }

  .option-description {
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.5;
    margin-bottom: ${(props) => props.theme.spacing.md};
    text-align: center;
    font-size: 0.9rem;
    padding: 0 ${(props) => props.theme.spacing.xs};

    @media (min-width: 480px) {
      font-size: 1rem;
      margin-bottom: ${(props) => props.theme.spacing.lg};
      padding: 0;
    }
  }

  .option-benefits {
    list-style: none;
    padding: 0;
    margin: ${(props) => props.theme.spacing.sm} 0;
    padding: 0 ${(props) => props.theme.spacing.xs};

    @media (min-width: 480px) {
      padding: 0;
    }

    li {
      display: flex;
      align-items: center;
      gap: ${(props) => props.theme.spacing.xs};
      color: ${(props) => props.theme.colors.textSecondary};
      margin-bottom: ${(props) => props.theme.spacing.xs};
      font-size: 0.8rem;

      @media (min-width: 480px) {
        gap: ${(props) => props.theme.spacing.sm};
        font-size: 0.9rem;
      }

      &::before {
        content: "✓";
        color: ${(props) => props.theme.colors.success};
        font-weight: 700;
        font-size: 1rem;

        @media (min-width: 480px) {
          font-size: 1.2rem;
        }
      }
    }
  }

  .option-button-wrapper {
    margin-top: ${(props) => props.theme.spacing.md};

    @media (min-width: 480px) {
      margin-top: ${(props) => props.theme.spacing.lg};
    }

    @media (min-width: 768px) {
      margin-top: auto;
      display: flex;
      align-items: flex-end;
    }
  }
`;

const RecurringInfo = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}05
  );
  border: 1px solid ${(props) => props.theme.colors.primary}30;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: ${(props) => props.theme.spacing.lg};
    gap: ${(props) => props.theme.spacing.md};
  }

  .icon {
    flex-shrink: 0;
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.25rem;

    @media (min-width: 480px) {
      font-size: 1.5rem;
    }
  }

  .content {
    flex: 1;
    min-width: 0;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: ${(props) => props.theme.colors.text};
      margin-bottom: ${(props) => props.theme.spacing.xs};

      @media (min-width: 480px) {
        font-size: 1.125rem;
      }
    }

    p {
      font-size: 0.8rem;
      color: ${(props) => props.theme.colors.textSecondary};
      line-height: 1.5;
      margin: 0;

      @media (min-width: 480px) {
        font-size: 0.9rem;
      }
    }
  }
`;

interface AppointmentStartProps {
  onStartForm: () => void;
  onWhatsApp: (phone: string) => void;
  clientName?: string;
  isRecurring?: boolean;
}

const AppointmentStart: React.FC<AppointmentStartProps> = ({
  onStartForm,
  onWhatsApp,
  clientName,
  isRecurring = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const whatsappNumber = "5511999999999"; // Substituir pelo número real
  const whatsappMessage = encodeURIComponent(
    isRecurring
      ? `Olá Letícia! Olá ${clientName}! Gostaria de agendar uma nova consulta.`
      : "Olá! Gostaria de agendar uma consulta nutricional."
  );

  const handleCardClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleWhatsAppButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Não disparar o click do card
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank"
    );
    onWhatsApp(whatsappNumber);
  };

  const handleStartFormButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Não disparar o click do card
    onStartForm();
  };

  return (
    <StartContainer>
      <WelcomeSection>
        <h1>
          {isRecurring && clientName
            ? `Bem-vindo de volta, ${clientName}!`
            : "Agende sua Consulta"}
        </h1>
        <p>
          {isRecurring
            ? "Escolha a melhor forma de agendar sua próxima consulta"
            : "Como prefere agendar sua consulta?"}
        </p>
      </WelcomeSection>

      {isRecurring && (
        <RecurringInfo>
          <Clock size={24} className="icon" />
          <div className="content">
            <h3>Cliente Recorrente</h3>
            <p>
              Você já realizou consultas anteriormente. Agende via WhatsApp para
              um atendimento mais rápido e personalizado.
            </p>
          </div>
        </RecurringInfo>
      )}

      <OptionsGrid>
        {/* Opção Site - Primeira Consulta */}
        <OptionCard
          $isHighlighted={selectedOption === "site"}
          onClick={() => handleCardClick("site")}
        >
          <div className="recommendation-badge">
            Indicado para novos clientes
          </div>
          <div className="option-icon">
            <Calendar size={32} />
          </div>
          <h2 className="option-title">Agendar via Site</h2>
          <p className="option-description">
            {isRecurring
              ? "Preencha o formulário completo para nova consulta"
              : "Sistema completo com formulário detalhado"}
          </p>
          <ul className="option-benefits">
            <li>Formulário completo de anamnese</li>
            <li>Seleção de horário online</li>
            <li>Pagamento integrado</li>
            <li>Confirmação automática</li>
          </ul>
          <div className="option-button-wrapper">
            <StyledButton
              $variant={selectedOption === "site" ? "primary" : "outline"}
              $size="lg"
              $fullWidth={true}
              onClick={handleStartFormButtonClick}
            >
              <Calendar size={20} />
              Começar Agendamento
            </StyledButton>
          </div>
        </OptionCard>

        {/* Opção WhatsApp */}
        <OptionCard
          $isHighlighted={selectedOption === "whatsapp"}
          onClick={() => handleCardClick("whatsapp")}
        >
          {selectedOption === "whatsapp" && (
            <div className="recommendation-badge">Selecionado</div>
          )}
          <div className="option-icon">
            <MessageCircle size={32} />
          </div>
          <h2 className="option-title">Agendar via WhatsApp</h2>
          <p className="option-description">
            {isRecurring
              ? "Forma mais rápida e personalizada para clientes recorrentes"
              : "Agende diretamente pelo WhatsApp com resposta rápida"}
          </p>
          <ul className="option-benefits">
            <li>Atendimento imediato</li>
            <li>Esclarecimento de dúvidas na hora</li>
            <li>Confirmação na mesma conversa</li>
            <li>Lembretes automáticos</li>
          </ul>
          <div className="option-button-wrapper">
            <StyledButton
              $variant={selectedOption === "whatsapp" ? "primary" : "outline"}
              $size="lg"
              $fullWidth={true}
              onClick={handleWhatsAppButtonClick}
            >
              <MessageCircle size={20} />
              Abrir WhatsApp
            </StyledButton>
          </div>
        </OptionCard>
      </OptionsGrid>

      <StyledCard>
        <CardHeader>
          <h3>Qual opção escolher?</h3>
        </CardHeader>
        <CardBody>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
              <MessageCircle size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>WhatsApp</strong>
                <p style={{ fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
                  Ideal para clientes recorrentes. Resposta rápida, conversa
                  natural e confirmação na hora.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
              <Calendar size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>Site</strong>
                <p style={{ fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
                  Perfeito para novos clientes. Formulário completo, horários
                  disponíveis e pagamento integrado.
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </StyledCard>
    </StartContainer>
  );
};

export default AppointmentStart;
