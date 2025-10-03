using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeticiaConde.Api.Controllers;

/// <summary>
/// Controller para gerenciamento de pagamentos e webhooks
/// </summary>
[ApiController]
[Route("api/payments")]
public class PaymentController : ControllerBase
{
    private readonly IAppointmentService _appointmentService;
    private readonly ILogger<PaymentController> _logger;

    /// <summary>
    /// Construtor do controller
    /// </summary>
    /// <param name="appointmentService">Serviço de agendamentos</param>
    /// <param name="logger">Logger para registro de eventos</param>
    public PaymentController(IAppointmentService appointmentService, ILogger<PaymentController> logger)
    {
        _appointmentService = appointmentService;
        _logger = logger;
    }

    /// <summary>
    /// Webhook for payment confirmation
    /// </summary>
    /// <param name="dto">Payment confirmation data</param>
    /// <returns>Confirmation result</returns>
    [HttpPost("webhook")]
    public Task<ActionResult<ApiResponse<object>>> PaymentWebhook([FromBody] ConfirmPaymentDto dto)
    {
        try
        {
            _logger.LogInformation("Payment webhook received: {TransactionId} - Status: {Status}", 
                dto.TransactionId, dto.Status);

            // Validate if payment was approved
            if (dto.Status.ToLower() != "approved" && dto.Status.ToLower() != "aprovado")
            {
                _logger.LogWarning("Payment not approved: {TransactionId} - Status: {Status}", 
                    dto.TransactionId, dto.Status);
                return Task.FromResult<ActionResult<ApiResponse<object>>>(Ok(new ApiResponse<object> { Data = "Payment not approved" }));
            }

            // TODO: Implement logic to find appointment by transaction
            // For now, returns success
            _logger.LogInformation("Payment confirmed successfully: {TransactionId}", dto.TransactionId);
            
            return Task.FromResult<ActionResult<ApiResponse<object>>>(Ok(new ApiResponse<object> { Data = "Payment confirmed successfully" }));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing payment webhook: {TransactionId}", dto.TransactionId);
            return Task.FromResult<ActionResult<ApiResponse<object>>>(BadRequest(new ApiResponse<object> { Error = ex.Message }));
        }
    }

    /// <summary>
    /// Confirms an appointment after payment (internal endpoint)
    /// </summary>
    /// <param name="appointmentId">Appointment ID</param>
    /// <param name="transactionId">Transaction ID</param>
    /// <returns>Confirmed appointment</returns>
    [HttpPost("confirm-appointment")]
    public async Task<ActionResult<ApiResponse<AppointmentDto>>> ConfirmAppointment(
        [FromQuery] int appointmentId, 
        [FromQuery] string transactionId)
    {
        try
        {
            var appointment = await _appointmentService.ConfirmAppointmentAsync(appointmentId, transactionId);
            return Ok(new ApiResponse<AppointmentDto> { Data = appointment });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new ApiResponse<object> { Error = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }
}
