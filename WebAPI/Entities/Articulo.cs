namespace API.Entities
{
    public class Articulo
    {
        public int Id { get; set; }
        public required string Descripcion { get; set; }
        public required decimal Precio { get; set; }
        public required string Imagen { get; set; }
        public required int Stock { get; set; }
        public int TiendaId { get; set; }
        public Tienda Tienda { get; set; } = null!;

    }
}
