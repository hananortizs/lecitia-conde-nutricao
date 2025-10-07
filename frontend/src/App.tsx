import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import AppointmentPage from "./pages/AppointmentPage";
import PreConsultationForm from "./components/PreConsultationForm";

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

  const handlePreConsultationSubmit = async (data: unknown) => {
    try {
      // Aqui você pode salvar os dados da pré-consulta
      console.log("Dados da pré-consulta:", data);

      // Navegar para agendamento
      handleNavigate("/agendamento");
    } catch (error) {
      console.error("Erro ao processar pré-consulta:", error);
      alert("Erro ao processar seus dados. Tente novamente.");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "pre-consulta":
        return (
          <PreConsultationForm
            onSubmit={handlePreConsultationSubmit}
            onCancel={() => setCurrentPage("home")}
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
      <Layout onNavigate={handleNavigate} currentPage={currentPage}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
