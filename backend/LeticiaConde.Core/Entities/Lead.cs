using System.ComponentModel.DataAnnotations;

namespace LeticiaConde.Core.Entities;

/// <summary>
/// Represents a lead captured through the BMI calculator
/// </summary>
public class Lead
{
    /// <summary>
    /// Unique lead identifier
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Full name of the lead
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Lead email
    /// </summary>
    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Lead WhatsApp number
    /// </summary>
    [Required]
    [MaxLength(20)]
    public string WhatsApp { get; set; } = string.Empty;

    /// <summary>
    /// Weight informed for BMI calculation
    /// </summary>
    [Required]
    [Range(1, 500)]
    public decimal Weight { get; set; }

    /// <summary>
    /// Height informed for BMI calculation
    /// </summary>
    [Required]
    [Range(0.5, 3.0)]
    public decimal Height { get; set; }

    /// <summary>
    /// Calculated BMI
    /// </summary>
    public decimal Bmi { get; set; }

    /// <summary>
    /// BMI classification (Underweight, Normal, etc.)
    /// </summary>
    [MaxLength(50)]
    public string BmiClassification { get; set; } = string.Empty;

    /// <summary>
    /// Lead capture date and time
    /// </summary>
    public DateTime CaptureDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Indicates if the lead was converted to an appointment
    /// </summary>
    public bool Converted { get; set; } = false;
}

