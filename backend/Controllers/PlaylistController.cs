using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/playlist")] 
    [AllowAnonymous] 
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly PlaylistService _service;

        public PlaylistController(PlaylistService service)
        {
            this._service = service;
        }

       
        [HttpPost]
        public dynamic Create(Playlist playlist)
        {
            return this._service.Create(playlist);
        }

        
        [HttpGet]
        public dynamic GetAll()
        {
            return this._service.GetAll();
        }

        
        [HttpGet]
        [Route("{id}")]  
        public dynamic Get(int id)
        {
            return this._service.GetById(id);
        }

        
        [HttpPut]
        [Route("{id}")]
        public dynamic Update(int id, Playlist playlist)
        {
            return this._service.UpdateById(id, playlist);
        }

        
        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete(int id)
        {
            return this._service.DeleteById(id);
        }        
    }
}
