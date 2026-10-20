using Micrositio.Api.Models;

namespace Micrositio.Api.Services;

public interface ICampusService
{
    // Consultar y buscar recursos
    List<Recurso> ObtenerRecursos(string? busqueda = null);
    Recurso? ObtenerRecursoPorId(int id);

    // Operaciones CRUD
    Recurso CrearRecurso(Recurso recurso);
    bool ActualizarRecurso(int id, Recurso recurso);
    bool EliminarRecurso(int id);

    // Consultar y buscar actividades
    List<Actividad> ObtenerActividades(string? busqueda = null);
}