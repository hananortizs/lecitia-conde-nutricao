using LeticiaConde.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace LeticiaConde.Infrastructure.Data;

/// <summary>
/// Contexto do Entity Framework para acesso ao banco de dados PostgreSQL
/// </summary>
public class ApplicationDbContext : DbContext
{
    /// <summary>
    /// Construtor do contexto
    /// </summary>
    /// <param name="options">Opções de configuração do DbContext</param>
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    /// <summary>
    /// DbSet to access leads
    /// </summary>
    public DbSet<Lead> Leads { get; set; }

    /// <summary>
    /// DbSet to access appointments
    /// </summary>
    public DbSet<Appointment> Appointments { get; set; }

    /// <summary>
    /// DbSet to access schedule configurations
    /// </summary>
    public DbSet<ScheduleConfiguration> ScheduleConfigurations { get; set; }

    /// <summary>
    /// Configuração do modelo de dados
    /// </summary>
    /// <param name="modelBuilder">Builder do modelo</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Lead entity configuration
        modelBuilder.Entity<Lead>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.WhatsApp).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Weight).HasPrecision(5, 2);
            entity.Property(e => e.Height).HasPrecision(3, 2);
            entity.Property(e => e.Bmi).HasPrecision(5, 2);
            entity.Property(e => e.BmiClassification).HasMaxLength(50);
            entity.Property(e => e.CaptureDate)
                .HasDefaultValueSql("NOW()")
                .HasConversion(
                    v => v.ToUniversalTime(),
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });

        // Appointment entity configuration
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.DateTime)
                .IsRequired()
                .HasConversion(
                    v => v.ToUniversalTime(),
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.Status).HasConversion<int>();
            entity.Property(e => e.ReservationDate)
                .HasDefaultValueSql("NOW()")
                .HasConversion(
                    v => v.ToUniversalTime(),
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.ConfirmationDate)
                .HasConversion(
                    v => v.HasValue ? v.Value.ToUniversalTime() : (DateTime?)null,
                    v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : (DateTime?)null);
            entity.Property(e => e.VirtualRoomLink).HasMaxLength(500);
            entity.Property(e => e.Observations).HasMaxLength(1000);
            entity.Property(e => e.TransactionId).HasMaxLength(100);

            // Relationship with Lead
            entity.HasOne(e => e.Lead)
                  .WithMany()
                  .HasForeignKey(e => e.LeadId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ScheduleConfiguration entity configuration
        modelBuilder.Entity<ScheduleConfiguration>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.DayName).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Observations).HasMaxLength(200);
        });

        // Seed data for schedule configurations
        SeedScheduleConfigurations(modelBuilder);
    }

    /// <summary>
    /// Populates default schedule configurations
    /// </summary>
    /// <param name="modelBuilder">Model builder</param>
    private static void SeedScheduleConfigurations(ModelBuilder modelBuilder)
    {
        var configurations = new[]
        {
            new ScheduleConfiguration { Id = 1, DayOfWeek = 0, DayName = "Sunday", Active = true, StartTime = null, EndTime = null, Sabbath = false, Observations = "Open hours" },
            new ScheduleConfiguration { Id = 2, DayOfWeek = 1, DayName = "Monday", Active = true, StartTime = new TimeSpan(17, 0, 0), EndTime = new TimeSpan(22, 0, 0), Sabbath = false },
            new ScheduleConfiguration { Id = 3, DayOfWeek = 2, DayName = "Tuesday", Active = true, StartTime = new TimeSpan(17, 0, 0), EndTime = new TimeSpan(22, 0, 0), Sabbath = false },
            new ScheduleConfiguration { Id = 4, DayOfWeek = 3, DayName = "Wednesday", Active = true, StartTime = new TimeSpan(17, 0, 0), EndTime = new TimeSpan(22, 0, 0), Sabbath = false },
            new ScheduleConfiguration { Id = 5, DayOfWeek = 4, DayName = "Thursday", Active = true, StartTime = new TimeSpan(17, 0, 0), EndTime = new TimeSpan(22, 0, 0), Sabbath = false },
            new ScheduleConfiguration { Id = 6, DayOfWeek = 5, DayName = "Friday", Active = false, StartTime = null, EndTime = null, Sabbath = true, Observations = "Blocked - Sabbath" },
            new ScheduleConfiguration { Id = 7, DayOfWeek = 6, DayName = "Saturday", Active = false, StartTime = null, EndTime = null, Sabbath = true, Observations = "Blocked - Sabbath" }
        };

        modelBuilder.Entity<ScheduleConfiguration>().HasData(configurations);
    }
}

