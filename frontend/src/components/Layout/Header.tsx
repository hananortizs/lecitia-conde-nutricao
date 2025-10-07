import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { StyledButton } from "../styled/Button";

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 0.0625rem solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing.xs} 0; /* Mobile pequeno (320-479px) */
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(0.625rem); /* 10px */
  background-color: ${(props) => props.theme.colors.background}dd;

  @media (min-width: 480px) {
    padding: ${(props) => props.theme.spacing.sm} 0; /* Mobile grande (480-767px) */
  }

  @media (min-width: 768px) {
    padding: ${(props) => props.theme.spacing.md} 0; /* Desktop (768px+) */
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.xs}; /* Mobile pequeno (320-479px) */
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0 ${(props) => props.theme.spacing.sm}; /* Mobile grande (480-767px) */
  }

  @media (min-width: 768px) {
    padding: 0 ${(props) => props.theme.spacing.lg}; /* Desktop (768px+) */
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs}; /* Mobile pequeno - gap menor */
  font-size: 0.875rem; /* Mobile pequeno (320-479px) */
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }

  @media (min-width: 480px) {
    gap: ${(props) => props.theme.spacing.sm}; /* Mobile grande - gap maior */
    font-size: 1.125rem; /* Mobile grande (480-767px) */
  }

  @media (min-width: 768px) {
    font-size: 1.5rem; /* Desktop (768px+) */
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  /* Mobile pequeno e grande - escondido por padrão */
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.background};
  flex-direction: column;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.lg}; /* Mobile pequeno - gap menor */
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  z-index: 1001;

  @media (min-width: 480px) {
    gap: ${(props) => props.theme.spacing.xl}; /* Mobile grande - gap maior */
  }

  @media (min-width: 768px) {
    /* Desktop - visível e horizontal */
    display: flex;
    position: static;
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.lg};
    transform: none;
    background-color: transparent;
  }
`;

const NavLink = styled.a<{ $isActive?: boolean }>`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md}; /* Mobile pequeno - padding menor */
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  font-size: 1rem; /* Mobile pequeno (320-479px) */
  cursor: pointer;
  position: relative;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.primary}10;
  }

  @media (min-width: 480px) {
    padding: ${(props) => props.theme.spacing.md}
      ${(props) => props.theme.spacing.lg}; /* Mobile grande - padding maior */
    font-size: 1.25rem; /* Mobile grande (480-767px) */
  }

  @media (min-width: 768px) {
    font-size: 1rem; /* Desktop (768px+) */
    padding: ${(props) => props.theme.spacing.sm}
      ${(props) => props.theme.spacing.md}; /* Desktop - padding menor */
  }

  /* Marcação da página ativa */
  ${(props) =>
    props.$isActive &&
    `
    color: ${props.theme.colors.primary};
    font-weight: 600;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 0.375rem;
      height: 0.375rem;
      background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary});
      border-radius: 50%;
      box-shadow: 0 0 0.5rem ${props.theme.colors.primary}40;
    }
  `}
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const MobileMenuButton = styled.button`
  /* Mobile first - visível por padrão */
  display: block;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};

  @media (min-width: 768px) {
    display: none; /* Desktop - escondido */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${(props) => props.theme.spacing.lg};
  right: ${(props) => props.theme.spacing.lg};
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};
  display: block; /* Mobile first - visível por padrão */

  @media (min-width: 768px) {
    display: none; /* Desktop - escondido */
  }
`;

interface HeaderProps {
  onNavigate?: (path: string) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { isDark, toggleTheme, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavClick = (path: string) => {
    onNavigate?.(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Função para determinar se um link está ativo
  const isActivePage = (path: string) => {
    const page = path.replace("/", "") || "home";
    return currentPage === page;
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <HeaderContent>
          <Logo onClick={() => handleNavClick("/")}>
            🥗 Letícia Conde Nutricionista
          </Logo>

          <Nav $isOpen={isMobileMenuOpen}>
            <CloseButton onClick={toggleMobileMenu}>
              <X size={24} />
            </CloseButton>

            <NavLink
              onClick={() => handleNavClick("/")}
              $isActive={isActivePage("/")}
            >
              Início
            </NavLink>
            <NavLink
              onClick={() => handleNavClick("/pre-consulta")}
              $isActive={isActivePage("/pre-consulta")}
            >
              Agendar Consulta
            </NavLink>
            <NavLink
              onClick={() => handleNavClick("/sobre")}
              $isActive={isActivePage("/sobre")}
            >
              Sobre
            </NavLink>
            <NavLink
              onClick={() => handleNavClick("/contato")}
              $isActive={isActivePage("/contato")}
            >
              Contato
            </NavLink>
          </Nav>

          <HeaderActions>
            <StyledButton
              $variant="ghost"
              $size="sm"
              onClick={toggleTheme}
              aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </StyledButton>

            <MobileMenuButton onClick={toggleMobileMenu}>
              <Menu size={24} />
            </MobileMenuButton>
          </HeaderActions>
        </HeaderContent>
      </HeaderContainer>
    </ThemeProvider>
  );
};

export default Header;
