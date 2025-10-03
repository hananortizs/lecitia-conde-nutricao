using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using LeticiaConde.Core.Entities;
using LeticiaConde.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Http;
using System.Text.Json.Serialization;

namespace LeticiaConde.Application.Services;

/// <summary>
/// Serviço para gerenciamento de agendamentos com regras de horário e Sabbat
/// </summary>
public class AppointmentService : IAppointmentService
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    /// <summary>
    /// Construtor do serviço
    /// </summary>
    /// <param name="context">Contexto do banco de dados</param>
    /// <param name="httpClientFactory">Factory para criação de clientes HTTP</param>
    /// <param name="configuration">Configurações da aplicação</param>
    public AppointmentService(ApplicationDbContext context, IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _context = context;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    /// <summary>
    /// Gets available time slots for appointment
    /// </summary>
    /// <param name="startDate">Start date for search</param>
    /// <param name="endDate">End date for search</param>
    /// <returns>List of available slots</returns>
    public async Task<IEnumerable<AvailableSlotDto>> GetAvailableSlotsAsync(DateTime startDate, DateTime endDate)
    {
        var slots = new List<AvailableSlotDto>();
        var configurations = await _context.ScheduleConfigurations.ToListAsync();
        var existingAppointments = await _context.Appointments
            .Where(a => a.DateTime >= startDate && a.DateTime <= endDate && a.Status != AppointmentStatus.Cancelled)
            .ToListAsync();

        var currentDate = startDate.Date;
        while (currentDate <= endDate.Date)
        {
            var dayOfWeek = (int)currentDate.DayOfWeek;
            var configuration = configurations.FirstOrDefault(c => c.DayOfWeek == dayOfWeek);

            if (configuration == null || !configuration.Active)
            {
                currentDate = currentDate.AddDays(1);
                continue;
            }

            // Check if it's Sabbath
            if (configuration.Sabbath)
            {
                var fridaySunset = await GetSunsetTimeAsync(currentDate.AddDays(-1)); // Friday
                var saturdaySunset = await GetSunsetTimeAsync(currentDate); // Saturday

                if (fridaySunset.HasValue && saturdaySunset.HasValue)
                {
                    // Block the entire Sabbath period
                    var sabbathStart = fridaySunset.Value;
                    var sabbathEnd = saturdaySunset.Value;

                    var sabbathSlot = new AvailableSlotDto
                    {
                        DateTime = sabbathStart,
                        Available = false,
                        UnavailabilityReason = "Sabbath - Blocked period"
                    };
                    slots.Add(sabbathSlot);
                }
            }
            else
            {
                // Generate slots for normal days
                var daySlots = await GenerateDaySlotsAsync(currentDate, configuration, existingAppointments);
                slots.AddRange(daySlots);
            }

            currentDate = currentDate.AddDays(1);
        }

        return slots.OrderBy(s => s.DateTime);
    }

    /// <summary>
    /// Reserves a time slot for appointment
    /// </summary>
    /// <param name="dto">Appointment request data</param>
    /// <returns>Created appointment</returns>
    public async Task<AppointmentDto> ReserveTimeSlotAsync(RequestAppointmentDto dto)
    {
        // Check if the time slot is available
        var available = await CheckAvailabilityAsync(dto.DateTime);
        if (!available)
        {
            throw new InvalidOperationException("Time slot not available for appointment");
        }

        // Check if the lead exists
        var lead = await _context.Leads.FindAsync(dto.LeadId);
        if (lead == null)
        {
            throw new ArgumentException("Lead not found");
        }

        // Create the appointment
        var appointment = new Appointment
        {
            LeadId = dto.LeadId,
            DateTime = dto.DateTime.Kind == DateTimeKind.Utc ? dto.DateTime : dto.DateTime.ToUniversalTime(),
            Status = AppointmentStatus.Reserved,
            ReservationDate = DateTime.UtcNow,
            Observations = dto.Observations
        };

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        // Mark the lead as converted
        lead.Converted = true;
        await _context.SaveChangesAsync();

        return await GetAppointmentByIdAsync(appointment.Id) ?? throw new InvalidOperationException("Error creating appointment");
    }

    /// <summary>
    /// Confirms an appointment after payment
    /// </summary>
    /// <param name="appointmentId">Appointment ID</param>
    /// <param name="transactionId">Payment transaction ID</param>
    /// <returns>Confirmed appointment</returns>
    public async Task<AppointmentDto> ConfirmAppointmentAsync(int appointmentId, string transactionId)
    {
        var appointment = await _context.Appointments.FindAsync(appointmentId);
        if (appointment == null)
        {
            throw new ArgumentException("Appointment not found");
        }

        if (appointment.Status != AppointmentStatus.Reserved)
        {
            throw new InvalidOperationException("Appointment cannot be confirmed in current status");
        }

        appointment.Status = AppointmentStatus.Confirmed;
        appointment.ConfirmationDate = DateTime.UtcNow;
        appointment.TransactionId = transactionId;

        // TODO: Integrate with Google Calendar/Zoom to generate virtual room link
        appointment.VirtualRoomLink = await GenerateVirtualRoomLinkAsync(appointment.DateTime);

        await _context.SaveChangesAsync();

        return await GetAppointmentByIdAsync(appointmentId) ?? throw new InvalidOperationException("Error confirming appointment");
    }

    /// <summary>
    /// Gets an appointment by ID
    /// </summary>
    /// <param name="id">Appointment ID</param>
    /// <returns>Found appointment or null</returns>
    public async Task<AppointmentDto?> GetAppointmentByIdAsync(int id)
    {
        var appointment = await _context.Appointments
            .Include(a => a.Lead)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (appointment == null)
            return null;

        return new AppointmentDto
        {
            Id = appointment.Id,
            LeadId = appointment.LeadId,
            LeadName = appointment.Lead.Name,
            LeadEmail = appointment.Lead.Email,
            LeadWhatsApp = appointment.Lead.WhatsApp,
            DateTime = appointment.DateTime,
            Status = appointment.Status,
            ReservationDate = appointment.ReservationDate,
            ConfirmationDate = appointment.ConfirmationDate,
            VirtualRoomLink = appointment.VirtualRoomLink,
            Observations = appointment.Observations
        };
    }

    /// <summary>
    /// Gets all appointments
    /// </summary>
    /// <returns>List of appointments</returns>
    public async Task<IEnumerable<AppointmentDto>> GetAllAppointmentsAsync()
    {
        var appointments = await _context.Appointments
            .Include(a => a.Lead)
            .OrderBy(a => a.DateTime)
            .ToListAsync();

        return appointments.Select(appointment => new AppointmentDto
        {
            Id = appointment.Id,
            LeadId = appointment.LeadId,
            LeadName = appointment.Lead.Name,
            LeadEmail = appointment.Lead.Email,
            LeadWhatsApp = appointment.Lead.WhatsApp,
            DateTime = appointment.DateTime,
            Status = appointment.Status,
            ReservationDate = appointment.ReservationDate,
            ConfirmationDate = appointment.ConfirmationDate,
            VirtualRoomLink = appointment.VirtualRoomLink,
            Observations = appointment.Observations
        });
    }

    /// <summary>
    /// Cancels an appointment
    /// </summary>
    /// <param name="id">Appointment ID</param>
    /// <returns>True if cancelled successfully</returns>
    public async Task<bool> CancelAppointmentAsync(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
            return false;

        appointment.Status = AppointmentStatus.Cancelled;
        await _context.SaveChangesAsync();

        return true;
    }

    /// <summary>
    /// Checks if a time slot is available
    /// </summary>
    /// <param name="dateTime">Date and time to check</param>
    /// <returns>True if available</returns>
    public async Task<bool> CheckAvailabilityAsync(DateTime dateTime)
    {
        var dayOfWeek = (int)dateTime.DayOfWeek;
        var configuration = await _context.ScheduleConfigurations
            .FirstOrDefaultAsync(c => c.DayOfWeek == dayOfWeek);

        if (configuration == null || !configuration.Active)
            return false;

        // Check if it's Sabbath
        if (configuration.Sabbath)
        {
            var sunset = await GetSunsetTimeAsync(dateTime.Date);
            if (sunset.HasValue && dateTime >= sunset.Value)
                return false;
        }

        // Check working hours
        if (configuration.StartTime.HasValue && configuration.EndTime.HasValue)
        {
            var time = dateTime.TimeOfDay;
            if (time < configuration.StartTime.Value || time > configuration.EndTime.Value)
                return false;
        }

        // Check if there's already an appointment at this time
        var existingAppointment = await _context.Appointments
            .AnyAsync(a => a.DateTime == dateTime && a.Status != AppointmentStatus.Cancelled);

        return !existingAppointment;
    }

    /// <summary>
    /// Gets sunset time for a specific date from an external API
    /// </summary>
    /// <param name="date">Date for query</param>
    /// <returns>Sunset time</returns>
    public async Task<DateTime?> GetSunsetTimeAsync(DateTime date)
    {
        try
        {
            // São Paulo coordinates (adjust as needed)
            var latitude = _configuration["SunsetApi:Latitude"] ?? "-23.5505";
            var longitude = _configuration["SunsetApi:Longitude"] ?? "-46.6333";
            var apiUrl = $"https://api.sunrise-sunset.org/json?lat={latitude}&lng={longitude}&date={date:yyyy-MM-dd}&formatted=0";

            using var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.GetStringAsync(apiUrl);
            var sunsetData = System.Text.Json.JsonSerializer.Deserialize<SunsetApiResponse>(response);

            if (sunsetData?.Status == "OK" && DateTime.TryParse(sunsetData.Results.Sunset, out var sunset))
            {
                return sunset.ToLocalTime();
            }
        }
        catch (Exception)
        {
            // In case of API error, return null
        }
        return null;
    }

    /// <summary>
    /// Generates time slots for a specific day
    /// </summary>
    /// <param name="date">Date to generate slots</param>
    /// <param name="configuration">Day's schedule configuration</param>
    /// <param name="existingAppointments">Existing appointments</param>
    /// <returns>List of day's slots</returns>
    private async Task<List<AvailableSlotDto>> GenerateDaySlotsAsync(DateTime date, ScheduleConfiguration configuration, List<Appointment> existingAppointments)
    {
        var slots = new List<AvailableSlotDto>();

        if (!configuration.StartTime.HasValue || !configuration.EndTime.HasValue)
            return slots;

        var startTime = configuration.StartTime.Value;
        var endTime = configuration.EndTime.Value;
        var slotDuration = TimeSpan.FromMinutes(60); // 1-hour slots

        var currentTime = startTime;
        while (currentTime < endTime)
        {
            var slotDateTime = date.Add(currentTime);

            // Check if the slot is available
            var available = !existingAppointments.Any(a => a.DateTime == slotDateTime);

            // Check if it's not Sabbath
            if (available && configuration.Sabbath)
            {
                var sunset = await GetSunsetTimeAsync(date);
                if (sunset.HasValue && slotDateTime >= sunset.Value)
                {
                    available = false;
                }
            }

            slots.Add(new AvailableSlotDto
            {
                DateTime = slotDateTime,
                Available = available,
                UnavailabilityReason = available ? null : "Time slot already occupied"
            });

            currentTime = currentTime.Add(slotDuration);
        }

        return slots;
    }

    /// <summary>
    /// Generates virtual room link (future integration with Google Calendar/Zoom)
    /// </summary>
    /// <param name="dateTime">Appointment date and time</param>
    /// <returns>Virtual room link</returns>
    private Task<string> GenerateVirtualRoomLinkAsync(DateTime dateTime)
    {
        // TODO: Implement integration with Google Calendar or Zoom
        // For now, returns a placeholder link
        return Task.FromResult($"https://meet.google.com/leticia-conde-{dateTime:yyyyMMdd-HHmm}");
    }
}

