namespace api.Models.Dto;

public class AuthDto
{
    public required string Username { get; set; } = string.Empty;
    public required string Password { get; set;} = string.Empty;
}