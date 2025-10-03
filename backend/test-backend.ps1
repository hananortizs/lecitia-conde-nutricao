# Script para testar o backend da Letícia Conde Nutricionista
# Execute este script no PowerShell

Write-Host "=== Testando Backend Letícia Conde Nutricionista ===" -ForegroundColor Green

# Verificar se o .NET está instalado
Write-Host "`n1. Verificando .NET 8.0..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "✓ .NET versão: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ .NET não encontrado. Instale o .NET 8.0 SDK" -ForegroundColor Red
    exit 1
}

# Navegar para o diretório do projeto
Set-Location "LeticiaConde.Api"

# Restaurar dependências
Write-Host "`n2. Restaurando dependências..." -ForegroundColor Yellow
try {
    dotnet restore
    Write-Host "✓ Dependências restauradas" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro ao restaurar dependências" -ForegroundColor Red
    exit 1
}

# Compilar o projeto
Write-Host "`n3. Compilando projeto..." -ForegroundColor Yellow
try {
    dotnet build
    Write-Host "✓ Projeto compilado com sucesso" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro na compilação" -ForegroundColor Red
    exit 1
}

# Verificar se o PostgreSQL está rodando (opcional)
Write-Host "`n4. Verificando PostgreSQL..." -ForegroundColor Yellow
try {
    $pgTest = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue
    if ($pgTest) {
        Write-Host "✓ Serviço PostgreSQL encontrado" -ForegroundColor Green
    } else {
        Write-Host "⚠ PostgreSQL não encontrado. Certifique-se de que está instalado e rodando" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Não foi possível verificar o PostgreSQL" -ForegroundColor Yellow
}

# Executar o projeto
Write-Host "`n5. Iniciando servidor..." -ForegroundColor Yellow
Write-Host "O servidor será iniciado em https://localhost:7000" -ForegroundColor Cyan
Write-Host "Swagger UI estará disponível em https://localhost:7000/swagger" -ForegroundColor Cyan
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Cyan

try {
    dotnet run
} catch {
    Write-Host "✗ Erro ao iniciar o servidor" -ForegroundColor Red
    Write-Host "Verifique se a porta 7000 está disponível" -ForegroundColor Yellow
}

# Voltar ao diretório anterior
Set-Location ".."
