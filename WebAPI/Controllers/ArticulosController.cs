using API.Data;
using API.Entities;
using API.Entities.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper mapper;

        public ArticulosController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticuloDTO>>> GetArticulos()
        {
            var articulos = await _context.Articulos.ToListAsync();
            var list = mapper.Map<List<ArticuloDTO>>(articulos);
            return list;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticuloDTO>> GetArticulo(int id)
        {
            var articulo = await _context.Articulos.FindAsync(id);
            if (articulo == null)
            {
                return NotFound();
            }
            var art = mapper.Map<ArticuloDTO>(articulo);

            return art;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticulo(int id, ArticuloDTO articulo)
        {
            if (id != articulo.Id)
            {
                return BadRequest();
            }
            var art = mapper.Map<Articulo>(articulo);
            _context.Entry(art).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticuloExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<ArticuloDTO>> PostArticulo(ArticuloDTO articulo)
        {
            
            _context.Articulos.Add(mapper.Map<Articulo>(articulo));
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticulo", new { id = articulo.Id }, articulo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticulo(int id)
        {
            var articulo = await _context.Articulos.FindAsync(id);
            if (articulo == null)
            {
                return NotFound();
            }

            _context.Articulos.Remove(articulo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticuloExists(int id)
        {
            return _context.Articulos.Any(e => e.Id == id);
        }
    }
}
