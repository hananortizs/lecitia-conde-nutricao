using LeticiaConde.Application.DTOs;
using LeticiaConde.Application.Interfaces;
using LeticiaConde.Core.Entities;
using LeticiaConde.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LeticiaConde.Application.Services;

/// <summary>
/// Serviço para gerenciamento de leads
/// </summary>
public class LeadService : ILeadService
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Construtor do serviço
    /// </summary>
    /// <param name="context">Contexto do banco de dados</param>
    public LeadService(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Validates BMI data and returns classification (for consistency)
    /// Note: Actual BMI calculation should be done on frontend for better UX
    /// </summary>
    /// <param name="dto">Data for BMI validation</param>
    /// <returns>BMI validation result</returns>
    public Task<BmiResultDto> CalculateBmiAsync(CalculateBmiDto dto)
    {
        // BMI calculation: weight / (height * height)
        var bmi = dto.Weight / (dto.Height * dto.Height);

        // BMI classification
        var classification = ClassifyBmi(bmi);

        return Task.FromResult(new BmiResultDto
        {
            Bmi = Math.Round(bmi, 2),
            Classification = classification.Classification,
            Description = classification.Description
        });
    }

    /// <summary>
    /// Captures a new lead with BMI calculated by frontend
    /// </summary>
    /// <param name="dto">Lead data for capture</param>
    /// <returns>Captured lead</returns>
    public async Task<CapturedLeadDto> CaptureLeadAsync(CaptureLeadDto dto)
    {
        // Validates BMI calculation from frontend
        var expectedBmi = dto.Weight / (dto.Height * dto.Height);
        var expectedClassification = ClassifyBmi(expectedBmi);

        // Validates if frontend calculation matches expected
        if (Math.Abs(dto.Bmi - expectedBmi) > 0.01m)
        {
            throw new ArgumentException("BMI calculation mismatch. Please recalculate on frontend.");
        }

        if (dto.BmiClassification != expectedClassification.Classification)
        {
            throw new ArgumentException("BMI classification mismatch. Please recalculate on frontend.");
        }

        // Creates the lead
        var lead = new Lead
        {
            Name = dto.Name,
            Email = dto.Email,
            WhatsApp = dto.WhatsApp,
            Weight = dto.Weight,
            Height = dto.Height,
            Bmi = dto.Bmi,
            BmiClassification = dto.BmiClassification,
            CaptureDate = DateTime.UtcNow
        };

        _context.Leads.Add(lead);
        await _context.SaveChangesAsync();

        return new CapturedLeadDto
        {
            Id = lead.Id,
            Name = lead.Name,
            Email = lead.Email,
            WhatsApp = lead.WhatsApp,
            Bmi = lead.Bmi,
            BmiClassification = lead.BmiClassification,
            CaptureDate = lead.CaptureDate
        };
    }

    /// <summary>
    /// Gets a lead by ID
    /// </summary>
    /// <param name="id">Lead ID</param>
    /// <returns>Found lead or null</returns>
    public async Task<CapturedLeadDto?> GetLeadByIdAsync(int id)
    {
        var lead = await _context.Leads.FindAsync(id);
        
        if (lead == null)
            return null;

        return new CapturedLeadDto
        {
            Id = lead.Id,
            Name = lead.Name,
            Email = lead.Email,
            WhatsApp = lead.WhatsApp,
            Bmi = lead.Bmi,
            BmiClassification = lead.BmiClassification,
            CaptureDate = lead.CaptureDate
        };
    }

    /// <summary>
    /// Gets all leads
    /// </summary>
    /// <returns>List of leads</returns>
    public async Task<IEnumerable<CapturedLeadDto>> GetAllLeadsAsync()
    {
        var leads = await _context.Leads
            .OrderByDescending(l => l.CaptureDate)
            .ToListAsync();

        return leads.Select(lead => new CapturedLeadDto
        {
            Id = lead.Id,
            Name = lead.Name,
            Email = lead.Email,
            WhatsApp = lead.WhatsApp,
            Bmi = lead.Bmi,
            BmiClassification = lead.BmiClassification,
            CaptureDate = lead.CaptureDate
        });
    }

    /// <summary>
    /// Marks a lead as converted
    /// </summary>
    /// <param name="id">Lead ID</param>
    /// <returns>True if marked successfully</returns>
    public async Task<bool> MarkAsConvertedAsync(int id)
    {
        var lead = await _context.Leads.FindAsync(id);
        
        if (lead == null)
            return false;

        lead.Converted = true;
        await _context.SaveChangesAsync();
        
        return true;
    }

    /// <summary>
    /// Classifies BMI according to WHO standards
    /// </summary>
    /// <param name="bmi">BMI value</param>
    /// <returns>BMI classification and description</returns>
    private static (string Classification, string Description) ClassifyBmi(decimal bmi)
    {
        return bmi switch
        {
            < 18.5m => ("Underweight", "You are underweight. Consult a nutritionist for guidance on healthy weight gain."),
            >= 18.5m and < 25m => ("Normal weight", "Congratulations! Your weight is within the healthy range."),
            >= 25m and < 30m => ("Overweight", "You are overweight. A nutritional consultation can help you reach your ideal weight."),
            >= 30m and < 35m => ("Obesity Grade I", "You have grade I obesity. It's important to seek nutritional guidance for your health."),
            >= 35m and < 40m => ("Obesity Grade II", "You have grade II obesity. We strongly recommend a nutritional consultation."),
            >= 40m => ("Obesity Grade III", "You have grade III obesity. It's essential to seek specialized nutritional care.")
        };
    }
}

