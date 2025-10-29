using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace LeticiaConde.Api.Conventions;

/// <summary>
/// Convensão para converter nomes de controllers para kebab-case automaticamente
/// </summary>
public class KebabCaseControllerModelConvention : IControllerModelConvention
{
    public void Apply(ControllerModel controller)
    {
        // Converter o nome do controller para kebab-case
        // Exemplo: LeadsController -> leads, AppointmentController -> appointment
        var controllerName = controller.ControllerName;
        
        // Remover sufixo "Controller" se existir
        if (controllerName.EndsWith("Controller", StringComparison.OrdinalIgnoreCase))
        {
            controllerName = controllerName.Substring(0, controllerName.Length - "Controller".Length);
        }
        
        // Converter para kebab-case (PascalCase -> kebab-case)
        var kebabCaseName = ToKebabCase(controllerName);
        
        // Atualizar o selector do controller
        foreach (var selector in controller.Selectors)
        {
            if (selector.AttributeRouteModel?.Template != null)
            {
                // Substituir [controller] pelo nome em kebab-case
                var template = selector.AttributeRouteModel.Template;
                
                // Substituir [controller] pelo nome em kebab-case
                template = template.Replace("[controller]", kebabCaseName, StringComparison.OrdinalIgnoreCase);
                
                // Atualizar o template
                selector.AttributeRouteModel.Template = template;
            }
        }
    }

    private static string ToKebabCase(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input;

        var result = new System.Text.StringBuilder();
        
        for (int i = 0; i < input.Length; i++)
        {
            var current = input[i];
            
            if (char.IsUpper(current))
            {
                // Adicionar hífen antes de letras maiúsculas (exceto o primeiro caractere)
                if (i > 0 && result.Length > 0)
                {
                    result.Append('-');
                }
                result.Append(char.ToLowerInvariant(current));
            }
            else
            {
                result.Append(current);
            }
        }
        
        return result.ToString();
    }
}

