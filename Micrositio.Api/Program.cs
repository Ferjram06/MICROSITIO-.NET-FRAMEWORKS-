var builder = WebApplication.CreateBuilder(args);

// Configuración de OpenAPI
builder.Services.AddOpenApi();

// Permitir que Angular consulte la API desde localhost:4200
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

// Documentación de la API
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Habilitar las solicitudes desde Angular
app.UseCors("AngularFrontend");

// Endpoint: recursos académicos
app.MapGet("/api/recursos", () =>
{
    var recursos = new[]
    {
        new
        {
            Id = 1,
            Titulo = "Programación web",
            Categoria = "Tecnología",
            Descripcion = "Documentación y herramientas para desarrollar aplicaciones web.",
            Url = "https://developer.mozilla.org/es/"
        },
        new
        {
            Id = 2,
            Titulo = "Matemáticas",
            Categoria = "Ciencias exactas",
            Descripcion = "Materiales para estudiar matemáticas y resolver problemas.",
            Url = "https://es.khanacademy.org/"
        },
        new
        {
            Id = 3,
            Titulo = "Organización académica",
            Categoria = "Vida universitaria",
            Descripcion = "Ideas y herramientas para organizar tareas y sesiones de estudio.",
            Url = "https://support.microsoft.com/es-es"
        }
    };

    return Results.Ok(recursos);
})
.WithName("GetRecursos");

// Endpoint: actividades universitarias
app.MapGet("/api/actividades", () =>
{
    var actividades = new[]
    {
        new
        {
            Id = 1,
            Titulo = "Talleres tecnológicos",
            Categoria = "Académica",
            Descripcion = "Actividades prácticas para desarrollar habilidades tecnológicas."
        },
        new
        {
            Id = 2,
            Titulo = "Proyectos colaborativos",
            Categoria = "Comunidad",
            Descripcion = "Oportunidades para aprender trabajando en equipo."
        },
        new
        {
            Id = 3,
            Titulo = "Actividades deportivas y culturales",
            Categoria = "Desarrollo personal",
            Descripcion = "Alternativas para complementar la formación universitaria."
        }
    };

    return Results.Ok(actividades);
})
.WithName("GetActividades");

app.Run();