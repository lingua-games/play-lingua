using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using PlayLingua.WebApi.Controllers;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace PlayLingua.Unit.Test.Controllers
{
    public class ScoreStoreControllerTest
    {
        private readonly List<RankResultModel> _fakeRankList = new List<RankResultModel>();
        private readonly Mock<IScoreRepository> _mockRepo;
        private readonly Mock<IUserRepository> _mockUserRepo;
        private readonly ScoreStoreController _mockController;

        public ScoreStoreControllerTest()
        {
            _fakeRankList.Add(new RankResultModel { Email = "Fake Email 1"});
            _fakeRankList.Add(new RankResultModel { Email = "Fake Email 2" });
            _mockRepo = new Mock<IScoreRepository>();
            _mockUserRepo = new Mock<IUserRepository>();
            _mockController = new ScoreStoreController(_mockRepo.Object, _mockUserRepo.Object);
        }

        [Fact]
        public void Add_Should_Add_The_Score_And_Return_Top_5_Of_The_Scores()
        {
            // Arrange
            var fakeScore = new UserScore
            {
                Id = 1,
                UserId = 1,
                Score = 100
            };
            var fakeScoreViewModel = new UserScoreViewModel
            {
                Id = 1,
                UserId = 0,
                Score = 100
            };
            _mockRepo.Setup(repo => repo.Add(fakeScore, 1));
            _mockRepo.Setup(repo => repo.IncreaseScore(fakeScore.Score, fakeScore.UserId));
            _mockRepo.Setup(repo => repo.GetTopRanks(It.IsAny<UserScore>())).Returns(_fakeRankList.Where(x => x.Email != "You").ToList());


            // Act
            var methodResult = _mockController.Add(fakeScoreViewModel);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(JsonConvert.SerializeObject(_fakeRankList),JsonConvert.SerializeObject(testResult.Value));
        }


    }
}
