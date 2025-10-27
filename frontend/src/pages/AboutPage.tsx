import React from "react";
import styled from "styled-components";
import { User, Award, Heart, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Container } from "../components/styled";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.lg};
`;

const HeroSection = styled.section`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}10,
    ${(props) => props.theme.colors.secondary}05
  );
  padding: ${(props) => props.theme.spacing.xxl} 0;
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  text-align: center;
`;

const AboutCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}20,
    ${(props) => props.theme.colors.secondary}20
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${(props) => props.theme.colors.primary};
  border: 4px solid ${(props) => props.theme.colors.primary}30;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    font-size: 3rem;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const ProfileTitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const ProfileDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin: ${(props) => props.theme.spacing.xl} 0;
`;

const StatCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}20,
    ${(props) => props.theme.colors.secondary}20
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.primary};
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 500;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary}05;
    border-color: ${(props) => props.theme.colors.primary}30;
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}20,
    ${(props) => props.theme.colors.secondary}20
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary};
  flex-shrink: 0;
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const ContactValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
`;

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>Sobre Letícia Conde</HeroTitle>
        <HeroSubtitle>
          Nutricionista especializada em atendimento personalizado e cuidado
          integral da sua saúde
        </HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <AboutCard>
          <ProfileSection>
            <ProfileImage>👩‍⚕️</ProfileImage>
            <ProfileInfo>
              <ProfileName>Letícia Conde</ProfileName>
              <ProfileTitle>Nutricionista Clínica e Esportiva</ProfileTitle>
              <ProfileDescription>
                Formada em Nutrição pela Universidade Federal, com
                especialização em Nutrição Clínica e Esportiva. Atuo há mais de
                5 anos ajudando pessoas a transformarem suas vidas através de
                uma alimentação equilibrada e personalizada. Minha missão é
                proporcionar cuidado nutricional de qualidade, sempre
                respeitando as individualidades e necessidades de cada paciente.
              </ProfileDescription>
            </ProfileInfo>
          </ProfileSection>
        </AboutCard>

        <SectionTitle>Minha Experiência</SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatIcon>
              <Award size={24} />
            </StatIcon>
            <StatNumber>5+</StatNumber>
            <StatLabel>Anos de Experiência</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>
              <User size={24} />
            </StatIcon>
            <StatNumber>500+</StatNumber>
            <StatLabel>Pacientes Atendidos</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>
              <Heart size={24} />
            </StatIcon>
            <StatNumber>98%</StatNumber>
            <StatLabel>Satisfação dos Pacientes</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>
              <Clock size={24} />
            </StatIcon>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Suporte Disponível</StatLabel>
          </StatCard>
        </StatsGrid>

        <AboutCard>
          <SectionTitle>Minha Abordagem</SectionTitle>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "var(--text-secondary)",
            }}
          >
            Acredito que a nutrição vai muito além de dietas restritivas. Meu
            trabalho é baseado em uma abordagem humanizada, onde cada paciente é
            único e merece um plano alimentar personalizado que se adapte ao seu
            estilo de vida, preferências e objetivos. Utilizo as mais recentes
            evidências científicas para garantir resultados eficazes e
            sustentáveis a longo prazo.
          </p>
        </AboutCard>

        <SectionTitle>Entre em Contato</SectionTitle>
        <ContactInfo>
          <ContactItem>
            <ContactIcon>
              <Phone size={20} />
            </ContactIcon>
            <ContactText>
              <ContactLabel>WhatsApp</ContactLabel>
              <ContactValue>(11) 99999-9999</ContactValue>
            </ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <Mail size={20} />
            </ContactIcon>
            <ContactText>
              <ContactLabel>E-mail</ContactLabel>
              <ContactValue>leticia@nutricionista.com</ContactValue>
            </ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <MapPin size={20} />
            </ContactIcon>
            <ContactText>
              <ContactLabel>Atendimento</ContactLabel>
              <ContactValue>100% Online</ContactValue>
            </ContactText>
          </ContactItem>
        </ContactInfo>
      </ContentSection>
    </PageContainer>
  );
};

export default AboutPage;