/// <summary>
/// Class for deserializing sunset API response
/// </summary>
public class SunsetApiResponse
{
    [JsonPropertyName("results")]
    public SunsetResults Results { get; set; } = new SunsetResults();
    [JsonPropertyName("status")]
    public string Status { get; set; } = string.Empty;
}

public class SunsetResults
{
    [JsonPropertyName("sunrise")]
    public string Sunrise { get; set; } = string.Empty;
    [JsonPropertyName("sunset")]
    public string Sunset { get; set; } = string.Empty;
    [JsonPropertyName("solar_noon")]
    public string SolarNoon { get; set; } = string.Empty;
    [JsonPropertyName("day_length")]
    public string DayLength { get; set; } = string.Empty;
    [JsonPropertyName("civil_twilight_begin")]
    public string CivilTwilightBegin { get; set; } = string.Empty;
    [JsonPropertyName("civil_twilight_end")]
    public string CivilTwilightEnd { get; set; } = string.Empty;
    [JsonPropertyName("nautical_twilight_begin")]
    public string NauticalTwilightBegin { get; set; } = string.Empty;
    [JsonPropertyName("nautical_twilight_end")]
    public string NauticalTwilightEnd { get; set; } = string.Empty;
    [JsonPropertyName("astronomical_twilight_begin")]
    public string AstronomicalTwilightBegin { get; set; } = string.Empty;
    [JsonPropertyName("astronomical_twilight_end")]
    public string AstronomicalTwilightEnd { get; set; } = string.Empty;
}
