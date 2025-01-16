using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/schedule")]
    [Authorize]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly ScheduleService _service;

        public ScheduleController(ScheduleService service)
        {
            this._service = service;
        }
               
        [HttpPost]
        public dynamic Create(Schedule schedule)
        {
            return this._service.Create(schedule);
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
        public dynamic Update(int id, Schedule schedule)
        {
            return this._service.UpdateById(id, schedule);
        }
       
        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete(int id)
        {
            return this._service.DeleteById(id);
        }
    }

}
