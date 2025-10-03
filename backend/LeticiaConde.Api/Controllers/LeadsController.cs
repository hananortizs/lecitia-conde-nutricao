using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeticiaConde.Api.Controllers;

/// <summary>
/// Controller para gerenciamento de leads
/// </summary>
[ApiController]
[Route("pms/leads")]
public class LeadsController : ControllerBase
{
    private readonly ILeadService _leadService;

    /// <summary>
    /// Construtor do controller
    /// </summary>
    /// <param name="leadService">Serviço de leads</param>
    public LeadsController(ILeadService leadService)
    {
        _leadService = leadService;
    }

    /// <summary>
    /// Validates BMI calculation (for consistency check)
    /// Note: BMI should be calculated on frontend for better UX
    /// </summary>
    /// <param name="dto">Data for BMI validation</param>
    /// <returns>BMI validation result</returns>
    [HttpPost("validate-bmi")]
    public async Task<ActionResult<ApiResponse<BmiResultDto>>> ValidateBmi([FromBody] CalculateBmiDto dto)
    {
        try
        {
            var result = await _leadService.CalculateBmiAsync(dto);
            return Ok(new ApiResponse<BmiResultDto> { Data = result });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }

    /// <summary>
    /// Captures a new lead after BMI calculation
    /// </summary>
    /// <param name="dto">Lead data for capture</param>
    /// <returns>Captured lead</returns>
    [HttpPost("capture-lead")]
    public async Task<ActionResult<ApiResponse<CapturedLeadDto>>> CaptureLead([FromBody] CaptureLeadDto dto)
    {
        try
        {
            var lead = await _leadService.CaptureLeadAsync(dto);
            return Ok(new ApiResponse<CapturedLeadDto> { Data = lead });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }

    /// <summary>
    /// Gets a lead by ID
    /// </summary>
    /// <param name="id">Lead ID</param>
    /// <returns>Found lead</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CapturedLeadDto>>> GetLeadById(int id)
    {
        try
        {
            var lead = await _leadService.GetLeadByIdAsync(id);
            if (lead == null)
                return NotFound(new ApiResponse<object> { Error = "Lead not found" });

            return Ok(new ApiResponse<CapturedLeadDto> { Data = lead });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }

    /// <summary>
    /// Gets all leads
    /// </summary>
    /// <returns>List of leads</returns>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<CapturedLeadDto>>>> GetAllLeads()
    {
        try
        {
            var leads = await _leadService.GetAllLeadsAsync();
            return Ok(new ApiResponse<IEnumerable<CapturedLeadDto>> { Data = leads });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }

    /// <summary>
    /// Marks a lead as converted
    /// </summary>
    /// <param name="id">Lead ID</param>
    /// <returns>Operation result</returns>
    [HttpPut("{id}/mark-converted")]
    public async Task<ActionResult<ApiResponse<bool>>> MarkAsConverted(int id)
    {
        try
        {
            var success = await _leadService.MarkAsConvertedAsync(id);
            if (!success)
                return NotFound(new ApiResponse<object> { Error = "Lead not found" });

            return Ok(new ApiResponse<bool> { Data = success });
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object> { Error = ex.Message });
        }
    }
}

/// <summary>
/// Class for standardizing API responses
/// </summary>
/// <typeparam name="T">Response data type</typeparam>
public class ApiResponse<T>
{
    /// <summary>
    /// Response data
    /// </summary>
    public T? Data { get; set; }

    /// <summary>
    /// Error message (if any)
    /// </summary>
    public string? Error { get; set; }

    /// <summary>
    /// Indicates if the operation was successful
    /// </summary>
    public bool Success => Error == null;
}
