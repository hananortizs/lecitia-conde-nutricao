using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeticiaConde.Api.Controllers;

/// <summary>
/// Controller para gerenciamento de agendamentos
/// </summary>
[ApiController]
[Route("api/appointments")]
public class AppointmentController : ControllerBase
{
    private readonly IAppointmentService _appointmentService;

    /// <summary>
    /// Construtor do controller
    /// </summary>
    /// <param name="appointmentService">Serviço de agendamentos</param>
    public AppointmentController(IAppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }

    /// <summary>
    /// Gets available time slots for appointment
    /// </summary>
    /// <param name="startDate">Start date for search (optional)</param>
    /// <param name="endDate">End date for search (optional)</param>
    /// <returns>List of available slots</returns>
    [HttpGet("available-slots")]
    public async Task<ActionResult<ApiResponse<IEnumerable<AvailableSlotDto>>>> GetAvailableSlots(
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        try
        {
            var start = startDate ?? DateTime.Today;
            var end = endDate ?? DateTime.Today.AddDays(30);

            var slots = await _appointmentService.GetAvailableSlotsAsync(start, end);
            return Ok(new ApiResponse<IEnumerable<AvailableSlotDto>> { Data = slots });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }

    /// <summary>
    /// Reserves a time slot for appointment
    /// </summary>
    /// <param name="dto">Appointment request data</param>
    /// <returns>Created appointment</returns>
    [HttpPost("reserve")]
    public async Task<ActionResult<ApiResponse<AppointmentDto>>> ReserveTimeSlot([FromBody] RequestAppointmentDto dto)
    {
        try
        {
            var appointment = await _appointmentService.ReserveTimeSlotAsync(dto);
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

    /// <summary>
    /// Gets an appointment by ID
    /// </summary>
    /// <param name="id">Appointment ID</param>
    /// <returns>Found appointment</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<AppointmentDto>>> GetAppointmentById(int id)
    {
        try
        {
            var appointment = await _appointmentService.GetAppointmentByIdAsync(id);
            if (appointment == null)
                return NotFound(new ApiResponse<object> { Error = "Appointment not found" });

            return Ok(new ApiResponse<AppointmentDto> { Data = appointment });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }

    /// <summary>
    /// Gets all appointments
    /// </summary>
    /// <returns>List of appointments</returns>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<AppointmentDto>>>> GetAllAppointments()
    {
        try
        {
            var appointments = await _appointmentService.GetAllAppointmentsAsync();
            return Ok(new ApiResponse<IEnumerable<AppointmentDto>> { Data = appointments });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }

    /// <summary>
    /// Cancels an appointment
    /// </summary>
    /// <param name="id">Appointment ID</param>
    /// <returns>Operation result</returns>
    [HttpPut("{id}/cancel")]
    public async Task<ActionResult<ApiResponse<bool>>> CancelAppointment(int id)
    {
        try
        {
            var success = await _appointmentService.CancelAppointmentAsync(id);
            if (!success)
                return NotFound(new ApiResponse<object> { Error = "Appointment not found" });

            return Ok(new ApiResponse<bool> { Data = success });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }

    /// <summary>
    /// Checks if a time slot is available
    /// </summary>
    /// <param name="dateTime">Date and time to check</param>
    /// <returns>True if available</returns>
    [HttpGet("check-availability")]
    public async Task<ActionResult<ApiResponse<bool>>> CheckAvailability([FromQuery] DateTime dateTime)
    {
        try
        {
            var available = await _appointmentService.CheckAvailabilityAsync(dateTime);
            return Ok(new ApiResponse<bool> { Data = available });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }
}
