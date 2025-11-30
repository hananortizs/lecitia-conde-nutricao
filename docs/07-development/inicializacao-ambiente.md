# 🚀 Inicialização do Ambiente de Desenvolvimento

**Responsável**: Fullstack Engineer  
**Última Atualização**: Janeiro 2025

---

## 📋 Visão Geral

Quando você solicitar **"iniciar a API"** ou **"iniciar o ambiente"**, o **Fullstack Engineer** será automaticamente acionado para:

1. ✅ Verificar e iniciar Docker Desktop (se necessário)
2. ✅ Iniciar PostgreSQL via Docker Compose
3. ✅ Iniciar Backend API (ASP.NET Core)
4. ✅ Iniciar Frontend (React + Vite)
5. ✅ Informar progresso em cada etapa

---

## 🎯 Como Usar

### **Opção 1: Solicitar ao Agente (Recomendado)**

Simplesmente diga:
- **"Iniciar a API"**
- **"Iniciar o ambiente"**
- **"Subir o ambiente de desenvolvimento"**

O **Fullstack Engineer** será acionado automaticamente e executará o script de inicialização.

### **Opção 2: Executar Script Manualmente**

```powershell
.\scripts\start-dev-environment.ps1
```

---

## 🔄 Processo Automatizado

### **PASSO 0: Verificação do Docker**

- ✅ Verifica se Docker está rodando
- ✅ Se não estiver, tenta iniciar Docker Desktop automaticamente
- ✅ Aguarda até 60 segundos para Docker iniciar
- ✅ Informa progresso em tempo real

### **PASSO 1: PostgreSQL**

- ✅ Inicia container PostgreSQL via `docker-compose up -d postgres`
- ✅ Aguarda PostgreSQL estar pronto (até 30 segundos)
- ✅ Verifica conexão com `pg_isready`

### **PASSO 2: Backend API**

- ✅ Verifica se .NET SDK está instalado
- ✅ Inicia backend em janela separada do PowerShell
- ✅ Aguarda API estar disponível (até 30 segundos)
- ✅ Verifica se Swagger está acessível

### **PASSO 3: Frontend**

- ✅ Verifica se Node.js está instalado
- ✅ Instala dependências se necessário (`npm install`)
- ✅ Inicia frontend em janela separada do PowerShell
- ✅ Aguarda frontend estar disponível (até 20 segundos)

---

## 🌐 URLs do Ambiente

Após inicialização bem-sucedida:

| Componente | URL | Descrição |
|------------|-----|-----------|
| **PostgreSQL** | `localhost:5432` | Banco de dados |
| **Backend API** | `http://localhost:5000` ou `http://localhost:5014` | API REST |
| **Swagger UI** | `http://localhost:5000/swagger` ou `http://localhost:5014/swagger` | Documentação da API |
| **API Base** | `http://localhost:5000/lcn/v1` ou `http://localhost:5014/lcn/v1` | Base path da API |
| **Frontend** | `http://localhost:5173` | Aplicação React |

---

## ⚙️ Pré-requisitos

### **Obrigatórios**

1. **Docker Desktop**
   - Instalado e configurado
   - Pode ser iniciado automaticamente pelo script

2. **.NET 8.0 SDK**
   - Verificar: `dotnet --version`
   - Deve retornar versão 8.0.x

3. **Node.js 18+**
   - Verificar: `node --version`
   - Deve retornar versão 18.x ou superior

### **Opcionais**

- **PowerShell 5.1+** (já incluído no Windows)
- **Git** (para controle de versão)

---

## 🔧 Troubleshooting

### **Docker não inicia**

**Sintoma**: Script não consegue iniciar Docker Desktop

**Soluções**:
1. Iniciar Docker Desktop manualmente
2. Verificar se Docker Desktop está instalado em: `C:\Program Files\Docker\Docker\Docker Desktop.exe`
3. Verificar se há processos bloqueando Docker
4. Reiniciar o computador se necessário

### **PostgreSQL não conecta**

**Sintoma**: Backend não consegue conectar ao banco

**Soluções**:
1. Verificar se container está rodando: `docker ps`
2. Verificar logs: `docker logs leticia-conde-postgres`
3. Verificar se porta 5432 não está em uso: `netstat -ano | findstr :5432`
4. Reiniciar container: `docker-compose restart postgres`

### **Backend não inicia**

**Sintoma**: API não responde ou erro ao iniciar

**Soluções**:
1. Verificar se .NET SDK está instalado: `dotnet --version`
2. Verificar se PostgreSQL está rodando
3. Verificar connection string em `backend/LeticiaConde.Api/appsettings.json`
4. Verificar se porta 5000/5014 não está em uso
5. Limpar e reconstruir: `cd backend/LeticiaConde.Api && dotnet clean && dotnet build`

### **Frontend não inicia**

**Sintoma**: Frontend não carrega ou erro ao iniciar

**Soluções**:
1. Verificar se Node.js está instalado: `node --version`
2. Instalar dependências: `cd frontend && npm install`
3. Verificar se porta 5173 não está em uso
4. Limpar cache: `cd frontend && rm -rf node_modules && npm install`

---

## 📝 Notas Importantes

### **Janelas do PowerShell**

O script abre **janelas separadas** do PowerShell para:
- **Backend**: Monitora logs da API
- **Frontend**: Monitora logs do Vite

**Importante**: Não feche essas janelas! Elas mantêm os processos rodando.

### **Parar o Ambiente**

Para parar o ambiente:

1. **Parar Frontend**: Fechar janela do PowerShell do frontend ou `Ctrl+C`
2. **Parar Backend**: Fechar janela do PowerShell do backend ou `Ctrl+C`
3. **Parar PostgreSQL**: `docker-compose down` ou `docker stop leticia-conde-postgres`

### **Reiniciar Ambiente**

Para reiniciar, simplesmente execute o script novamente:
```powershell
.\scripts\start-dev-environment.ps1
```

O script verifica se os componentes já estão rodando e não os reinicia desnecessariamente.

---

## 🎯 Fluxo Completo

```
Usuário: "Iniciar a API"
    ↓
Hanadel (PM) identifica necessidade
    ↓
Aciona Fullstack Engineer
    ↓
Fullstack Engineer executa script
    ↓
PASSO 0: Verifica/inicia Docker
    ↓
PASSO 1: Inicia PostgreSQL
    ↓
PASSO 2: Inicia Backend
    ↓
PASSO 3: Inicia Frontend
    ↓
✅ Ambiente pronto!
```

---

**Última Atualização**: Janeiro 2025  
**Mantido por**: Fullstack Engineer

