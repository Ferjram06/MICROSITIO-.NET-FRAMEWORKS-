using Microsoft.EntityFrameworkCore;
using Micrositio.Api.Data;
using Micrositio.Api.Models;
using Micrositio.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<CampusDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("CampusGuia")));

builder.Services.AddScoped<ICampusService, CampusService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AngularFrontend");

// Consultar y buscar recursos
app.MapGet("/api/recursos",
    (string? busqueda, ICampusService service) =>
        Results.Ok(service.ObtenerRecursos(busqueda)))
    .WithName("GetRecursos");

// Consultar un recurso por ID
app.MapGet("/api/recursos/{id:int}",
    (int id, ICampusService service) =>
    {
        var recurso = service.ObtenerRecursoPorId(id);

        return recurso is null
            ? Results.NotFound()
            : Results.Ok(recurso);
    });

// Crear un recurso
app.MapPost("/api/recursos",
    (Recurso recurso, ICampusService service) =>
    {
        if (!DatosValidos(recurso))
            return Results.BadRequest(
                new { mensaje = "Completa todos los campos y proporciona una URL válida." });

        var creado = service.CrearRecurso(recurso);

        return Results.Created($"/api/recursos/{creado.Id}", creado);
    });

// Actualizar un recurso
app.MapPut("/api/recursos/{id:int}",
    (int id, Recurso recurso, ICampusService service) =>
    {
        if (!DatosValidos(recurso))
            return Results.BadRequest(
                new { mensaje = "Los datos del recurso no son válidos." });

        return service.ActualizarRecurso(id, recurso)
            ? Results.NoContent()
            : Results.NotFound();
    });

// Eliminar un recurso
app.MapDelete("/api/recursos/{id:int}",
    (int id, ICampusService service) =>
        service.EliminarRecurso(id)
            ? Results.NoContent()
            : Results.NotFound());

// Consultar y buscar actividades
app.MapGet("/api/actividades",
    (string? busqueda, ICampusService service) =>
        Results.Ok(service.ObtenerActividades(busqueda)))
    .WithName("GetActividades");

app.Run();

static bool DatosValidos(Recurso recurso)
{
    return !string.IsNullOrWhiteSpace(recurso.Titulo)
        && !string.IsNullOrWhiteSpace(recurso.Categoria)
        && !string.IsNullOrWhiteSpace(recurso.Descripcion)
        && Uri.TryCreate(recurso.Url, UriKind.Absolute, out var uri)
        && (uri.Scheme == Uri.UriSchemeHttp
            || uri.Scheme == Uri.UriSchemeHttps);
}