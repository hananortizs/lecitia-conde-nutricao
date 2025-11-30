# Script de Inicialização Automática do Ambiente de Desenvolvimento
# Letícia Conde Nutrição - Fullstack Engineer

Write-Host "`n┌─────────────────────────────────────────────────────────┐" -ForegroundColor Cyan
Write-Host "│  💻 FULLSTACK ENGINEER - INICIANDO AMBIENTE              │" -ForegroundColor Cyan
Write-Host "│  ═══════════════════════════════════════════════════════ │" -ForegroundColor Cyan
Write-Host "│  Projeto: Letícia Conde Nutrição                         │" -ForegroundColor Cyan
Write-Host "│  Stack: React + ASP.NET Core + PostgreSQL                │" -ForegroundColor Cyan
Write-Host "└─────────────────────────────────────────────────────────┘`n" -ForegroundColor Cyan

# Função para verificar se Docker está rodando
function Test-DockerRunning {
    try {
        $dockerInfo = docker info 2>&1
        if ($LASTEXITCODE -eq 0) {
            return $true
        }
        return $false
    }
    catch {
        return $false
    }
}

# Função para iniciar Docker Desktop
function Start-DockerDesktop {
    Write-Host "🔄 Verificando Docker Desktop..." -ForegroundColor Yellow
    
    if (Test-DockerRunning) {
        Write-Host "✅ Docker já está rodando!" -ForegroundColor Green
        return $true
    }
    
    Write-Host "⚠️  Docker não está rodando. Tentando iniciar..." -ForegroundColor Yellow
    
    # Tentar iniciar Docker Desktop
    $dockerDesktopPath = "$env:ProgramFiles\Docker\Docker\Docker Desktop.exe"
    if (Test-Path $dockerDesktopPath) {
        Write-Host "🚀 Iniciando Docker Desktop..." -ForegroundColor Yellow
        Start-Process -FilePath $dockerDesktopPath
        
        # Aguardar Docker iniciar (máximo 60 segundos)
        Write-Host "⏳ Aguardando Docker iniciar (pode levar até 60 segundos)..." -ForegroundColor Yellow
        $timeout = 60
        $elapsed = 0
        while ($elapsed -lt $timeout) {
            Start-Sleep -Seconds 2
            $elapsed += 2
            if (Test-DockerRunning) {
                Write-Host "✅ Docker iniciado com sucesso! (${elapsed}s)" -ForegroundColor Green
                return $true
            }
            Write-Host "   Aguardando... (${elapsed}s/${timeout}s)" -ForegroundColor Gray
        }
        
        Write-Host "❌ Timeout: Docker não iniciou em ${timeout} segundos." -ForegroundColor Red
        Write-Host "   Por favor, inicie o Docker Desktop manualmente e tente novamente." -ForegroundColor Yellow
        return $false
    }
    else {
        Write-Host "❌ Docker Desktop não encontrado em: $dockerDesktopPath" -ForegroundColor Red
        Write-Host "   Por favor, instale o Docker Desktop ou inicie-o manualmente." -ForegroundColor Yellow
        return $false
    }
}

# Função para verificar se container está rodando
function Test-ContainerRunning {
    param([string]$ContainerName)
    
    $container = docker ps -a --filter "name=$ContainerName" --format "{{.Names}} {{.Status}}" 2>&1
    if ($container -match "Up") {
        return $true
    }
    return $false
}

# Função para iniciar PostgreSQL via Docker Compose
function Start-PostgreSQL {
    Write-Host "`n📊 PASSO 1/4: Iniciando PostgreSQL..." -ForegroundColor Cyan
    
    if (Test-ContainerRunning "leticia-conde-postgres") {
        Write-Host "✅ PostgreSQL já está rodando!" -ForegroundColor Green
        return $true
    }
    
    Write-Host "🔄 Iniciando PostgreSQL via Docker Compose..." -ForegroundColor Yellow
    
    # Verificar se docker-compose.yml existe
    if (-not (Test-Path "docker-compose.yml")) {
        Write-Host "❌ Arquivo docker-compose.yml não encontrado!" -ForegroundColor Red
        return $false
    }
    
    # Iniciar apenas o serviço PostgreSQL
    Write-Host "   Executando: docker-compose up -d postgres" -ForegroundColor Gray
    docker-compose up -d postgres
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ PostgreSQL iniciado com sucesso!" -ForegroundColor Green
        
        # Aguardar PostgreSQL estar pronto (máximo 30 segundos)
        Write-Host "⏳ Aguardando PostgreSQL estar pronto..." -ForegroundColor Yellow
        $timeout = 30
        $elapsed = 0
        while ($elapsed -lt $timeout) {
            Start-Sleep -Seconds 2
            $elapsed += 2
            $pgReady = docker exec leticia-conde-postgres pg_isready -U leticia_user 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ PostgreSQL está pronto! (${elapsed}s)" -ForegroundColor Green
                return $true
            }
            Write-Host "   Aguardando... (${elapsed}s/${timeout}s)" -ForegroundColor Gray
        }
        
        Write-Host "⚠️  PostgreSQL pode não estar totalmente pronto, mas continuando..." -ForegroundColor Yellow
        return $true
    }
    else {
        Write-Host "❌ Erro ao iniciar PostgreSQL!" -ForegroundColor Red
        return $false
    }
}

