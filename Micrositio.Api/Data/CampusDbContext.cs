
using Microsoft.EntityFrameworkCore;
using Micrositio.Api.Models;

namespace Micrositio.Api.Data;

public class CampusDbContext : DbContext
{
    public CampusDbContext(DbContextOptions<CampusDbContext> options)
        : base(options)
    {
    }

    public DbSet<Recurso> Recursos => Set<Recurso>();

    public DbSet<Actividad> Actividades => Set<Actividad>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Recurso>(entity =>
        {
            entity.ToTable("Recursos");

            entity.HasKey(r => r.Id);

            entity.Property(r => r.Titulo)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(r => r.Categoria)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(r => r.Descripcion)
                .HasMaxLength(1000)
                .IsRequired();

            entity.Property(r => r.Url)
                .HasMaxLength(2048)
                .IsRequired();
        });

        modelBuilder.Entity<Actividad>(entity =>
        {
            entity.ToTable("Actividades");

            entity.HasKey(a => a.Id);

            entity.Property(a => a.Titulo)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(a => a.Categoria)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(a => a.Descripcion)
                .HasMaxLength(1000)
                .IsRequired();
        });
    }
}
