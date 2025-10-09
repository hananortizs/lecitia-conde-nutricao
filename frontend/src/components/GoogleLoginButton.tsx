import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { StyledButton } from "./styled/Button";
import { GOOGLE_CONFIG } from "../config/google";

// Declaração global para o Google Identity Services
declare global {
  interface Window {
    google: any;
    googleCallback: (response: any) => void;
  }
}

const GoogleButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  background: white;
  color: #5f6368;
  border: 1px solid #dadce0;

  &:hover {
    background: #f8f9fa;
    border-color: #c1c7cd;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}20;
  }
`;

const GoogleIcon = styled.div`
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
`;

interface GoogleLoginButtonProps {
  onSuccess: (userData: {
    name: string;
    email: string;
    picture?: string;
  }) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carregar o script do Google Identity Services
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogleSignIn();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (!window.google || !buttonRef.current) return;

      const clientId = GOOGLE_CONFIG.CLIENT_ID;
      console.log("Client ID:", clientId); // Debug

      if (!clientId) {
        console.error("Client ID não encontrado!");
        onError?.("Configuração do Google não encontrada");
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          width: 300,
          text: "signin_with",
          shape: "rectangular",
        });
      } catch (error) {
        console.error("Erro ao inicializar Google Sign-In:", error);
        onError?.("Erro ao carregar Google Sign-In");
      }
    };

    loadGoogleScript();

    // Cleanup
    return () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
    };
  }, []);

  const handleGoogleResponse = (response: any) => {
    try {
      // Decodificar o JWT token
      const payload = JSON.parse(atob(response.credential.split(".")[1]));

      const userData = {
        name: payload.name || "",
        email: payload.email || "",
        picture: payload.picture || "",
      };

      onSuccess(userData);
    } catch (error) {
      console.error("Erro ao processar resposta do Google:", error);
      onError?.("Erro ao processar dados do usuário");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div ref={buttonRef} style={{ width: "300px" }} />
    </div>
  );
};

export default GoogleLoginButton;
