namespace LeticiaConde.Application.Exceptions;

/// <summary>
/// Exception thrown when a resource is not found
/// </summary>
public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message)
    {
    }

    public NotFoundException(string resourceName, object id) 
        : base($"{resourceName} with ID {id} was not found.")
    {
    }
}

