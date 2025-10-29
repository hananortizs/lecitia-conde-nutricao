using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeticiaConde.Api.Controllers;

/// <summary>
/// Controller para gerenciamento de pagamentos e webhooks
/// Responsabilidade: Apenas receber requisições HTTP e delegar para os services
/// </summary>
[ApiController]
[Route("[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    private readonly IAppointmentService _appointmentService;

    public PaymentController(IPaymentService paymentService, IAppointmentService appointmentService)
    {
        _paymentService = paymentService;
        _appointmentService = appointmentService;
    }

    /// <summary>
    /// Webhook for payment confirmation
    /// </summary>
    [HttpPost("webhook")]
    public async Task<ActionResult<ApiResponse<object>>> PaymentWebhook([FromBody] ConfirmPaymentDto dto)
    {
        var result = await _paymentService.ProcessPaymentWebhookAsync(dto);
        return Ok(new ApiResponse<object> { Data = result ? "Payment confirmed successfully" : "Payment not approved" });
    }

    /// <summary>
    /// Confirms an appointment after payment (internal endpoint)
    /// </summary>
    [HttpPost("confirm-appointment")]
    public async Task<ActionResult<ApiResponse<AppointmentDto>>> ConfirmAppointment(
        [FromQuery] int appointmentId, 
        [FromQuery] string transactionId)
    {
        var appointment = await _appointmentService.ConfirmAppointmentAsync(appointmentId, transactionId);
        return Ok(new ApiResponse<AppointmentDto> { Data = appointment });
    }
}
