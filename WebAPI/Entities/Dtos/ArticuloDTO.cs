namespace API.Entities.Dtos
{
    public class ArticuloDTO
    {
        public int Id { get; set; }
        public required string Descripcion { get; set; }
        public required decimal Precio { get; set; }
        public required string Imagen { get; set; }
        public required int Stock { get; set; }
        public int TiendaId { get; set; }
        public string Tienda { get; set; } = string.Empty;
    }
}
