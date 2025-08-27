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
    public class ClientesArticulosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper mapper;

        public ClientesArticulosController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteArticulo>>> GetClientesArticulos()
        {
            return await _context.ClientesArticulos.Include(p=>p.Articulos).Include(p=>p.Clientes).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteArticulo>> GetClienteArticulo(int id)
        {
            var listaClienteArticulo = await _context.ClientesArticulos.Include(p => p.Articulos).Include(p => p.Clientes).ToListAsync();
            var clienteArticulo = listaClienteArticulo.FirstOrDefault(x=>x.Id==id);

            if (clienteArticulo == null)
            {
                return NotFound();
            }

            return clienteArticulo;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutClienteArticulo(int id, ClienteArticuloDTO clienteArticuloDTO)
        {
            if (id != clienteArticuloDTO.Id)
            {
                return BadRequest();
            }
            var clienteArticulo = mapper.Map<ClienteArticulo>(clienteArticuloDTO);
            _context.Entry(clienteArticulo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteArticuloExists(id))
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
        public async Task<ActionResult<ClienteArticulo>> PostClienteArticulo(ClienteArticuloDTO clienteArticuloDTO)
        {
            var clienteArticulo = mapper.Map<ClienteArticulo>(clienteArticuloDTO);
            _context.ClientesArticulos.Add(clienteArticulo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClienteArticulo", new { id = clienteArticulo.Id }, clienteArticulo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClienteArticulo(int id)
        {
            var clienteArticulo = await _context.ClientesArticulos.FindAsync(id);
            if (clienteArticulo == null)
            {
                return NotFound();
            }

            _context.ClientesArticulos.Remove(clienteArticulo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClienteArticuloExists(int id)
        {
            return _context.ClientesArticulos.Any(e => e.Id == id);
        }
    }
}
