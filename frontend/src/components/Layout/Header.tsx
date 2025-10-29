import React, { useEffect, useRef } from "react";
import styled, { ThemeProvider, keyframes, css } from "styled-components";
import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { StyledButton } from "../styled/Button";

// Animações modernas com Material Design 3 easings
const scaleUp = keyframes`
  from {
    transform: scale(0.95);
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
  padding: ${(props) => props.theme.spacing.xs} 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(0.625rem);
  background-color: ${(props) => props.theme.colors.background}dd;

  @media (min-width: 480px) {
    padding: ${(props) => props.theme.spacing.sm} 0;
  }

  @media (min-width: 768px) {
    padding: ${(props) => props.theme.spacing.md} 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0 ${(props) => props.theme.spacing.sm};
  }

  @media (min-width: 768px) {
    padding: 0 ${(props) => props.theme.spacing.lg};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }

  @media (min-width: 480px) {
    gap: ${(props) => props.theme.spacing.sm};
    font-size: 1.125rem;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Desktop Navigation
const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.lg};
  }
`;

// Mobile Navigation Drawer (Material Design 3 style)
const MobileNavDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(85vw, 360px);
  height: 100vh;
  background: ${(props) => props.theme.colors.background};
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15), -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  will-change: transform;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};

  @media (min-width: 768px) {
    display: none;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  min-height: 64px;
  flex-shrink: 0;
`;

const DrawerTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${(props) => props.theme.colors.primary}10;
  }

  &:active {
    background: ${(props) => props.theme.colors.primary}20;
    transform: scale(0.95);
  }
`;

const DrawerContent = styled.div`
  flex: 1;
  padding: ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  overflow-y: auto;
`;

const NavItem = styled.button<{
  $isActive?: boolean;
  $delay?: number;
  $isVisible?: boolean;
}>`
  width: 100%;
  background: ${(props) =>
    props.$isActive ? `${props.theme.colors.primary}15` : "transparent"};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  color: ${(props) =>
    props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
  font-size: 1rem;
  font-weight: ${(props) => (props.$isActive ? 600 : 500)};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  min-height: 56px;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  ${(props) =>
    props.$isVisible &&
    css`
      animation: ${scaleUp} 0.3s ease-out ${props.$delay || 0}ms forwards;
    `}

  /* Ripple effect */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary}20;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }

  /* Icon */
  &::after {
    content: attr(data-icon);
    font-size: 1.5rem;
    flex-shrink: 0;
    transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1);
  }

  &:hover {
    background: ${(props) =>
      props.$isActive
        ? `${props.theme.colors.primary}20`
        : `${props.theme.colors.primary}08`};
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px);
  }

  /* Active indicator */
  ${(props) =>
    props.$isActive &&
    `
    span {
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        right: calc(-1 * ${props.theme.spacing.lg});
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 40%;
        background: ${props.theme.colors.primary};
        border-radius: 2px;
      }
    }
  `}

  @media (min-width: 480px) {
    min-height: 60px;
    font-size: 1.0625rem;
    padding: ${(props) => props.theme.spacing.lg};
  }
`;

const DesktopNavLink = styled.a<{ $isActive?: boolean }>`
  color: ${(props) =>
    props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-weight: ${(props) => (props.$isActive ? 600 : 500)};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  position: relative;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary}08;
  }

  ${(props) =>
    props.$isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 3px;
      background: ${props.theme.colors.primary};
      border-radius: 2px;
    }
  `}
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  width: 40px;
  height: 40px;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  -webkit-tap-highlight-color: transparent;
  position: relative;
  z-index: 2001;

  &:hover {
    background: ${(props) => props.theme.colors.primary}10;
  }

  &:active {
    background: ${(props) => props.theme.colors.primary}20;
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
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${(props) => props.theme.colors.text};
    border-radius: 1px;
    left: 0;
    transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);

    &:nth-child(1) {
      top: 0;
      transform: ${(props) =>
        props.$isOpen
          ? "rotate(45deg) translate(5px, 5px)"
          : "rotate(0) translate(0, 0)"};
    }

    &:nth-child(2) {
      top: 8px;
      opacity: ${(props) => (props.$isOpen ? 0 : 1)};
      transform: ${(props) =>
        props.$isOpen ? "translateX(-20px)" : "translateX(0)"};
    }

    &:nth-child(3) {
      top: 16px;
      transform: ${(props) =>
        props.$isOpen
          ? "rotate(-45deg) translate(5px, -5px)"
          : "rotate(0) translate(0, 0)"};
    }
  }
`;

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1999;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s cubic-bezier(0.2, 0, 0, 1),
    visibility 0.3s cubic-bezier(0.2, 0, 0, 1);
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
  const drawerRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handleNavClick = (path: string) => {
    onNavigate?.(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isActivePage = (path: string) => {
    const page = path.replace("/", "") || "home";
    return currentPage === page;
  };

  // Swipe to close gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !isMobileMenuOpen) return;
    currentX.current = e.touches[0].clientX;
    const diffX = currentX.current - startX.current;
    if (diffX > 0 && drawerRef.current) {
      drawerRef.current.style.transform = `translateX(${Math.min(
        diffX,
        360
      )}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    const diffX = currentX.current - startX.current;
    if (diffX > 100) {
      setIsMobileMenuOpen(false);
    } else if (drawerRef.current) {
      drawerRef.current.style.transform = "";
    }
    isDragging.current = false;
  };

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close drawer when clicking backdrop
  const handleBackdropClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Início", icon: "🏠" },
    { path: "/pre-consulta", label: "Agendar Consulta", icon: "📅" },
    { path: "/sobre", label: "Sobre", icon: "👩‍⚕️" },
    { path: "/contato", label: "Contato", icon: "📞" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <HeaderContent>
          <Logo onClick={() => handleNavClick("/")}>
            🥗 Letícia Conde Nutricionista
          </Logo>

          {/* Desktop Navigation */}
          <DesktopNav>
            {navItems.map((item) => (
              <DesktopNavLink
                key={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.path);
                }}
                $isActive={isActivePage(item.path)}
              >
                {item.label}
              </DesktopNavLink>
            ))}
          </DesktopNav>

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
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <HamburgerIcon $isOpen={isMobileMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
              </HamburgerIcon>
            </MobileMenuButton>
          </HeaderActions>
        </HeaderContent>
      </HeaderContainer>

      {/* Mobile Drawer */}
      <>
        <Backdrop $isOpen={isMobileMenuOpen} onClick={handleBackdropClick} />
        {isMobileMenuOpen && (
          <MobileNavDrawer
            ref={drawerRef}
            $isOpen={isMobileMenuOpen}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="navigation"
            aria-label="Menu principal"
          >
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              <CloseButton
                onClick={toggleMobileMenu}
                aria-label="Fechar menu"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <X size={24} />
              </CloseButton>
            </DrawerHeader>
            <DrawerContent>
              {navItems.map((item, index) => (
                <NavItem
                  key={item.path}
                  data-icon={item.icon}
                  $isActive={isActivePage(item.path)}
                  $isVisible={isMobileMenuOpen}
                  $delay={index * 30}
                  onClick={() => handleNavClick(item.path)}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  <span>{item.label}</span>
                </NavItem>
              ))}
            </DrawerContent>
          </MobileNavDrawer>
        )}
      </>
    </ThemeProvider>
  );
};

export default Header;
