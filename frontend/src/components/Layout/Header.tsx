import React, { useEffect, useRef } from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { StyledButton } from "../styled/Button";

// Animações
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

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
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  height: 100vh;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.background}98,
    ${(props) => props.theme.colors.background}95
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(100%)"};
  animation: ${(props) => (props.$isOpen ? slideInFromRight : slideOutToRight)}
    0.3s ease-out;
  z-index: 1001;
  padding: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  border-left: 1px solid ${(props) => props.theme.colors.border}30;

  @media (min-width: 480px) {
    width: 360px;
  }

  @media (min-width: 768px) {
    /* Desktop - visível e horizontal */
    display: flex;
    position: static;
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.lg};
    transform: none;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    animation: none;
    padding: 0;
    width: auto;
    height: auto;
    overflow: visible;
    box-shadow: none;
    border-left: none;
  }
`;

const NavLink = styled.a<{ $isActive?: boolean }>`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${(props) => props.theme.spacing.lg}
    ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.125rem;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 56px;
  animation: ${scaleIn} 0.3s ease-out;
  animation-delay: ${(props) => (props.$isActive ? "0s" : "0.1s")};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-tap-highlight-color: transparent; /* Remove highlight no mobile */
  touch-action: manipulation; /* Melhora responsividade do touch */
  user-select: none; /* Previne seleção de texto acidental */
  pointer-events: auto; /* Garante que seja clicável */
  z-index: 10; /* Garante que esteja acima de outros elementos */
  border-left: 3px solid transparent;
  margin-left: ${(props) => props.theme.spacing.sm};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.primary}10,
      ${(props) => props.theme.colors.primary}05
    );
    transform: translateX(8px);
    box-shadow: 0 4px 15px ${(props) => props.theme.colors.primary}15;
    border-left-color: ${(props) => props.theme.colors.primary}50;
  }

  &:active {
    transform: translateX(4px);
  }

  @media (min-width: 480px) {
    font-size: 1.25rem;
    min-height: 64px;
    padding: ${(props) => props.theme.spacing.xl}
      ${(props) => props.theme.spacing.lg};
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    min-width: auto;
    width: auto;
    min-height: auto;
    padding: ${(props) => props.theme.spacing.sm}
      ${(props) => props.theme.spacing.md};
    animation: none;
    white-space: normal;
    text-align: center;
    justify-content: center;
    border-left: none;
    margin-left: 0;

    &:hover {
      transform: translateY(-2px);
      border-left-color: transparent;
    }

    &:active {
      transform: translateY(0);
    }
  }

  /* Marcação da página ativa */
  ${(props) =>
    props.$isActive &&
    `
    color: ${props.theme.colors.primary};
    font-weight: 600;
    background: linear-gradient(
      135deg,
      ${props.theme.colors.primary}15,
      ${props.theme.colors.primary}08
    );
    border-left-color: ${props.theme.colors.primary};
    transform: translateX(4px);
    
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

const MobileMenuButton = styled.button<{ $isOpen: boolean }>`
  display: block;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1002;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}10;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const HamburgerIcon = styled.div<{ $isOpen: boolean }>`
  width: 24px;
  height: 18px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.3s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${(props) => props.theme.colors.text};
    border-radius: 1px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:nth-child(1) {
      top: 0px;
      transform: ${(props) =>
        props.$isOpen
          ? "rotate(45deg) translate(5px, 5px)"
          : "rotate(0deg) translate(0px, 0px)"};
    }

    &:nth-child(2) {
      top: 8px;
      opacity: ${(props) => (props.$isOpen ? "0" : "1")};
      transform: ${(props) =>
        props.$isOpen ? "translateX(20px)" : "translateX(0px)"};
    }

    &:nth-child(3) {
      top: 16px;
      transform: ${(props) =>
        props.$isOpen
          ? "rotate(-45deg) translate(5px, -5px)"
          : "rotate(0deg) translate(0px, 0px)"};
    }
  }
`;

// Alternativa: Hamburger que vira seta
const ArrowIcon = styled.div<{ $isOpen: boolean }>`
  width: 24px;
  height: 18px;
  position: relative;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 2px;
    background: ${(props) => props.theme.colors.text};
    border-radius: 1px;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::before {
    width: 12px;
    top: 6px;
    left: 0;
    transform: ${(props) =>
      props.$isOpen
        ? "rotate(45deg) translate(2px, 2px)"
        : "rotate(0deg) translate(0px, 0px)"};
  }

  &::after {
    width: 12px;
    top: 10px;
    left: 0;
    transform: ${(props) =>
      props.$isOpen
        ? "rotate(-45deg) translate(2px, -2px)"
        : "rotate(0deg) translate(0px, 0px)"};
  }
`;

