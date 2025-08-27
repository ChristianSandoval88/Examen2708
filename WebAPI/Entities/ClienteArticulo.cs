namespace API.Entities
{
    public class ClienteArticulo
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public Cliente Clientes { get; set; } = null!;
        public int ArticuloId { get; set; }
        public Articulo Articulos { get; set; } = null!;
    }
}
