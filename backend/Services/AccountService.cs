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

        public AccountService(DBVideoplayerContext context, AuthSecurity auth) : base(context)
        {
            this._auth = auth;
        }

        public dynamic Create(Account account)
        {
            var faccount = this._context.Accounts.Where(a => a.Email == account.Email).FirstOrDefault();

            if (faccount == null)
            {
                account.CreatedAt = null;
                account.Password = this._auth.EncriptSHA256(account.Password);
                this._context.Accounts.Add(account);
                this._context.SaveChanges();

                return new
                {
                    status = true,
                    message = $"Se ha creado su cuenta exitosamente. Ingrese con su correo {account.Email} y contraseña",
                    account = new 
                    { 
                        account.Email                        
                    },                    
                };
            }

            return new
            {
                status = false,                
                message = $"El correo {account.Email} ya está registrado",
                account = new
                {
                   account.Email
                },
            };
        }

        public dynamic Update(Account account)
        {
            var faccount = this._context.Accounts.Where(a => a.Email == account.Email).FirstOrDefault();
            if (faccount != null)
            {
                faccount.Password = account.Password;
                faccount.Name = account.Name;
                faccount.Lastname = account.Lastname;
                this._context.Update(faccount);
                this._context.SaveChanges();
            }
            return new { status = faccount != null };
        }

        public dynamic Login(LoginDto dto)
        {
            var account = this._context.Accounts.Where(a => a.Email == dto.Email).FirstOrDefault();

            if (account == null)
            {
                return new { status = false, message = $"El correo {dto.Email} no está registrado" };
            }
            else
            {
                if (account.Password == this._auth.EncriptSHA256(dto.Password))
                {
                    return new
                    {
                        status = true,
                        token = this._auth.GenerateJwt(account),
                        name = account.Name,
                        isAdmin = account.IsAdmin,
                        email = account.Email
                    };
                }
            }

            return new { status = false, message = $"El correo o la contraseña son incorrectos" };
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