// Alternativa: Hamburger com animação de "pulse"
const PulseIcon = styled.div<{ $isOpen: boolean }>`
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${(props) => props.theme.colors.text};
    border-radius: 1px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:nth-child(1) {
      top: 0px;
      transform: ${(props) =>
        props.$isOpen
          ? "rotate(45deg) translate(6px, 6px)"
          : "rotate(0deg) translate(0px, 0px)"};
    }

    &:nth-child(2) {
      top: 8px;
      opacity: ${(props) => (props.$isOpen ? "0" : "1")};
      transform: ${(props) => (props.$isOpen ? "scale(0)" : "scale(1)")};
    }

    &:nth-child(3) {
      top: 16px;
      transform: ${(props) =>
        props.$isOpen
          ? "rotate(-45deg) translate(6px, -6px)"
          : "rotate(0deg) translate(0px, 0px)"};
    }
  }

  ${(props) =>
    !props.$isOpen &&
    `
    animation: pulse 2s infinite;
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `}
`;

const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
  padding: ${(props) => props.theme.spacing.xxl}
    ${(props) => props.theme.spacing.lg} ${(props) => props.theme.spacing.xl};
  flex: 1;
  pointer-events: auto; /* Garante que seja clicável */
  z-index: 10; /* Garante que esteja acima de outros elementos */

  @media (min-width: 480px) {
    gap: ${(props) => props.theme.spacing.md};
    padding: ${(props) => props.theme.spacing.xxl}
      ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.xl};
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.lg};
    padding: 0;
    flex: none;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
  animation: ${(props) => (props.$isOpen ? fadeIn : "none")} 0.3s ease-out;
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};

  @media (min-width: 768px) {
    display: none;
  }
`;

interface HeaderProps {
  onNavigate?: (path: string) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { isDark, toggleTheme, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handleNavClick = (path: string) => {
    console.log("Navigation clicked:", path); // Debug log
    console.log("onNavigate function:", onNavigate); // Debug log
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

  // Suporte a gestos de swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    // Só ativa o swipe se não estiver clicando em um link
    const target = e.target as HTMLElement;
    if (target.closest("a")) {
      isDragging.current = false;
      return;
    }

    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    // Se o toque foi em um link, não processa o swipe
    const target = e.target as HTMLElement;
    if (target.closest("a")) {
      isDragging.current = false;
      return;
    }

    const diffX = startX.current - currentX.current;

    // Se o usuário fez swipe da direita para esquerda (fechar menu)
    if (diffX > 50 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // Se o usuário fez swipe da esquerda para direita (abrir menu)
    if (diffX < -50 && !isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
    }

    isDragging.current = false;
  };

  // Fechar menu ao clicar no overlay
  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Fechar menu com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevenir scroll do body quando menu está aberto
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <HeaderContent>
          <Logo onClick={() => handleNavClick("/")}>
            🥗 Letícia Conde Nutricionista
          </Logo>

          {/* Overlay para mobile */}
          <Overlay $isOpen={isMobileMenuOpen} onClick={handleOverlayClick} />

          <Nav
            ref={navRef}
            $isOpen={isMobileMenuOpen}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <NavLinksContainer>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/");
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/");
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/");
                }}
                $isActive={isActivePage("/")}
              >
                🏠 Início
              </NavLink>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/pre-consulta");
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/pre-consulta");
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/pre-consulta");
                }}
                $isActive={isActivePage("/pre-consulta")}
              >
                📅 Agendar Consulta
              </NavLink>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/sobre");
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/sobre");
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/sobre");
                }}
                $isActive={isActivePage("/sobre")}
              >
                👩‍⚕️ Sobre
              </NavLink>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/contato");
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/contato");
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick("/contato");
                }}
                $isActive={isActivePage("/contato")}
              >
                📞 Contato
              </NavLink>
            </NavLinksContainer>
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

            <MobileMenuButton
              $isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <PulseIcon $isOpen={isMobileMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
              </PulseIcon>
            </MobileMenuButton>
          </HeaderActions>
        </HeaderContent>
      </HeaderContainer>
    </ThemeProvider>
  );
};

export default Header;
