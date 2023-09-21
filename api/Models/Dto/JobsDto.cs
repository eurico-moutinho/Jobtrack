namespace api.Models.Dto;

public class JobsDto
{
    public int Id { get; set; }

    public int UserID { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Company { get; set; } = string.Empty;

    public string Description { get; set; }  = string.Empty;
}