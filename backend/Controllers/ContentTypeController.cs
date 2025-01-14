using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [Route("api/contenttype")]
    [AllowAnonymous]
    [ApiController]
    public class ContentTypeController : ControllerBase
    {
        private readonly ContentTypeService _service;

        public ContentTypeController(ContentTypeService service)
        {
            this._service = service;
        }

        [HttpGet]
        public dynamic GetAll()
        {
            return this._service.GetAll();
        }
    }
}
