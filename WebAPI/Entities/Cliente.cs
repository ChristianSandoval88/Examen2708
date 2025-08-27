using Azure;
using Microsoft.Extensions.Hosting;

namespace API.Entities
{
    public class Cliente
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Apellido { get; set; }
        public required string Direccion { get; set; }
    }
}
