import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import AppointmentPage from "./pages/AppointmentPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AppointmentSteps from "./components/AppointmentSteps";
import type { PreConsultationData } from "./types";

type Page = "home" | "pre-consulta" | "agendamento" | "sobre" | "contato";

// Mapear rotas válidas
const validRoutes: Record<string, Page> = {
  "/": "home",
  "/home": "home",
  "/pre-consulta": "pre-consulta",
  "/agendamento": "agendamento",
  "/sobre": "sobre",
  "/contato": "contato",
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Sincronizar com URL atual e validar rotas
  useEffect(() => {
    const path = window.location.pathname;
    const validPage = validRoutes[path];

    if (validPage) {
      setCurrentPage(validPage);
    } else if (path !== "/") {
      // Redirecionar para home se rota inválida
      window.history.replaceState({}, "", "/");
      setCurrentPage("home");
    }

    // Garantir que a página sempre comece no topo
    window.scrollTo(0, 0);
  }, []); // Rodar apenas no mount

  // Detectar mudanças na navegação (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const validPage = validRoutes[path];

      if (validPage) {
        setCurrentPage(validPage);
      } else {
        window.history.replaceState({}, "", "/");
        setCurrentPage("home");
      }

      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    // Validar se a rota existe
    const validPage = validRoutes[path];

    if (validPage) {
      window.history.pushState({}, "", path);
      setCurrentPage(validPage);
      window.scrollTo(0, 0);
    } else {
      // Redirecionar para home se rota inválida
      window.history.pushState({}, "", "/");
      setCurrentPage("home");
      window.scrollTo(0, 0);
    }
  };

  const handleAppointmentComplete = async (data: PreConsultationData) => {
    try {
      // Aqui você pode salvar os dados do agendamento
      console.log("Dados do agendamento:", data);

      // Mostrar mensagem de sucesso
      alert(
        "Agendamento realizado com sucesso! Em breve entraremos em contato para confirmar os detalhes."
      );

      // Navegar para home
      handleNavigate("/");
    } catch (error) {
      console.error("Erro ao processar agendamento:", error);
      alert("Erro ao processar seu agendamento. Tente novamente.");
    }
  };

  const handleAppointmentCancel = () => {
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "pre-consulta":
        return (
          <AppointmentSteps
            onComplete={handleAppointmentComplete}
            onCancel={handleAppointmentCancel}
          />
        );
      case "agendamento":
        return <AppointmentPage onNavigate={handleNavigate} />;
      case "sobre":
        return <AboutPage onNavigate={handleNavigate} />;
      case "contato":
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout onNavigate={handleNavigate} currentPage={currentPage}>
          {renderPage()}
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
