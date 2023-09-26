namespace api.Models;

public class Auth
{
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set;} = string.Empty;
}