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
    /// <returns>Found lead</returns>
    /// <exception cref="Exceptions.NotFoundException">Thrown when lead is not found</exception>
    Task<CapturedLeadDto> GetLeadByIdAsync(int id);

    /// <summary>
    /// Gets all leads with pagination and optional conversion filter
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Items per page</param>
    /// <param name="converted">Optional filter by converted status</param>
    /// <returns>Paged list of leads</returns>
    Task<PagedResult<CapturedLeadDto>> GetAllLeadsAsync(int page = 1, int pageSize = 10, bool? converted = null);

    /// <summary>
    /// Searches leads by name, email or WhatsApp with pagination
    /// </summary>
    /// <param name="query">Search term (optional)</param>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Items per page</param>
    /// <returns>Paged list of leads</returns>
    Task<PagedResult<CapturedLeadDto>> SearchLeadsAsync(string? query, int page = 1, int pageSize = 10);

    /// <summary>
    /// Marks a lead as converted
    /// </summary>
    /// <param name="id">Lead ID</param>
    /// <exception cref="Exceptions.NotFoundException">Thrown when lead is not found</exception>
    Task MarkAsConvertedAsync(int id);
}

