using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeticiaConde.Api.Controllers;

/// <summary>
/// Controller para gerenciamento de leads
/// Responsabilidade: Apenas receber requisições HTTP e delegar para os services
/// </summary>
[ApiController]
[Route("[controller]")]
public class LeadsController : ControllerBase
{
    private readonly ILeadService _leadService;

    public LeadsController(ILeadService leadService)
    {
        _leadService = leadService;
    }

    /// <summary>
    /// Validates BMI calculation (for consistency check)
    /// </summary>
    [HttpPost("validate-bmi")]
    public async Task<ActionResult<ApiResponse<BmiResultDto>>> ValidateBmi([FromBody] CalculateBmiDto dto)
    {
        var result = await _leadService.CalculateBmiAsync(dto);
        return Ok(new ApiResponse<BmiResultDto> { Data = result });
    }

    /// <summary>
    /// Captures a new lead after BMI calculation
    /// </summary>
    [HttpPost("capture-lead")]
    public async Task<ActionResult<ApiResponse<CapturedLeadDto>>> CaptureLead([FromBody] CaptureLeadDto dto)
    {
        var lead = await _leadService.CaptureLeadAsync(dto);
        return Ok(new ApiResponse<CapturedLeadDto> { Data = lead });
    }

    /// <summary>
    /// Gets a lead by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CapturedLeadDto>>> GetLeadById(int id)
    {
        var lead = await _leadService.GetLeadByIdAsync(id);
        return Ok(new ApiResponse<CapturedLeadDto> { Data = lead });
    }

    /// <summary>
    /// Gets all leads (paginated) and allows filtering by converted status
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Items per page</param>
    /// <param name="converted">Optional filter by converted status</param>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<PagedResult<CapturedLeadDto>>>> GetAllLeads(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] bool? converted = null)
    {
        var result = await _leadService.GetAllLeadsAsync(page, pageSize, converted);
        return Ok(new ApiResponse<PagedResult<CapturedLeadDto>> { Data = result });
    }

    /// <summary>
    /// Searches leads by name, email or WhatsApp with pagination
    /// </summary>
    /// <param name="query">Search term (optional)</param>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Items per page</param>
    [HttpGet("search")]
    public async Task<ActionResult<ApiResponse<PagedResult<CapturedLeadDto>>>> Search(
        [FromQuery] string? query,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var result = await _leadService.SearchLeadsAsync(query, page, pageSize);
        return Ok(new ApiResponse<PagedResult<CapturedLeadDto>> { Data = result });
    }

    /// <summary>
    /// Marks a lead as converted
    /// </summary>
    [HttpPut("{id}/mark-converted")]
    public async Task<ActionResult<ApiResponse<bool>>> MarkAsConverted(int id)
    {
        await _leadService.MarkAsConvertedAsync(id);
        return Ok(new ApiResponse<bool> { Data = true });
    }
}

/// <summary>
/// Standardized API response wrapper
/// </summary>
public class ApiResponse<T>
{
    public T? Data { get; set; }
    public string? Error { get; set; }
    public bool Success => Error == null;
}
