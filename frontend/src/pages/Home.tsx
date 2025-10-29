import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ArrowRight,
  Calculator,
  Calendar,
  Heart,
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { StyledButton } from "../components/styled/Button";
import { StyledCard, CardGrid, FeatureCard } from "../components/styled/Card";
import { Container } from "../components/styled/Container";
import BmiCalculator from "../components/BmiCalculator";

const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}08,
    ${(props) => props.theme.colors.secondary}08,
    ${(props) => props.theme.colors.accent}05
  );
  padding: ${(props) => props.theme.fluid.spacing.xl} 0;
  text-align: center;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Animated background elements */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
        circle at 20% 80%,
        ${(props) => props.theme.colors.primary}10 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        ${(props) => props.theme.colors.secondary}10 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        ${(props) => props.theme.colors.accent}08 0%,
        transparent 50%
      );
    animation: float 20s ease-in-out infinite;
    z-index: 0;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    33% {
      transform: translateY(-20px) rotate(1deg);
    }
    66% {
      transform: translateY(10px) rotate(-1deg);
    }
  }

  /* Grid pattern overlay */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.1) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.3;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const HeroContent = styled(Container)`
  max-width: 60rem; /* 960px */
  text-align: center;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: ${(props) => props.theme.fluid.typography.h1};
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.text} 0%,
    ${(props) => props.theme.colors.primary} 50%,
    ${(props) => props.theme.colors.secondary} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${(props) => props.theme.fluid.spacing.lg};
  line-height: 1.1;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  position: relative;
  animation: fadeInUp 1s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.accent}
    );
    border-radius: 2px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${(props) => props.theme.fluid.typography.large};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.fluid.spacing.xl};
  line-height: 1.7;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 1s ease-out 0.2s both;
`;

