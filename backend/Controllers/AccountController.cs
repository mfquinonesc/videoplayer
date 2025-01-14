using backend.Dtos;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{    
    [Route("api/account")]
    [AllowAnonymous]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly AccountService _service;

        public AccountController(AccountService service)
        {
            this._service = service;
        }


        [HttpPost]
        [Route("login")]
        public dynamic Login(LoginDto dto)
        {
            return _service.Login(dto);
        }

        [HttpPost]
        [Route("create")]
        public dynamic Create(Account account)
        {
            return _service.Create(account);
        }

        [HttpPut]
        [Route("update")]
        public dynamic Update(Account account) 
        {
            return this._service.Update(account);
        }

        [HttpGet]
        [Route("verify")]
        public dynamic Verify([FromHeader(Name = "Authorization")] string authHeader)
        {
            return this._service.Verify(authHeader);
        }
    }
}
