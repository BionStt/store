﻿using IdentityMicroservice.Model;
using IdentityMicroservice.Repository;
using Microsoft.AspNetCore.Mvc;
using Middleware;
using MongoDB.Driver;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IdentityMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtBuilder _jwtBuilder;
        private readonly IEncryptor _encryptor;

        public IdentityController(IMongoDatabase db, IJwtBuilder jwtBuilder, IEncryptor encryptor)
        {
            _userRepository = new UserRepository(db);
            _jwtBuilder = jwtBuilder;
            _encryptor = encryptor;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user, [FromQuery(Name = "d")] string destination = "frontend")
        {
            var u = _userRepository.GetUser(user.Email);

            if (u == null)
            {
                return NotFound("User not found.");
            }

            if (destination == "backend" && !u.IsAdmin)
            {
                return BadRequest("Could not authenticate user.");
            }

            var isValid = u.ValidatePassword(user.Password, _encryptor);

            if (!isValid)
            {
                return BadRequest("Could not authenticate user.");
            }

            var token = _jwtBuilder.GetToken(u.Id);

            return new OkObjectResult(token);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            var u = _userRepository.GetUser(user.Email);

            if (u != null)
            {
                return BadRequest("User already exists.");
            }

            user.SetPassword(user.Password, _encryptor);
            _userRepository.InsertUser(user);

            return Ok();
        }

        [HttpGet("validate")]
        public IActionResult Validate([FromQuery(Name = "email")] string email, [FromQuery(Name = "token")] string token)
        {
            var u = _userRepository.GetUser(email);

            if (u == null)
            {
                return NotFound("User not found.");
            }

            var userId = _jwtBuilder.ValidateToken(token);

            if (userId != u.Id)
            {
                return BadRequest("Invalid token.");
            }

            return new OkObjectResult(userId);
        }
    }
}
