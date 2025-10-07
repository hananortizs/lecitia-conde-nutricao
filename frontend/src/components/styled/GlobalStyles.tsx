import { createGlobalStyle } from "styled-components";
import type { Theme } from "../../types";

interface GlobalStylesProps {
  theme: Theme;
}

export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px; /* Base font size - mantém PX para controle preciso */
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    line-height: 1.5;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100vw;
    max-width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Evita scroll horizontal */
  }

  #root {
    min-height: 100vh;
    width: 100vw;
    max-width: 100vw;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow-x: hidden; /* Evita scroll horizontal */
  }

  /* Typography - Fluid */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  h1 {
    font-size: ${(props) => props.theme.fluid.typography.h1};
  }

  h2 {
    font-size: ${(props) => props.theme.fluid.typography.h2};
  }

  h3 {
    font-size: ${(props) => props.theme.fluid.typography.h3};
  }

  h4 {
    font-size: ${(props) => props.theme.fluid.typography.h4};
  }

  h5 {
    font-size: ${(props) => props.theme.fluid.typography.h5};
  }

  h6 {
    font-size: ${(props) => props.theme.fluid.typography.h6};
  }

  p {
    font-size: ${(props) => props.theme.fluid.typography.body};
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    margin-bottom: 1em;
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors.accent};
    }
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  /* Interactive elements cursor */
  [role="button"],
  [role="tab"],
  [role="menuitem"],
  [role="option"],
  [role="checkbox"],
  [role="radio"],
  [role="switch"],
  [tabindex]:not([tabindex="-1"]),
  .clickable,
  .interactive {
    cursor: pointer;
  }

  /* Disabled elements */
  [disabled],
  .disabled {
    cursor: not-allowed !important;
  }

  /* Loading elements */
  .loading {
    cursor: wait !important;
  }

  /* Focus styles */
  *:focus {
    outline: 0.125rem solid ${(props) => props.theme.colors.primary};
    outline-offset: 0.125rem;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 0.5rem; /* 8px */
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.border};
    border-radius: 0.25rem; /* 4px */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.textSecondary};
  }

  /* Selection styles */
  ::selection {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 0.0625rem; /* 1px */
    height: 0.0625rem; /* 1px */
    padding: 0;
    margin: -0.0625rem; /* -1px */
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    max-width: 75rem; /* 1200px */
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-5 { margin-bottom: 1.25rem; }
  .mb-6 { margin-bottom: 1.5rem; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 0.75rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-5 { margin-top: 1.25rem; }
  .mt-6 { margin-top: 1.5rem; }

  .p-0 { padding: 0; }
  .p-1 { padding: 0.25rem; }
  .p-2 { padding: 0.5rem; }
  .p-3 { padding: 0.75rem; }
  .p-4 { padding: 1rem; }
  .p-5 { padding: 1.25rem; }
  .p-6 { padding: 1.5rem; }

  /* Animation keyframes */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;