# Função para verificar se backend está rodando
function Test-BackendRunning {
    $ports = @(5000, 5014)  # Tentar ambas as portas possíveis
    foreach ($port in $ports) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:$port/swagger" -Method Get -TimeoutSec 2 -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200) {
                $script:backendPort = $port
                return $true
            }
        }
        catch {
            continue
        }
    }
    return $false
}

# Função para iniciar Backend
function Start-Backend {
    Write-Host "`n🔧 PASSO 2/4: Iniciando Backend (ASP.NET Core)..." -ForegroundColor Cyan
    
    if (Test-BackendRunning) {
        Write-Host "✅ Backend já está rodando em http://localhost:5000" -ForegroundColor Green
        return $true
    }
    
    # Verificar se .NET SDK está instalado
    $dotnetVersion = dotnet --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ .NET SDK não encontrado!" -ForegroundColor Red
        Write-Host "   Por favor, instale o .NET 8.0 SDK." -ForegroundColor Yellow
        return $false
    }
    
    Write-Host "✅ .NET SDK encontrado: $dotnetVersion" -ForegroundColor Green
    
    # Navegar para o diretório do backend
    if (-not (Test-Path "backend/LeticiaConde.Api")) {
        Write-Host "❌ Diretório do backend não encontrado!" -ForegroundColor Red
        return $false
    }
    
    Write-Host "🔄 Iniciando API..." -ForegroundColor Yellow
    Write-Host "   Diretório: backend/LeticiaConde.Api" -ForegroundColor Gray
    Write-Host "   URL: http://localhost:5000 ou http://localhost:5014" -ForegroundColor Gray
    Write-Host "   Swagger: http://localhost:5000/swagger ou http://localhost:5014/swagger" -ForegroundColor Gray
    
    # Iniciar backend em nova janela do PowerShell
    $backendScript = @"
cd '$PWD\backend\LeticiaConde.Api'
Write-Host '🚀 Iniciando Backend API...' -ForegroundColor Cyan
dotnet run
"@
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript
    
    # Aguardar backend iniciar (máximo 30 segundos)
    Write-Host "⏳ Aguardando backend iniciar..." -ForegroundColor Yellow
    $timeout = 30
    $elapsed = 0
    while ($elapsed -lt $timeout) {
        Start-Sleep -Seconds 2
        $elapsed += 2
        if (Test-BackendRunning) {
            $port = if ($script:backendPort) { $script:backendPort } else { 5000 }
            Write-Host "✅ Backend iniciado com sucesso! (${elapsed}s)" -ForegroundColor Green
            Write-Host "   🌐 Swagger: http://localhost:$port/swagger" -ForegroundColor Cyan
            Write-Host "   📊 API: http://localhost:$port/lcn/v1" -ForegroundColor Cyan
            return $true
        }
        Write-Host "   Aguardando... (${elapsed}s/${timeout}s)" -ForegroundColor Gray
    }
    
    Write-Host "⚠️  Backend pode não estar totalmente pronto, mas continuando..." -ForegroundColor Yellow
    return $true
}

# Função para verificar se frontend está rodando
function Test-FrontendRunning {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5173" -Method Get -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            return $true
        }
    }
    catch {
        return $false
    }
    return $false
}

