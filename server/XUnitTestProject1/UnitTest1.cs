using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using Xunit;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        private LoginResult _fakeLoginResult;

        [Fact]
        public void Login_Return_User_With_Token()
        {
            // Arrange
            _fakeLoginResult = new LoginResult
            {
                Token = "Fake token",
                User = new User
                {
                    Email = "Fake email"
                }
            };
            var mockRepo = new Mock<IAuthRepository>();
            var fakeRequest = new User();
            mockRepo.Setup(repo => repo.Login(fakeRequest)).Returns(_fakeLoginResult);
            var controller = new AuthController(mockRepo.Object);

            // Act
            var methodResult = controller.Login(fakeRequest);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeLoginResult, testResult.Value);

        }
    }
}
