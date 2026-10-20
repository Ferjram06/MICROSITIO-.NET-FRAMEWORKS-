
using Micrositio.Api.Models;

namespace Micrositio.Api.Services;

public class CampusService : ICampusService
{
    private readonly List<Recurso> _recursos =
    [
        new Recurso
        {
            Id = 1,
            Titulo = "Programación web",
            Categoria = "Tecnología",
            Descripcion = "Documentación y herramientas para desarrollar aplicaciones web.",
            Url = "https://developer.mozilla.org/es/"
        },
        new Recurso
        {
            Id = 2,
            Titulo = "Matemáticas",
            Categoria = "Ciencias exactas",
            Descripcion = "Materiales para estudiar matemáticas y resolver problemas.",
            Url = "https://es.khanacademy.org/"
        },
        new Recurso
        {
            Id = 3,
            Titulo = "Organización académica",
            Categoria = "Vida universitaria",
            Descripcion = "Ideas y herramientas para organizar tareas y sesiones de estudio.",
            Url = "https://support.microsoft.com/es-es"
        }
    ];

    private readonly List<Actividad> _actividades =
    [
        new Actividad
        {
            Id = 1,
            Titulo = "Talleres tecnológicos",
            Categoria = "Académica",
            Descripcion = "Actividades prácticas para desarrollar habilidades tecnológicas."
        },
        new Actividad
        {
            Id = 2,
            Titulo = "Proyectos colaborativos",
            Categoria = "Comunidad",
            Descripcion = "Oportunidades para aprender trabajando en equipo."
        },
        new Actividad
        {
            Id = 3,
            Titulo = "Actividades deportivas y culturales",
            Categoria = "Desarrollo personal",
            Descripcion = "Alternativas para complementar la formación universitaria."
        }
    ];

    private int _siguienteId = 4;

    public List<Recurso> ObtenerRecursos(string? busqueda = null)
    {
        return _recursos
            .Where(r => Coincide(
                busqueda, r.Titulo, r.Categoria, r.Descripcion))
            .ToList();
    }

    public Recurso? ObtenerRecursoPorId(int id)
    {
        return _recursos.FirstOrDefault(r => r.Id == id);
    }

    public Recurso CrearRecurso(Recurso recurso)
    {
        var nuevo = new Recurso
        {
            Id = _siguienteId++,
            Titulo = recurso.Titulo.Trim(),
            Categoria = recurso.Categoria.Trim(),
            Descripcion = recurso.Descripcion.Trim(),
            Url = recurso.Url.Trim()
        };

        _recursos.Add(nuevo);
        return nuevo;
    }

    public bool ActualizarRecurso(int id, Recurso recurso)
    {
        var existente = ObtenerRecursoPorId(id);

        if (existente is null)
            return false;

        existente.Titulo = recurso.Titulo.Trim();
        existente.Categoria = recurso.Categoria.Trim();
        existente.Descripcion = recurso.Descripcion.Trim();
        existente.Url = recurso.Url.Trim();

        return true;
    }

    public bool EliminarRecurso(int id)
    {
        var recurso = ObtenerRecursoPorId(id);

        if (recurso is null)
            return false;

        return _recursos.Remove(recurso);
    }

    public List<Actividad> ObtenerActividades(string? busqueda = null)
    {
        return _actividades
            .Where(a => Coincide(
                busqueda, a.Titulo, a.Categoria, a.Descripcion))
            .ToList();
    }

    private static bool Coincide(
        string? busqueda,
        string titulo,
        string categoria,
        string descripcion)
    {
        if (string.IsNullOrWhiteSpace(busqueda))
            return true;

        return titulo.Contains(busqueda.Trim(),
                   StringComparison.OrdinalIgnoreCase)
            || categoria.Contains(busqueda.Trim(),
                   StringComparison.OrdinalIgnoreCase)
            || descripcion.Contains(busqueda.Trim(),
                   StringComparison.OrdinalIgnoreCase);
    }
}
