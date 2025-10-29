namespace LeticiaConde.Application.Exceptions;

/// <summary>
/// Exception thrown when there's a conflict (e.g., duplicate, unavailable resource)
/// </summary>
public class ConflictException : Exception
{
    public ConflictException(string message) : base(message)
    {
    }
}

