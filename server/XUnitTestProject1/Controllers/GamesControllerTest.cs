using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using PlayLingua.WebApi.Controllers;
using System.Collections.Generic;
using Xunit;

namespace PlayLingua.Unit.Test.Controllers
{
    public class GamesControllerTest
    {
        private readonly List<GetWordsForGameResponseModel> _fakeGetWordsForGameResponse = new List<GetWordsForGameResponseModel>();
        private readonly Mock<IGameRepository> _mockRepo;
        private readonly GamesController _mockController;

        public GamesControllerTest()
        {
            _fakeGetWordsForGameResponse.Add(new GetWordsForGameResponseModel { Key = "1"});
            _fakeGetWordsForGameResponse.Add(new GetWordsForGameResponseModel { Key = "1"});
            _mockRepo = new Mock<IGameRepository>();
            _mockController = new GamesController(_mockRepo.Object);
        }

        [Fact]
        public void GetWordsForGame_Should_Provide_Words_For_Specific_Game()
        {
            // Arrange
            var fakeGetWordsForGameInputModel = new GetWordsForGameInputModel
            {
                BookId = 1,
                ChapterId = 1
            };
            var fakeGetWordsForGameInputViewModel = new GetWordsForGameInputViewModel
            {
                BookId = 1,
                ChapterId = 1
            };
            _mockRepo.Setup(repo => repo.GetWordsForGame(It.IsAny<GetWordsForGameInputModel>())).Returns(_fakeGetWordsForGameResponse);

            // Act
            var methodResult = _mockController.GetWordsForGame(fakeGetWordsForGameInputViewModel);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeGetWordsForGameResponse, testResult.Value);
        }
    }
}
