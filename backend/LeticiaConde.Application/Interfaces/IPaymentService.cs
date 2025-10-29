using LeticiaConde.Application.DTOs;

namespace LeticiaConde.Application.Interfaces;

/// <summary>
/// Interface para o serviço de gerenciamento de pagamentos
/// </summary>
public interface IPaymentService
{
    /// <summary>
    /// Processes a payment webhook
    /// </summary>
    /// <param name="dto">Payment confirmation data</param>
    /// <returns>Processing result</returns>
    Task<bool> ProcessPaymentWebhookAsync(ConfirmPaymentDto dto);
}