# Função para iniciar Frontend
function Start-Frontend {
    Write-Host "`n⚛️  PASSO 3/4: Iniciando Frontend (React + Vite)..." -ForegroundColor Cyan
    
    if (Test-FrontendRunning) {
        Write-Host "✅ Frontend já está rodando em http://localhost:5173" -ForegroundColor Green
        return $true
    }
    
    # Verificar se Node.js está instalado
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
        Write-Host "   Por favor, instale o Node.js 18+." -ForegroundColor Yellow
        return $false
    }
    
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
    
    # Verificar se node_modules existe
    if (-not (Test-Path "frontend/node_modules")) {
        Write-Host "⚠️  node_modules não encontrado. Instalando dependências..." -ForegroundColor Yellow
        Set-Location frontend
        npm install
        Set-Location ..
        Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
    }
    
    Write-Host "🔄 Iniciando Frontend..." -ForegroundColor Yellow
    Write-Host "   Diretório: frontend" -ForegroundColor Gray
    Write-Host "   URL: http://localhost:5173" -ForegroundColor Gray
    
    # Iniciar frontend em nova janela do PowerShell
    $frontendScript = @"
cd '$PWD\frontend'
Write-Host '⚛️  Iniciando Frontend (React + Vite)...' -ForegroundColor Cyan
npm run dev
"@
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript
    
    # Aguardar frontend iniciar (máximo 20 segundos)
    Write-Host "⏳ Aguardando frontend iniciar..." -ForegroundColor Yellow
    $timeout = 20
    $elapsed = 0
    while ($elapsed -lt $timeout) {
        Start-Sleep -Seconds 2
        $elapsed += 2
        if (Test-FrontendRunning) {
            Write-Host "✅ Frontend iniciado com sucesso! (${elapsed}s)" -ForegroundColor Green
            Write-Host "   🌐 URL: http://localhost:5173" -ForegroundColor Cyan
            return $true
        }
        Write-Host "   Aguardando... (${elapsed}s/${timeout}s)" -ForegroundColor Gray
    }
    
    Write-Host "⚠️  Frontend pode não estar totalmente pronto, mas continuando..." -ForegroundColor Yellow
    return $true
}

# Função principal
function Start-DevEnvironment {
    Write-Host "`n🎯 Iniciando processo de inicialização do ambiente...`n" -ForegroundColor Cyan
    
    # PASSO 0: Verificar Docker
    Write-Host "🐳 PASSO 0/4: Verificando Docker..." -ForegroundColor Cyan
    if (-not (Start-DockerDesktop)) {
        Write-Host "`n❌ Não foi possível iniciar o Docker. Abortando." -ForegroundColor Red
        return $false
    }
    
    # PASSO 1: PostgreSQL
    if (-not (Start-PostgreSQL)) {
        Write-Host "`n❌ Não foi possível iniciar o PostgreSQL. Abortando." -ForegroundColor Red
        return $false
    }
    
    # PASSO 2: Backend
    if (-not (Start-Backend)) {
        Write-Host "`n❌ Não foi possível iniciar o Backend. Abortando." -ForegroundColor Red
        return $false
    }
    
    # PASSO 3: Frontend
    if (-not (Start-Frontend)) {
        Write-Host "`n❌ Não foi possível iniciar o Frontend. Abortando." -ForegroundColor Red
        return $false
    }
    
    # PASSO 4: Resumo
    Write-Host "`n┌─────────────────────────────────────────────────────────┐" -ForegroundColor Green
    Write-Host "│  ✅ AMBIENTE INICIADO COM SUCESSO!                       │" -ForegroundColor Green
    Write-Host "│  ═══════════════════════════════════════════════════════ │" -ForegroundColor Green
    Write-Host "│                                                          │" -ForegroundColor Green
    $port = if ($script:backendPort) { $script:backendPort } else { 5000 }
    Write-Host "│  🗄️  PostgreSQL:  localhost:5432                        │" -ForegroundColor Green
    Write-Host "│  🔧 Backend API:  http://localhost:$port                  │" -ForegroundColor Green
    Write-Host "│  📊 Swagger:      http://localhost:$port/swagger         │" -ForegroundColor Green
    Write-Host "│  ⚛️  Frontend:     http://localhost:5173                 │" -ForegroundColor Green
    Write-Host "│                                                          │" -ForegroundColor Green
    Write-Host "│  💡 Dica: As janelas do PowerShell permanecerão abertas  │" -ForegroundColor Yellow
    Write-Host "│     para monitorar os logs.                              │" -ForegroundColor Yellow
    Write-Host "└─────────────────────────────────────────────────────────┘`n" -ForegroundColor Green
    
    return $true
}

# Executar função principal
Start-DevEnvironment

