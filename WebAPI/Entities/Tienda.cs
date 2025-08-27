using Microsoft.Extensions.Hosting;

namespace API.Entities
{
    public class Tienda
    {
        public int Id { get; set; }
        public required string Sucursal { get; set; }
        public required string Direccion { get; set; }
    }
}
