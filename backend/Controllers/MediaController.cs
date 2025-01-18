using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/media")]
    [AllowAnonymous]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly ContentService _service;
        public MediaController(ContentService service)
        {
            this._service = service;
        }

        [HttpGet]
        [Route("{filename}")]

        public dynamic GetFile(string filename)
        { 
            var file = this._service.GetFile(filename);
            if(file != null)
            {
                return File(file.bytes,file.mimeType);
            }
            return NotFound();
        }       
    }
}
