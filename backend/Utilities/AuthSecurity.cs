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
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials:credentials);

            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }

        public ClaimsPrincipal VerifyToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new ArgumentException("Token is null or empty");
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]); 

                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false, // Assuming you do not validate the issuer here, you can change this if necessary
                    ValidateAudience = false, // Same for audience validation
                    ValidateLifetime = true, // Check if the token is expired
                    IssuerSigningKey = new SymmetricSecurityKey(key) // Secret key to validate the token
                };

                // Validate the token and get the claims principal
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);

                // If the token is valid, return the claims principal
                return principal;
            }
            catch (SecurityTokenExpiredException)
            {
                // Handle expired token
                throw new UnauthorizedAccessException("Token is expired.");
            }
            catch (SecurityTokenException)
            {
                // Handle invalid token
                throw new UnauthorizedAccessException("Token is invalid.");
            }
            catch (Exception)
            {
                // Handle any other exceptions
                throw new UnauthorizedAccessException("Token verification failed.");
            }
        }

    }
}
