using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using backend.Models;

namespace backend.Utilities
{
    public class AuthSecurity
    {
        private readonly IConfiguration _configuration;
       

        public AuthSecurity(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string EncriptSHA256(string text)
        {
            using(SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(text));

                StringBuilder builder = new StringBuilder();
                for(int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("X2"));
                }

                return builder.ToString();
            }          
        }

        public string GenerateJwt(Account  account)
        {
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,account.UserId.ToString()),
                new Claim(ClaimTypes.Email,account.Email)
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256Signature);

            var jwtConfig = new JwtSecurityToken(
                claims: userClaims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials:credentials);

            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }
    }
}
