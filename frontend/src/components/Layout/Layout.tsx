import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { GlobalStyles } from "../styled/GlobalStyles";
import { useTheme } from "../../contexts/ThemeContext";
import type { Theme } from "../../types";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`;

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (path: string) => void;
  currentPage?: string;
}

const Layout: React.FC<LayoutProps> = React.memo(
  ({ children, onNavigate, currentPage }) => {
    const { theme } = useTheme();

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        <LayoutContainer>
          <Header onNavigate={onNavigate} currentPage={currentPage} />
          <Main>
            <Content>{children}</Content>
          </Main>
          <Footer />
        </LayoutContainer>
      </ThemeProvider>
    );
  }
);

export default Layout;
