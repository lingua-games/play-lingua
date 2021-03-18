using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace PlayLingua.Unit.Test.Controllers
{
    public class SelectedLanguagesControllerTest
    {
        private readonly Mock<ISelectedLanguagesRepository> _mockRepo;
        private readonly SelectedLanguagesController _mockController;

        public SelectedLanguagesControllerTest()
        {
            _mockRepo = new Mock<ISelectedLanguagesRepository>();
            _mockController = new SelectedLanguagesController(_mockRepo.Object);
        }

        [Fact]
        public void Add_Language_For_User_If_Has_Not_Added_Yet()
        {
            // Arrange
            var fakeSelectedLanguages = new SelectedLanguages
            {
                Id = 1
            };
            var expectedResponse = new SelectedLanguages { Id = 100 };
            _mockRepo.Setup(repo => repo.GetByUserId(fakeSelectedLanguages.Id)).Returns(null as SelectedLanguages);
            _mockRepo.Setup(repo => repo.Add(fakeSelectedLanguages)).Returns(expectedResponse);

            // Act
            var methodResult = _mockController.Add(fakeSelectedLanguages);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(expectedResponse, testResult.Value);
        }

        [Fact]
        public void Update_Language_For_User_If_Is_Already_Added()
        {
            // Arrange
            var fakeSelectedLanguages = new SelectedLanguages
            {
                Id = 1
            };
            _mockRepo.Setup(repo => repo.GetByUserId(fakeSelectedLanguages.Id)).Returns(new SelectedLanguages());
            _mockRepo.Setup(repo => repo.Update(fakeSelectedLanguages));

            // Act
            var methodResult = _mockController.Add(fakeSelectedLanguages);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(200, testResult.StatusCode);
        }

        [Fact]
        public void SetDefaultSelection_Should_Set_Default_Language()
        {
            // Arrange
            var fakeSelectDefaultLanguageModel = new SelectDefaultLanguageModel
            {
                DefaultBaseLanguage = 1
            };
            _mockRepo.Setup(repo => repo.SetDefaultLanguages(fakeSelectDefaultLanguageModel, 1));

            // Act
            var methodResult = _mockController.SetDefaultSelection(fakeSelectDefaultLanguageModel);

            // Assert
            var testResult = methodResult as OkResult;
            Assert.Equal(200, testResult.StatusCode);
        }
    }
}
