using API.Entities;
using API.Entities.Dtos;
using AutoMapper;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Articulo, ArticuloDTO>().ReverseMap();
        CreateMap<ClienteArticulo, ClienteArticuloDTO>().ReverseMap();
    }
}