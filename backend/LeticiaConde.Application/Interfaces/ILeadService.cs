using LeticiaConde.Application.DTOs;

namespace LeticiaConde.Application.Interfaces;

/// <summary>
/// Interface para o serviço de gerenciamento de leads
/// </summary>
public interface ILeadService
{
    /// <summary>
    /// Calculates BMI based on weight and height
    /// </summary>
    /// <param name="dto">Data for BMI calculation</param>
    /// <returns>BMI calculation result</returns>
    Task<BmiResultDto> CalculateBmiAsync(CalculateBmiDto dto);

    /// <summary>
    /// Captures a new lead after BMI calculation
    /// </summary>
    /// <param name="dto">Lead data for capture</param>
    /// <returns>Captured lead</returns>
    Task<CapturedLeadDto> CaptureLeadAsync(CaptureLeadDto dto);

    /// <summary>
    /// Gets a lead by ID
    /// </summary>
    /// <param name="id">Lead ID</param>
    /// <returns>Found lead or null</returns>
    Task<CapturedLeadDto?> GetLeadByIdAsync(int id);

    /// <summary>
    /// Gets all leads
    /// </summary>
    /// <returns>List of leads</returns>
    Task<IEnumerable<CapturedLeadDto>> GetAllLeadsAsync();

    /// <summary>
    /// Marks a lead as converted
    /// </summary>
    /// <param name="id">Lead ID</param>
    /// <returns>True if marked successfully</returns>
    Task<bool> MarkAsConvertedAsync(int id);
}

