using backend.Data;
using backend.Dtos;
using backend.Models;
using backend.Utilities;
using Microsoft.AspNetCore.Mvc;


namespace backend.Services
{
    public class AccountService : Service
    {
        private readonly AuthSecurity _auth;

        public AccountService(DBVideoplayerContext context,AuthSecurity auth) : base(context) 
        {
            this._auth = auth;
        }

        public dynamic Create(Account account)
        {
            var faccount = this._context.Accounts.Where(a => a.Email == account.Email).FirstOrDefault();

            if(faccount == null)
            {                
                account.Password = this._auth.EncriptSHA256(account.Password);
                this._context.Accounts.Add(account);
                this._context.SaveChanges();
                account.Password = "";
                account.UserId = 0;
            }
            
            return new { status = faccount == null, account };
        }

        public dynamic Update(Account account)
        {
            var faccount = this._context.Accounts.Where(a => a.Email == account.Email).FirstOrDefault();
            if (faccount != null)
            {
                faccount.Password = account.Password;
                faccount.Name = account.Name;
                faccount.Lastname = account.Lastname;
                this._context.SaveChanges();
            }           
            return new { status = faccount != null };
        }

        public dynamic Login(LoginDto dto)
        {
            var account = this._context.Accounts.Where(a => a.Email == dto.Email && a.Password == this._auth.EncriptSHA256(dto.Password)).FirstOrDefault();
            var res = new {
                status = account != null,
                token = account != null ? this._auth.GenerateJwt(account) : "", 
                name = account != null ? account.Name : "",  
                isAdmin = account.IsAdmin                           
            };
            return res;
        }
       
        public dynamic Verify(string authorizationHeader)
        {
            if (string.IsNullOrEmpty(authorizationHeader))
            {
                return new { message = "Token nulo", status = false };
            }

            var token = authorizationHeader.Replace("Bearer ", string.Empty); 

            try
            {
                var principal = _auth.VerifyToken(token); 
                return new { message = "Token válido", status = true };
            }
            catch (UnauthorizedAccessException ex)
            {
                return new { message = "Token inválido", status = false };
            }
        }

    }
}
