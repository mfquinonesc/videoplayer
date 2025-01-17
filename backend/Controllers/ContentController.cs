using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/content")]
    [Authorize]
    [ApiController]
    public class ContentController : ControllerBase
    {

        private readonly ContentService _service;
        public ContentController(ContentService service)
        {
            this._service = service;
        }


        [HttpPost]
        public dynamic Create([FromForm] ContentDto content)
        {
            return this._service.Create(content);
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
        public dynamic Update(int id, [FromForm] ContentDto content)
        {
            return this._service.UpdateById(id, content);
        }

        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete(int id)
        {
            return this._service.DeleteById(id);
        }

        [HttpGet]
        [Route("sort")]
        public dynamic SortContents([FromQuery] string arr)
        {
            return this._service.SortContents(arr);
        }
    }
}
