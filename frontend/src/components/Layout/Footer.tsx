import React from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.background};
  border-top: 0.0625rem solid ${(props) => props.theme.colors.border};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl}
    ${(props) => props.theme.spacing.lg};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.xl};
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: ${(props) => props.theme.spacing.md};
    font-size: 1.125rem;
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }

  a {
    display: block;
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.6;
    margin-bottom: ${(props) => props.theme.spacing.sm};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.textSecondary};

  svg {
    color: ${(props) => props.theme.colors.primary};
    flex-shrink: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.md};

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.primary}20;
    border-radius: 50%;
    color: ${(props) => props.theme.colors.primary};
    transition: all 0.2s ease;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 0.0625rem solid ${(props) => props.theme.colors.border};
  padding-top: ${(props) => props.theme.spacing.lg};
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <FooterContainer>
        <FooterContent>
          <FooterGrid>
            <FooterSection>
              <Logo>🥗 Letícia Conde Nutricionista</Logo>
              <p>
                Especialista em nutrição clínica e funcional, oferecendo
                consultas online personalizadas para ajudar você a alcançar seus
                objetivos de saúde.
              </p>
              <SocialLinks>
                <a href="#" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </SocialLinks>
            </FooterSection>

            <FooterSection>
              <h3>Contato</h3>
              <ContactItem>
                <Mail size={16} />
                <span>leticia@nutricionista.com</span>
              </ContactItem>
              <ContactItem>
                <Phone size={16} />
                <span>(11) 99999-9999</span>
              </ContactItem>
              <ContactItem>
                <MapPin size={16} />
                <span>São Paulo, SP</span>
              </ContactItem>
            </FooterSection>

            <FooterSection>
              <h3>Serviços</h3>
              <a href="#">Consulta Nutricional Online</a>
              <a href="#">Plano Alimentar Personalizado</a>
              <a href="#">Acompanhamento de IMC</a>
              <a href="#">Educação Nutricional</a>
              <a href="#">Suporte via WhatsApp</a>
            </FooterSection>

            <FooterSection>
              <h3>Horários de Atendimento</h3>
              <p>
                <strong>Segunda a Quinta:</strong>
                <br />
                17:00h às 22:00h
              </p>
              <p>
                <strong>Domingo:</strong>
                <br />
                Horário aberto
              </p>
              <p>
                <strong>Sexta e Sábado:</strong>
                <br />
                Não atendemos (Sabbat)
              </p>
            </FooterSection>
          </FooterGrid>

          <FooterBottom>
            <p>
              © 2024 Letícia Conde Nutricionista. Todos os direitos reservados.
            </p>
            <p>CRN: 12345 | Conselho Regional de Nutricionistas - 3ª Região</p>
          </FooterBottom>
        </FooterContent>
      </FooterContainer>
    </ThemeProvider>
  );
};

export default Footer;
