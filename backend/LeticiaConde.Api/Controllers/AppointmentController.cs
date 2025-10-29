using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeticiaConde.Api.Controllers;

/// <summary>
/// Controller para gerenciamento de agendamentos
/// Responsabilidade: Apenas receber requisições HTTP e delegar para os services
/// </summary>
[ApiController]
[Route("[controller]")]
public class AppointmentController : ControllerBase
{
    private readonly IAppointmentService _appointmentService;

    public AppointmentController(IAppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }

    /// <summary>
    /// Gets available time slots for appointment
    /// </summary>
    [HttpGet("available-slots")]
    public async Task<ActionResult<ApiResponse<IEnumerable<AvailableSlotDto>>>> GetAvailableSlots(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        var slots = await _appointmentService.GetAvailableSlotsAsync(startDate, endDate);
        return Ok(new ApiResponse<IEnumerable<AvailableSlotDto>> { Data = slots });
    }

    /// <summary>
    /// Reserves a time slot for appointment
    /// </summary>
    [HttpPost("reserve")]
    public async Task<ActionResult<ApiResponse<AppointmentDto>>> ReserveTimeSlot([FromBody] RequestAppointmentDto dto)
    {
        var appointment = await _appointmentService.ReserveTimeSlotAsync(dto);
        return Ok(new ApiResponse<AppointmentDto> { Data = appointment });
    }

    /// <summary>
    /// Gets an appointment by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<AppointmentDto>>> GetAppointmentById(int id)
    {
        var appointment = await _appointmentService.GetAppointmentByIdAsync(id);
        return Ok(new ApiResponse<AppointmentDto> { Data = appointment });
    }

    /// <summary>
    /// Gets all appointments
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<AppointmentDto>>>> GetAllAppointments()
    {
        var appointments = await _appointmentService.GetAllAppointmentsAsync();
        return Ok(new ApiResponse<IEnumerable<AppointmentDto>> { Data = appointments });
    }

    /// <summary>
    /// Cancels an appointment
    /// </summary>
    [HttpPut("{id}/cancel")]
    public async Task<ActionResult<ApiResponse<bool>>> CancelAppointment(int id)
    {
        await _appointmentService.CancelAppointmentAsync(id);
        return Ok(new ApiResponse<bool> { Data = true });
    }

    /// <summary>
    /// Checks if a time slot is available
    /// </summary>
    [HttpGet("check-availability")]
    public async Task<ActionResult<ApiResponse<bool>>> CheckAvailability([FromQuery] DateTime dateTime)
    {
        var available = await _appointmentService.CheckAvailabilityAsync(dateTime);
        return Ok(new ApiResponse<bool> { Data = available });
    }
}
