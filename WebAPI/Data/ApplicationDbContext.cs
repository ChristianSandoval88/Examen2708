using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API.Entities;
namespace API.Data;
public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
    { }
    public DbSet<Articulo> Articulos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Tienda> Tiendas { get; set; }
    public DbSet<ClienteArticulo> ClientesArticulos { get; set; }
}