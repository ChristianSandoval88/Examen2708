using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiendasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TiendasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tienda>>> GetTiendas()
        {
            return await _context.Tiendas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tienda>> GetTienda(int id)
        {
            var tienda = await _context.Tiendas.FindAsync(id);

            if (tienda == null)
            {
                return NotFound();
            }

            return tienda;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTienda(int id, Tienda tienda)
        {
            if (id != tienda.Id)
            {
                return BadRequest();
            }

            _context.Entry(tienda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiendaExists(id))
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
        public async Task<ActionResult<Tienda>> PostTienda(Tienda tienda)
        {
            _context.Tiendas.Add(tienda);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTienda", new { id = tienda.Id }, tienda);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTienda(int id)
        {
            var tienda = await _context.Tiendas.FindAsync(id);
            if (tienda == null)
            {
                return NotFound();
            }

            _context.Tiendas.Remove(tienda);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TiendaExists(int id)
        {
            return _context.Tiendas.Any(e => e.Id == id);
        }
    }
}
