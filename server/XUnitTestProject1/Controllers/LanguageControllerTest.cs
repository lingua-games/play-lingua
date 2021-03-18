using Microsoft.AspNetCore.Mvc;
using Moq;
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
    public class LanguageControllerTest
    {
        private readonly List<Language> _fakeLanguageList = new List<Language>();
        private readonly Mock<ILanguageRepository> _mockRepo;
        private readonly LanguageController _mockController;

        public LanguageControllerTest()
        {
            _fakeLanguageList.Add(new Language { Id = 1});
            _fakeLanguageList.Add(new Language { Id = 2});
            _mockRepo = new Mock<ILanguageRepository>();
            _mockController = new LanguageController(_mockRepo.Object);
        }

        [Fact]
        public void List_Should_Return_List_Of_Languages()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.List()).Returns(_fakeLanguageList);

            // Act
            var methodResult = _mockController.List();

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeLanguageList, testResult.Value);
        }

        [Fact]
        public void Add_Should_Return_Added_Language()
        {
            // Arrange
            _mockRepo.SetupSequence(repo => repo.Add(_fakeLanguageList.First())).Returns(_fakeLanguageList[0]).Returns(_fakeLanguageList[1]);

            // Act
            var methodResult = _mockController.Add(_fakeLanguageList);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeLanguageList.Count(), ((IEnumerable)testResult.Value).Cast<object>().ToList().Count());
        }

        [Fact]
        public void Delete_Should_Call_Delete_Method()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.Delete("1"));

            // Act
            var methodResult = _mockController.Delete("1");

            // Assert
            var testResult = methodResult as OkResult;
            Assert.Equal(200, testResult.StatusCode);
        }

        [Fact]
        public void Update_Should_Call_Update_Method_And_Return_Updated_Language()
        {
            // Arrange
            var fakeUpdatedLanguage = new Language()
            {
                Id = 1,
                Name = "Fake Language"
            };
            _mockRepo.Setup(repo => repo.Update(fakeUpdatedLanguage));

            // Act
            var methodResult = _mockController.Update(1, fakeUpdatedLanguage);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(fakeUpdatedLanguage, testResult.Value);
        }
    }
}
