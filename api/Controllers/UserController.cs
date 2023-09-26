using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

[Route("api/User")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{

    private readonly ApplicationDbContext _db;

    public UserController(ApplicationDbContext db)
    {

        _db = db;

    }

    [HttpGet, Authorize]
    public ActionResult<IEnumerable<UserDto>> GetUser()
    {

        return Ok(_db.Users.ToList());

    }

    [HttpGet("{id:int}", Name="GetUser"), Authorize]
    public ActionResult<UserDto> GetUser(int id)
    {
        var user = _db.Users.FirstOrDefault( u => u.Id == id);

        if(user == null)
        {

            return NotFound();

        }

        return Ok(user);
    }

    [HttpPost, Authorize]
    public ActionResult<UserDto> CreateUser([FromBody] UserDto userDto)
    {

        if(_db.Users.FirstOrDefault( u => u.Email.ToLower() == userDto.Email.ToLower()) != null)
        {

            ModelState.AddModelError("EmailError","Email already exists");
            return BadRequest(ModelState);

        }

        if(userDto == null)
        {

            return BadRequest(userDto);

        }

        _db.Users.Add(userDto);
        _db.SaveChanges();

        return CreatedAtRoute("GetUser", new { id = userDto.Id }, userDto);

    }

    [HttpDelete, Authorize]
    public ActionResult<UserDto> DeleteUser(int id)
    {

        if(id == 0){

            return BadRequest();

        }

        var user = _db.Users.FirstOrDefault( u => u.Id == id);

        if(user == null)
        {

            return NotFound();

        }

        _db.Users.Remove(user);
        _db.SaveChanges();

        return NoContent();

    }

    [HttpPut("{id:int}", Name = "UpdateUser"), Authorize]
    public IActionResult UpdateUser(int id, [FromBody]UserDto userDto)
    {

        var user = _db.Users.FirstOrDefault(u => u.Id == id);

        if (user == null)
        {

            return NotFound();

        }

        user.FirstName = userDto.FirstName;
        user.LastName = userDto.LastName;
        user.Email = userDto.Email;

        _db.SaveChanges();

        return NoContent();
    }

    [HttpPatch("{id:int}", Name = "PatchUser"), Authorize]
    public IActionResult PatchUser(int id, JsonPatchDocument<UserDto> patchDto)
    {

        if(patchDto == null || id == 0)
        {

            return BadRequest();

        }

        var user = _db.Users.FirstOrDefault( u => u.Id == id);

        if(user == null)
        {

            return BadRequest();

        }

        patchDto.ApplyTo(user, ModelState);

        _db.Users.Update(user);
        _db.SaveChanges();

        return NoContent();

    }
}