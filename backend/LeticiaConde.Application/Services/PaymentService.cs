using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using LeticiaConde.Application.Exceptions;
using Microsoft.Extensions.Logging;

namespace LeticiaConde.Application.Services;

/// <summary>
/// Serviço para gerenciamento de pagamentos
/// </summary>
public class PaymentService : IPaymentService
{
    private readonly IAppointmentService _appointmentService;
    private readonly ILogger<PaymentService> _logger;

    /// <summary>
    /// Construtor do serviço
    /// </summary>
    /// <param name="appointmentService">Serviço de agendamentos</param>
    /// <param name="logger">Logger para registro de eventos</param>
    public PaymentService(IAppointmentService appointmentService, ILogger<PaymentService> logger)
    {
        _appointmentService = appointmentService;
        _logger = logger;
    }

    /// <summary>
    /// Processes a payment webhook
    /// </summary>
    /// <param name="dto">Payment confirmation data</param>
    /// <returns>True if payment was processed successfully</returns>
    public Task<bool> ProcessPaymentWebhookAsync(ConfirmPaymentDto dto)
    {
        _logger.LogInformation("Payment webhook received: {TransactionId} - Status: {Status}", 
            dto.TransactionId, dto.Status);

        // Validate if payment was approved
        var isApproved = dto.Status.Equals("approved", StringComparison.OrdinalIgnoreCase) ||
                        dto.Status.Equals("aprovado", StringComparison.OrdinalIgnoreCase);

        if (!isApproved)
        {
            _logger.LogWarning("Payment not approved: {TransactionId} - Status: {Status}", 
                dto.TransactionId, dto.Status);
            return Task.FromResult(false);
        }

        // TODO: Implement logic to find appointment by transaction
        // For now, just log and return success
        // In the future, this should:
        // 1. Find appointment by transaction ID or appointment ID from DTO
        // 2. Call _appointmentService.ConfirmAppointmentAsync(appointmentId, transactionId)
        _logger.LogInformation("Payment confirmed successfully: {TransactionId}", dto.TransactionId);
        
        return Task.FromResult(true);
    }
}

