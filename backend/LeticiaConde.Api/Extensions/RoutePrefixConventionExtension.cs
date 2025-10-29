using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.Routing;

namespace LeticiaConde.Api.Extensions;

/// <summary>
/// Extensão para adicionar prefixo global às rotas
/// </summary>
public static class RoutePrefixConventionExtension
{
    public static void UseGeneralRoutePrefix(this MvcOptions opts, string prefix)
    {
        opts.Conventions.Add(new RoutePrefixConvention(new RouteAttribute(prefix)));
    }
}

/// <summary>
/// Convenção para aplicar prefixo global às rotas
/// </summary>
public class RoutePrefixConvention : IApplicationModelConvention
{
    private readonly AttributeRouteModel _routePrefix;

    public RoutePrefixConvention(IRouteTemplateProvider route)
    {
        _routePrefix = new AttributeRouteModel(route);
    }

    public void Apply(ApplicationModel application)
    {
        foreach (var controller in application.Controllers)
        {
            // Aplicar prefixo a todos os selectors do controller
            foreach (var selector in controller.Selectors)
            {
                if (selector.AttributeRouteModel != null)
                {
                    selector.AttributeRouteModel = AttributeRouteModel.CombineAttributeRouteModel(
                        _routePrefix,
                        selector.AttributeRouteModel);
                }
            }
        }
    }
}
