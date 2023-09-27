namespace api.Data;

public class ApplicationDbContext : DbContext
{

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
    public DbSet<UserDto> Users { get; set;}
    
    public DbSet<JobsDto> Jobs { get; set;}

    public DbSet<JoblistDto> Joblist { get; set;}

    public DbSet<AuthDto> Auth { get; set;}
}