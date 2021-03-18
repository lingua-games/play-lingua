using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
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
        private readonly ScoreStoreController _mockController;

        public ScoreStoreControllerTest()
        {
            _fakeRankList.Add(new RankResultModel
            {
                Email = "You",
                DisplayName = "You",
                Score = 100
            });
            _fakeRankList.Add(new RankResultModel { Email = "Fake Email 1"});
            _fakeRankList.Add(new RankResultModel { Email = "Fake Email 2" });
            _mockRepo = new Mock<IScoreRepository>();
            _mockController = new ScoreStoreController(_mockRepo.Object);
        }

        [Fact]
        public void Add_Should_Add_The_Score_And_Return_Top_5_Of_The_Scores()
        {
            // Arrange
            var fakeScore = new Score
            {
                Id = 1,
                UserId = 1,
                score = 100
            };
            _mockRepo.Setup(repo => repo.Add(fakeScore, 1));
            _mockRepo.Setup(repo => repo.IncreaseScore(fakeScore.score, fakeScore.UserId));
            _mockRepo.Setup(repo => repo.GetTopRanks(fakeScore)).Returns(_fakeRankList.Where(x => x.Email != "You").ToList());


            // Act
            var methodResult = _mockController.Add(fakeScore);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(JsonConvert.SerializeObject(_fakeRankList),JsonConvert.SerializeObject(testResult.Value));
        }


    }
}
