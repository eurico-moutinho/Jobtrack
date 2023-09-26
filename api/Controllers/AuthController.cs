using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    public static Auth user = new Auth();
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration){

        this._configuration = configuration;

    }

    [HttpPost("register")]
    public ActionResult<Auth> Register(AuthDto request)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        user.Username = request.Username;
        user.PasswordHash = passwordHash;

        return Ok(user);
    }

    [HttpPost("login")]
    public ActionResult<Auth> Login(AuthDto request)
    {
        if(user.Username != request.Username)
        {
            return BadRequest("User not found");
        }

        if(!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return BadRequest("Wrong password");
        }

        string token = CreateToken(user);

        return Ok(user);
    }

    private string CreateToken(Auth user)
    {
        List<Claim> claims = new List<Claim> {

            new Claim(ClaimTypes.Name, user.Username)

        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(

            _configuration.GetSection("AppSettings:Token").Value!

        ));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(

            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: cred
            
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}