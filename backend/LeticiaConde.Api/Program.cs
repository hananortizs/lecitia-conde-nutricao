using LeticiaConde.Infrastructure.Data;
using LeticiaConde.Application.Services;
using LeticiaConde.Application.Interfaces;
using LeticiaConde.Api.Conventions;
using LeticiaConde.Api.Extensions;
using LeticiaConde.Api.Middleware;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options =>
{
    // Adicionar convenção para kebab-case automático
    options.Conventions.Add(new KebabCaseControllerModelConvention());
    
    // Adicionar prefixo global "lcn/v1" para todas as rotas (versionamento)
    options.UseGeneralRoutePrefix("lcn/v1");
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Letícia Conde Nutricionista API", Version = "v1" });
    // Incluir comentários XML para descrever controllers, actions e DTOs
    var baseDir = AppContext.BaseDirectory;
    var xmlFiles = new[] {
        "LeticiaConde.Api.xml",
        "LeticiaConde.Application.xml",
        "LeticiaConde.Core.xml"
    };
    foreach (var xml in xmlFiles)
    {
        var path = Path.Combine(baseDir, xml);
        if (File.Exists(path))
        {
            c.IncludeXmlComments(path, includeControllerXmlComments: true);
        }
    }
});

// Configuração do banco de dados PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=localhost;Database=lcn-database;Username=leticia_user;Password=leticia123";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString, npgsqlOptions =>
    {
        npgsqlOptions.EnableRetryOnFailure();
    }));

// Configure Npgsql to use UTC by default
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configuração de CORS para o frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configuração de HttpClient para APIs externas
builder.Services.AddHttpClient();

// Registro dos serviços
builder.Services.AddScoped<ILeadService, LeadService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Letícia Conde Nutricionista API v1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// Global exception handler middleware
app.UseMiddleware<GlobalExceptionHandler>();

app.UseAuthorization();
app.MapControllers();

// Aplicar migrações automaticamente em desenvolvimento
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
}

// Exibir informações da API no console
Console.WriteLine("🚀 LETÍCIA CONDE NUTRIÇÃO API");
Console.WriteLine($"🌐 Swagger UI:     \u001b[34mhttp://localhost:5014/swagger\u001b[0m");
Console.WriteLine($"📊 API Base URL:   \u001b[34mhttp://localhost:5014/lcn/v1\u001b[0m");
Console.WriteLine($"🔧 Ambiente:       {app.Environment.EnvironmentName}");
Console.WriteLine($"🗄️  Banco:          PostgreSQL (lcn-database)");
Console.WriteLine($"🔗 Conexão:        {connectionString.Split(';')[0]}");
Console.WriteLine("✅ API iniciada com sucesso! Pressione Ctrl+C para parar.");
Console.WriteLine();

app.Run();
