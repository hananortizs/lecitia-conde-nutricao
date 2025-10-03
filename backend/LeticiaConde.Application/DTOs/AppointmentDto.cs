using System.ComponentModel.DataAnnotations;
using LeticiaConde.Core.Entities;

namespace LeticiaConde.Application.DTOs;

/// <summary>
/// DTO for appointment request
/// </summary>
public class RequestAppointmentDto
{
    /// <summary>
    /// ID of the lead requesting the appointment
    /// </summary>
    [Required(ErrorMessage = "LeadId is required")]
    public int LeadId { get; set; }

    /// <summary>
    /// Desired date and time for the appointment
    /// </summary>
    [Required(ErrorMessage = "DateTime is required")]
    public DateTime DateTime { get; set; }

    /// <summary>
    /// Additional observations
    /// </summary>
    [MaxLength(1000, ErrorMessage = "Observations must have maximum 1000 characters")]
    public string? Observations { get; set; }
}

/// <summary>
/// DTO for appointment response
/// </summary>
public class AppointmentDto
{
    /// <summary>
    /// Appointment ID
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Lead ID
    /// </summary>
    public int LeadId { get; set; }

    /// <summary>
    /// Lead name
    /// </summary>
    public string LeadName { get; set; } = string.Empty;

    /// <summary>
    /// Lead email
    /// </summary>
    public string LeadEmail { get; set; } = string.Empty;

    /// <summary>
    /// Lead WhatsApp
    /// </summary>
    public string LeadWhatsApp { get; set; } = string.Empty;

    /// <summary>
    /// Appointment date and time
    /// </summary>
    public DateTime DateTime { get; set; }

    /// <summary>
    /// Appointment status
    /// </summary>
    public AppointmentStatus Status { get; set; }

    /// <summary>
    /// Reservation date
    /// </summary>
    public DateTime ReservationDate { get; set; }

    /// <summary>
    /// Confirmation date
    /// </summary>
    public DateTime? ConfirmationDate { get; set; }

    /// <summary>
    /// Virtual room link
    /// </summary>
    public string? VirtualRoomLink { get; set; }

    /// <summary>
    /// Observations
    /// </summary>
    public string? Observations { get; set; }
}

/// <summary>
/// DTO for available time slot
/// </summary>
public class AvailableSlotDto
{
    /// <summary>
    /// Slot date and time
    /// </summary>
    public DateTime DateTime { get; set; }

    /// <summary>
    /// Indicates if the slot is available
    /// </summary>
    public bool Available { get; set; }

    /// <summary>
    /// Reason for unavailability (if applicable)
    /// </summary>
    public string? UnavailabilityReason { get; set; }
}

/// <summary>
/// DTO for payment confirmation via webhook
/// </summary>
public class ConfirmPaymentDto
{
    /// <summary>
    /// Transaction ID
    /// </summary>
    [Required(ErrorMessage = "TransactionId is required")]
    public string TransactionId { get; set; } = string.Empty;

    /// <summary>
    /// Payment status
    /// </summary>
    [Required(ErrorMessage = "Status is required")]
    public string Status { get; set; } = string.Empty;

    /// <summary>
    /// Amount paid
    /// </summary>
    public decimal? Amount { get; set; }

    /// <summary>
    /// Additional webhook data
    /// </summary>
    public Dictionary<string, object>? AdditionalData { get; set; }
}
