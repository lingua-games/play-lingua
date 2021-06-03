using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using Xunit;

namespace PlayLingua.Unit.Test.Controllers
{
    public class AuthControllerTest
    {
        [Fact]
        public void Login_Return_User_With_Token()
        {
            // Arrange
            var _fakeLoginResult = new LoginResult
            {
                Token = "Fake token",
                IsLogin = true,
                User = new UserModel
                {
                    Email = "Fake email"
                }
            };
            var fakeUser = new User { Email = "Fake Email", Password = "Fake Password" };
            var fakeUserViewModel = new UserViewModel { Email = "Fake Email", Password = "Fake Password" };
            
            var mockRepo = new Mock<IAuthRepository>();
            var controller = new AuthController(mockRepo.Object);
            mockRepo.Setup(repo => repo.Login(It.IsAny<User>())).Returns(_fakeLoginResult);
            mockRepo.Setup(repo => repo.GenerateToken(It.IsAny<UserModel>())).Returns(_fakeLoginResult.Token);


            // Act
            var methodResult = controller.Login(fakeUserViewModel);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeLoginResult.Token, (testResult.Value as LoginResultViewModel).Token);
        }
    }
}
