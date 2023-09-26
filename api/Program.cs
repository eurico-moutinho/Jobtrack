global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Mvc;
global using api.Models.Dto;
global using Microsoft.AspNetCore.JsonPatch;
global using api.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Add services to the container.

builder.Services.AddAuthentication().AddJwtBearer(x =>
{

    var Key = Encoding.UTF8.GetBytes(config["AppSettings:Token"]!);
	x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        
    };

});

builder.Services.AddAuthorization();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<ApplicationDbContext>(options => 
                    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
