using System.ComponentModel.DataAnnotations;

namespace LeticiaConde.Core.Entities;

/// <summary>
/// Represents a nutritional consultation appointment
/// </summary>
public class Appointment
{
    /// <summary>
    /// Unique appointment identifier
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// ID of the lead associated with the appointment
    /// </summary>
    public int LeadId { get; set; }

    /// <summary>
    /// Lead associated with the appointment
    /// </summary>
    public Lead Lead { get; set; } = null!;

    /// <summary>
    /// Appointment date and time
    /// </summary>
    [Required]
    public DateTime DateTime { get; set; }

    /// <summary>
    /// Appointment status
    /// </summary>
    public AppointmentStatus Status { get; set; } = AppointmentStatus.Reserved;

    /// <summary>
    /// Reservation date and time (when it was created)
    /// </summary>
    public DateTime ReservationDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Confirmation date and time (when it was paid)
    /// </summary>
    public DateTime? ConfirmationDate { get; set; }

    /// <summary>
    /// Virtual room link (Google Meet/Zoom)
    /// </summary>
    [MaxLength(500)]
    public string? VirtualRoomLink { get; set; }

    /// <summary>
    /// Additional appointment observations
    /// </summary>
    [MaxLength(1000)]
    public string? Observations { get; set; }

    /// <summary>
    /// Payment transaction ID
    /// </summary>
    [MaxLength(100)]
    public string? TransactionId { get; set; }
}

/// <summary>
/// Enum that represents the possible statuses of an appointment
/// </summary>
public enum AppointmentStatus
{
    /// <summary>
    /// Reserved appointment (awaiting payment)
    /// </summary>
    Reserved = 1,

    /// <summary>
    /// Confirmed appointment (payment approved)
    /// </summary>
    Confirmed = 2,

    /// <summary>
    /// Cancelled appointment
    /// </summary>
    Cancelled = 3,

    /// <summary>
    /// Completed appointment
    /// </summary>
    Completed = 4
}
