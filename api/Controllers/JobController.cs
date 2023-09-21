using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

[Route("api/Jobs")]
[ApiController]
[Authorize]
public class JobController : ControllerBase
{
    

    private readonly ApplicationDbContext _db;

    public JobController(ApplicationDbContext db)
    {

        _db = db;

    }

    [HttpGet]
    public ActionResult<IEnumerable<JobsDto>> GetJobs()
    {

        return Ok(_db.Jobs.ToList());

    }

    [HttpGet("{id:int}", Name="GetJobs")]
    public ActionResult<JobsDto> GetJobs(int id)
    {
        var job = _db.Jobs.FirstOrDefault( u => u.Id == id);

        if(job == null)
        {

            return NotFound();

        }

        return Ok(job);
    }

    [HttpPost]
    public ActionResult<JobsDto> CreateJob([FromBody] JobsDto jobsDto)
    {

        if(jobsDto == null)
        {

            return BadRequest(jobsDto);

        }

        _db.Jobs.Add(jobsDto);
        _db.SaveChanges();

        return CreatedAtRoute("GetUser", new { id = jobsDto.Id }, jobsDto);

    }

    [HttpDelete]
    public ActionResult<JobsDto> DeleteJob(int id)
    {

        if(id == 0){

            return BadRequest();

        }

        var job = _db.Jobs.FirstOrDefault( u => u.Id == id);

        if(job == null)
        {

            return NotFound();

        }

        _db.Jobs.Remove(job);
        _db.SaveChanges();

        return NoContent();

    }

    [HttpPut("{id:int}", Name = "UpdateJob")]
    public IActionResult UpdateJob(int id, [FromBody]JobsDto jobsDto)
    {

        var job = _db.Jobs.FirstOrDefault(u => u.Id == id);

        if (job == null)
        {

            return NotFound();

        }

        job.Title = jobsDto.Title;
        job.Company = jobsDto.Company;
        job.Description = jobsDto.Description;

        _db.SaveChanges();

        return NoContent();
    }

    [HttpPatch("{id:int}", Name = "PatchJob")]
    public IActionResult PatchJob(int id, JsonPatchDocument<JobsDto> patchDto)
    {

        if(patchDto == null || id == 0)
        {

            return BadRequest();

        }

        var job = _db.Jobs.FirstOrDefault( u => u.Id == id);

        if(job == null)
        {

            return BadRequest();

        }

        patchDto.ApplyTo(job, ModelState);

        _db.Jobs.Update(job);
        _db.SaveChanges();

        return NoContent();

    }
}