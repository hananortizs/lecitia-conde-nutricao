import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import AppointmentPage from "./pages/AppointmentPage";
import AppointmentSteps from "./components/AppointmentSteps";
import type { PreConsultationData } from "./types";

type Page = "home" | "pre-consulta" | "agendamento" | "sobre" | "contato";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Garantir que a página sempre comece no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (path: string) => {
    const page = path.replace("/", "") as Page;
    setCurrentPage(page || "home");
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
        return <div>Página Sobre (em desenvolvimento)</div>;
      case "contato":
        return <div>Página de Contato (em desenvolvimento)</div>;
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
