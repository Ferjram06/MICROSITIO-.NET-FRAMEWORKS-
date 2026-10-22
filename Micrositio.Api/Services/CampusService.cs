
using Microsoft.EntityFrameworkCore;
using Micrositio.Api.Data;
using Micrositio.Api.Models;

namespace Micrositio.Api.Services;

public class CampusService : ICampusService
{
    private readonly CampusDbContext _db;

    public CampusService(CampusDbContext db)
    {
        _db = db;
    }

    public List<Recurso> ObtenerRecursos(string? busqueda = null)
    {
        var consulta = _db.Recursos.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(busqueda))
        {
            var termino = busqueda.Trim();

            consulta = consulta.Where(r =>
                r.Titulo.Contains(termino) ||
                r.Categoria.Contains(termino) ||
                r.Descripcion.Contains(termino));
        }

        return consulta.OrderBy(r => r.Id).ToList();
    }

    public Recurso? ObtenerRecursoPorId(int id)
    {
        return _db.Recursos
            .AsNoTracking()
            .FirstOrDefault(r => r.Id == id);
    }

    public Recurso CrearRecurso(Recurso recurso)
    {
        var nuevo = new Recurso
        {
            Titulo = recurso.Titulo.Trim(),
            Categoria = recurso.Categoria.Trim(),
            Descripcion = recurso.Descripcion.Trim(),
            Url = recurso.Url.Trim()
        };

        _db.Recursos.Add(nuevo);
        _db.SaveChanges();

        return nuevo;
    }

    public bool ActualizarRecurso(int id, Recurso recurso)
    {
        var existente = _db.Recursos.Find(id);

        if (existente is null)
            return false;

        existente.Titulo = recurso.Titulo.Trim();
        existente.Categoria = recurso.Categoria.Trim();
        existente.Descripcion = recurso.Descripcion.Trim();
        existente.Url = recurso.Url.Trim();

        _db.SaveChanges();

        return true;
    }

    public bool EliminarRecurso(int id)
    {
        var recurso = _db.Recursos.Find(id);

        if (recurso is null)
            return false;

        _db.Recursos.Remove(recurso);
        _db.SaveChanges();

        return true;
    }

    public List<Actividad> ObtenerActividades(string? busqueda = null)
    {
        var consulta = _db.Actividades.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(busqueda))
        {
            var termino = busqueda.Trim();

            consulta = consulta.Where(a =>
                a.Titulo.Contains(termino) ||
                a.Categoria.Contains(termino) ||
                a.Descripcion.Contains(termino));
        }

        return consulta.OrderBy(a => a.Id).ToList();
    }
}
