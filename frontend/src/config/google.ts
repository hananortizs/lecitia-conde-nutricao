// Configuração do Google OAuth
export const GOOGLE_CONFIG = {
  CLIENT_ID:
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "105290758689-gubedia6ao9rv8cpb6m1l08anm7dagdg.apps.googleusercontent.com",
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5014/lcn/v1",
};
