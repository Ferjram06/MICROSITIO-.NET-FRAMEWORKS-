namespace Micrositio.Api.Models;

public class Recurso
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}
