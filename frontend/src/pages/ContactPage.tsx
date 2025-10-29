import React, { useState } from "react";
import styled from "styled-components";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
} from "lucide-react";
import {
  StyledButton,
  StyledInput,
  StyledTextarea,
  InputGroup,
  Label,
  ErrorMessage,
} from "../components/styled";

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
  padding: ${(props) => props.theme.spacing.xl} 0;
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin-bottom: ${(props) => props.theme.spacing.xl};
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.lg};
  }
`;

const ContactInfo = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const ContactTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary}05;
    transform: translateX(4px);
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
  font-weight: 500;
`;

const ContactValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

const ContactForm = styled.form`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-top: ${(props) => props.theme.spacing.xl};
`;

const QuickActionCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.xl};
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.theme.colors.primary}30;
  }
`;

const QuickActionIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}20,
    ${(props) => props.theme.colors.secondary}20
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.primary};
  font-size: 2rem;
`;

const QuickActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const QuickActionDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpar erro quando usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Aqui você pode implementar o envio do formulário
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de agendar uma consulta nutricional.";
    const phoneNumber = "5511999999999"; // Substitua pelo número real
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const handleScheduleClick = () => {
    onNavigate?.("/pre-consulta");
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>Entre em Contato</HeroTitle>
        <HeroSubtitle>
          Estou aqui para ajudar você a alcançar seus objetivos de saúde e
          bem-estar
        </HeroSubtitle>
      </HeroSection>

      <ContentGrid>
        <ContactInfo>
          <ContactTitle>Informações de Contato</ContactTitle>

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

          <ContactItem>
            <ContactIcon>
              <Clock size={20} />
            </ContactIcon>
            <ContactText>
              <ContactLabel>Horário de Atendimento</ContactLabel>
              <ContactValue>Segunda a Sexta: 8h às 18h</ContactValue>
            </ContactText>
          </ContactItem>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Envie sua Mensagem</FormTitle>

          <FormGrid>
            <InputGroup>
              <Label htmlFor="name">Nome *</Label>
              <StyledInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                $error={!!errors.name}
                placeholder="Seu nome completo"
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">E-mail *</Label>
              <StyledInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                $error={!!errors.email}
                placeholder="seu@email.com"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputGroup>
          </FormGrid>

          <FormGrid>
            <InputGroup>
              <Label htmlFor="phone">Telefone *</Label>
              <StyledInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                $error={!!errors.phone}
                placeholder="(11) 99999-9999"
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="subject">Assunto *</Label>
              <StyledInput
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                $error={!!errors.subject}
                placeholder="Assunto da sua mensagem"
              />
              {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
            </InputGroup>
          </FormGrid>

          <InputGroup>
            <Label htmlFor="message">Mensagem *</Label>
            <StyledTextarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              $error={!!errors.message}
              placeholder="Conte-me como posso ajudar você..."
              rows={5}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </InputGroup>

          <FormActions>
            <StyledButton
              type="button"
              $variant="outline"
              onClick={() =>
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  subject: "",
                  message: "",
                })
              }
            >
              Limpar
            </StyledButton>
            <StyledButton type="submit" $variant="primary">
              <Send size={16} style={{ marginRight: "8px" }} />
              Enviar Mensagem
            </StyledButton>
          </FormActions>
        </ContactForm>
      </ContentGrid>

      <QuickActions>
        <QuickActionCard onClick={handleWhatsAppClick}>
          <QuickActionIcon>
            <MessageCircle size={32} />
          </QuickActionIcon>
          <QuickActionTitle>WhatsApp</QuickActionTitle>
          <QuickActionDescription>
            Fale comigo diretamente pelo WhatsApp para agendamentos e dúvidas
            rápidas
          </QuickActionDescription>
        </QuickActionCard>

        <QuickActionCard onClick={handleScheduleClick}>
          <QuickActionIcon>
            <Calendar size={32} />
          </QuickActionIcon>
          <QuickActionTitle>Agendar Consulta</QuickActionTitle>
          <QuickActionDescription>
            Agende sua consulta online de forma rápida e prática
          </QuickActionDescription>
        </QuickActionCard>
      </QuickActions>
    </PageContainer>
  );
};

export default ContactPage;
