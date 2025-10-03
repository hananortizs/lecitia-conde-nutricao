using System.ComponentModel.DataAnnotations;

namespace LeticiaConde.Application.DTOs;

/// <summary>
/// DTO for lead capture through BMI calculator
/// </summary>
public class CaptureLeadDto
{
    /// <summary>
    /// Full name of the lead
    /// </summary>
    [Required(ErrorMessage = "Name is required")]
    [MaxLength(100, ErrorMessage = "Name must have maximum 100 characters")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Lead email
    /// </summary>
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Email must have a valid format")]
    [MaxLength(100, ErrorMessage = "Email must have maximum 100 characters")]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Lead WhatsApp number
    /// </summary>
    [Required(ErrorMessage = "WhatsApp is required")]
    [MaxLength(20, ErrorMessage = "WhatsApp must have maximum 20 characters")]
    public string WhatsApp { get; set; } = string.Empty;

    /// <summary>
    /// Weight in kg
    /// </summary>
    [Required(ErrorMessage = "Weight is required")]
    [Range(1, 500, ErrorMessage = "Weight must be between 1 and 500 kg")]
    public decimal Weight { get; set; }

    /// <summary>
    /// Height in meters
    /// </summary>
    [Required(ErrorMessage = "Height is required")]
    [Range(0.5, 3.0, ErrorMessage = "Height must be between 0.5 and 3.0 meters")]
    public decimal Height { get; set; }

    /// <summary>
    /// BMI calculated by frontend (for validation)
    /// </summary>
    [Required(ErrorMessage = "BMI is required")]
    [Range(10, 100, ErrorMessage = "BMI must be between 10 and 100")]
    public decimal Bmi { get; set; }

    /// <summary>
    /// BMI classification calculated by frontend
    /// </summary>
    [Required(ErrorMessage = "BMI classification is required")]
    [MaxLength(50, ErrorMessage = "BMI classification must have maximum 50 characters")]
    public string BmiClassification { get; set; } = string.Empty;
}

/// <summary>
/// DTO for captured lead response
/// </summary>
public class CapturedLeadDto
{
    /// <summary>
    /// Captured lead ID
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Lead name
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Lead email
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Lead WhatsApp
    /// </summary>
    public string WhatsApp { get; set; } = string.Empty;

    /// <summary>
    /// Calculated BMI
    /// </summary>
    public decimal Bmi { get; set; }

    /// <summary>
    /// BMI classification
    /// </summary>
    public string BmiClassification { get; set; } = string.Empty;

    /// <summary>
    /// Capture date
    /// </summary>
    public DateTime CaptureDate { get; set; }
}

/// <summary>
/// DTO for BMI calculation
/// </summary>
public class CalculateBmiDto
{
    /// <summary>
    /// Weight in kg
    /// </summary>
    [Required(ErrorMessage = "Weight is required")]
    [Range(1, 500, ErrorMessage = "Weight must be between 1 and 500 kg")]
    public decimal Weight { get; set; }

    /// <summary>
    /// Height in meters
    /// </summary>
    [Required(ErrorMessage = "Height is required")]
    [Range(0.5, 3.0, ErrorMessage = "Height must be between 0.5 and 3.0 meters")]
    public decimal Height { get; set; }
}

/// <summary>
/// DTO for BMI calculation response
/// </summary>
public class BmiResultDto
{
    /// <summary>
    /// Calculated BMI
    /// </summary>
    public decimal Bmi { get; set; }

    /// <summary>
    /// BMI classification
    /// </summary>
    public string Classification { get; set; } = string.Empty;

    /// <summary>
    /// Classification description
    /// </summary>
    public string Description { get; set; } = string.Empty;
}

