namespace LeticiaConde.Application.DTOs;

/// <summary>
/// Generic paged result wrapper
/// </summary>
public class PagedResult<T>
{
    /// <summary>
    /// Current page number (1-based)
    /// </summary>
    public int Page { get; set; }

    /// <summary>
    /// Items per page
    /// </summary>
    public int PageSize { get; set; }

    /// <summary>
    /// Total items across all pages
    /// </summary>
    public int TotalItems { get; set; }

    /// <summary>
    /// Total pages
    /// </summary>
    public int TotalPages { get; set; }

    /// <summary>
    /// Items for the current page
    /// </summary>
    public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();
}


