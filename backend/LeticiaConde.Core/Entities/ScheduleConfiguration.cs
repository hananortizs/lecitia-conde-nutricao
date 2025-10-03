using System.ComponentModel.DataAnnotations;

namespace LeticiaConde.Core.Entities;

/// <summary>
/// Represents the nutritionist's working hours configuration
/// </summary>
public class ScheduleConfiguration
{
    /// <summary>
    /// Unique configuration identifier
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Day of the week (0 = Sunday, 1 = Monday, etc.)
    /// </summary>
    [Required]
    [Range(0, 6)]
    public int DayOfWeek { get; set; }

    /// <summary>
    /// Day of the week name
    /// </summary>
    [Required]
    [MaxLength(20)]
    public string DayName { get; set; } = string.Empty;

    /// <summary>
    /// Indicates if the day is active for appointments
    /// </summary>
    public bool Active { get; set; }

    /// <summary>
    /// Service start time
    /// </summary>
    public TimeSpan? StartTime { get; set; }

    /// <summary>
    /// Service end time
    /// </summary>
    public TimeSpan? EndTime { get; set; }

    /// <summary>
    /// Indicates if it's a Sabbath day (completely blocked)
    /// </summary>
    public bool Sabbath { get; set; } = false;

    /// <summary>
    /// Observations about the schedule
    /// </summary>
    [MaxLength(200)]
    public string? Observations { get; set; }
}
