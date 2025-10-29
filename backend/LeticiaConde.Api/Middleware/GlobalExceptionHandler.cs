using LeticiaConde.Application.Exceptions;
using System.Net;
using System.Text.Json;

namespace LeticiaConde.Api.Middleware;

/// <summary>
/// Middleware para tratamento global de exceções
/// Mapeia exceções de domínio para códigos HTTP apropriados
/// </summary>
public class GlobalExceptionHandler
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var statusCode = HttpStatusCode.InternalServerError;
        var message = "An error occurred while processing your request.";

        switch (exception)
        {
            case NotFoundException:
                statusCode = HttpStatusCode.NotFound;
                message = exception.Message;
                break;

            case ValidationException:
            case ArgumentException:
                statusCode = HttpStatusCode.BadRequest;
                message = exception.Message;
                break;

            case ConflictException:
            case InvalidOperationException:
                statusCode = HttpStatusCode.Conflict;
                message = exception.Message;
                break;

            default:
                // For security reasons, don't expose internal error details in production
                message = "An unexpected error occurred. Please try again later.";
                break;
        }

        var response = new
        {
            error = message,
            success = false
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var jsonResponse = JsonSerializer.Serialize(response);
        return context.Response.WriteAsync(jsonResponse);
    }
}

