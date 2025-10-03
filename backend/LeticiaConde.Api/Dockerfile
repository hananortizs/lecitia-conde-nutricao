# Use a imagem oficial do .NET 8.0
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 7000
ENV ASPNETCORE_URLS=http://+:7000

# Use a imagem do SDK para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar todos os arquivos .csproj primeiro
COPY ["LeticiaConde.Api/LeticiaConde.Api.csproj", "LeticiaConde.Api/"]
COPY ["LeticiaConde.Core/LeticiaConde.Core.csproj", "LeticiaConde.Core/"]
COPY ["LeticiaConde.Application/LeticiaConde.Application.csproj", "LeticiaConde.Application/"]
COPY ["LeticiaConde.Infrastructure/LeticiaConde.Infrastructure.csproj", "LeticiaConde.Infrastructure/"]

# Restaurar dependências
RUN dotnet restore "LeticiaConde.Api/LeticiaConde.Api.csproj"

# Copiar todo o código fonte
COPY . .

# Build da aplicação
RUN dotnet build "LeticiaConde.Api/LeticiaConde.Api.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "LeticiaConde.Api/LeticiaConde.Api.csproj" -c Release -o /app/publish

# Runtime
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LeticiaConde.Api.dll"]