const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.fluid.spacing.md};
  align-items: center;
  animation: fadeInUp 1s ease-out 0.4s both;

  ${({ theme }) => theme.mq.up("md")} {
    flex-direction: row;
    gap: ${(props) => props.theme.fluid.spacing.lg};
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const FeaturesSection = styled.section`
  padding: ${(props) => props.theme.fluid.spacing.xl} 0;
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.colors.background} 0%,
    ${(props) => props.theme.colors.background}f8 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fluid.typography.h2};
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.text} 0%,
    ${(props) => props.theme.colors.primary} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${(props) => props.theme.fluid.spacing.lg};
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  position: relative;
  animation: fadeInUp 0.8s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.primary},
      ${(props) => props.theme.colors.accent}
    );
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: ${(props) => props.theme.fluid.typography.large};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.fluid.spacing.xl};
  max-width: 45rem; /* 720px */
  margin-left: auto;
  margin-right: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  animation: fadeInUp 0.8s ease-out 0.2s both;
`;

const StatsSection = styled.section`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );
  color: white;
  padding: ${(props) => props.theme.spacing.xl} 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};
`;

const StatItem = styled.div`
  text-align: center;

  .stat-number {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }

  .stat-label {
    font-size: 1.125rem;
    opacity: 0.9;
  }
`;

const BmiSection = styled.section`
  padding: ${(props) => props.theme.fluid.spacing.xl} 0;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.background} 0%,
    ${(props) => props.theme.colors.background}f8 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const CtaSection = styled.section`
  padding: ${(props) => props.theme.spacing.xl} 0;
  background-color: ${(props) => props.theme.colors.background};
  text-align: center;
`;

const CtaCard = styled(StyledCard)`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${(props) => props.theme.spacing.lg} 0;
  text-align: left;

  li {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    margin-bottom: ${(props) => props.theme.spacing.md};
    color: ${(props) => props.theme.colors.textSecondary};

    svg {
      color: ${(props) => props.theme.colors.success};
      flex-shrink: 0;
    }
  }
`;

interface HomeProps {
  onNavigate?: (path: string) => void;
}

const Home: React.FC<HomeProps> = React.memo(({ onNavigate }) => {
  const [showBmiCalculator, setShowBmiCalculator] = useState(false);
  const bmiSectionRef = React.useRef<HTMLElement>(null);

  // Garantir que a página sempre comece no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetStarted = () => {
    setShowBmiCalculator(true);

    // Fazer scroll suave até a seção da calculadora após um pequeno delay
    // para garantir que o componente foi renderizado
    setTimeout(() => {
      if (bmiSectionRef.current) {
        bmiSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleScheduleAppointment = () => {
    onNavigate?.("/pre-consulta");
  };

  const handleBmiCalculate = async () => {
    // Salvar dados do IMC (opcional)
    // O resultado já é mostrado na própria calculadora
    // Não precisa de alert nem redirecionamento automático
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Sua jornada para uma vida mais saudável começa aqui
          </HeroTitle>
          <HeroSubtitle>
            Descubra seu IMC, receba orientações personalizadas e agende sua
            consulta com a nutricionista Letícia Conde. Cuidado especializado no
            conforto da sua casa.
          </HeroSubtitle>
          <HeroActions>
            <StyledButton
              $variant="gradient"
              $size="lg"
              $rounded
              $shadow
              onClick={handleGetStarted}
            >
              <Sparkles size={20} />
              Calcular IMC Gratuitamente
              <ArrowRight size={20} />
            </StyledButton>
            <StyledButton
              $variant="glass"
              $size="lg"
              $rounded
              onClick={handleScheduleAppointment}
            >
              <Calendar size={20} />
              Agendar Consulta
            </StyledButton>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Por que escolher a Letícia Conde?</SectionTitle>
          <SectionSubtitle>
            Especialista em nutrição clínica com anos de experiência e
            atendimento humanizado
          </SectionSubtitle>

          <CardGrid $columns={3}>
            <FeatureCard>
              <div className="feature-icon">
                <Calculator size={28} />
              </div>
              <h3 className="feature-title">Calculadora de IMC</h3>
              <p className="feature-description">
                Descubra seu Índice de Massa Corporal e receba orientações
                personalizadas baseadas nos padrões da OMS.
              </p>
              <div className="feature-badge">
                <Zap size={16} />
                Instantâneo
              </div>
            </FeatureCard>

            <FeatureCard>
              <div className="feature-icon">
                <Calendar size={28} />
              </div>
              <h3 className="feature-title">Agendamento Online</h3>
              <p className="feature-description">
                Agende sua consulta de forma rápida e prática, respeitando
                horários especiais e o período de Sabbat.
              </p>
              <div className="feature-badge">
                <Shield size={16} />
                Seguro
              </div>
            </FeatureCard>

            <FeatureCard>
              <div className="feature-icon">
                <Heart size={28} />
              </div>
              <h3 className="feature-title">Atendimento Personalizado</h3>
              <p className="feature-description">
                Consultas online individuais com plano alimentar personalizado e
                acompanhamento contínuo.
              </p>
              <div className="feature-badge">
                <CheckCircle size={16} />
                Personalizado
              </div>
            </FeatureCard>
          </CardGrid>
        </Container>
      </FeaturesSection>

      {showBmiCalculator && (
        <BmiSection ref={bmiSectionRef}>
          <Container>
            <SectionTitle>Calculadora de IMC</SectionTitle>
            <SectionSubtitle>
              Descubra seu Índice de Massa Corporal e receba orientações
              personalizadas
            </SectionSubtitle>
            <BmiCalculator
              onCalculate={handleBmiCalculate}
              onNavigate={onNavigate}
            />
          </Container>
        </BmiSection>
      )}

      <StatsSection>
        <StatsGrid>
          <StatItem>
            <div className="stat-number">500+</div>
            <div className="stat-label">Pacientes Atendidos</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">5+</div>
            <div className="stat-label">Anos de Experiência</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfação dos Pacientes</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">24/7</div>
            <div className="stat-label">Suporte via WhatsApp</div>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <CtaSection>
        <div className="container">
          <CtaCard>
            <h2>Pronto para transformar sua vida?</h2>
            <p>
              Comece sua jornada de saúde hoje mesmo. Calcule seu IMC
              gratuitamente e agende sua consulta com uma das melhores
              nutricionistas de São Paulo.
            </p>

            <BenefitsList>
              <li>
                <CheckCircle size={20} />
                <span>Consulta online no conforto da sua casa</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Plano alimentar personalizado</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Acompanhamento contínuo via WhatsApp</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Respeito aos horários especiais (Sabbat)</span>
              </li>
            </BenefitsList>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <StyledButton
                $variant="primary"
                $size="lg"
                onClick={handleGetStarted}
              >
                Começar Agora
                <ArrowRight size={20} />
              </StyledButton>
              <StyledButton
                $variant="outline"
                $size="lg"
                onClick={handleScheduleAppointment}
              >
                Agendar Consulta
                <Calendar size={20} />
              </StyledButton>
            </div>
          </CtaCard>
        </div>
      </CtaSection>
    </>
  );
});

export default Home;
