using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Models;
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
        public void SetDefaultSelection_Should_Set_Default_Language()
        {
            // Arrange
            var fakeSelectDefaultLanguageModel = new SelectDefaultLanguageModel
            {
                DefaultBaseLanguage = 1
            };
            var fakeSelectDefaultLanguageViewModel = new SelectDefaultLanguageViewModel
            {
                BaseLanguage = 1
            };
            _mockRepo.Setup(repo => repo.SetDefaultLanguages(fakeSelectDefaultLanguageModel, 1));

            // Act
            var methodResult = _mockController.SetDefaultSelection(fakeSelectDefaultLanguageViewModel);

            // Assert
            var testResult = methodResult as OkResult;
            Assert.Equal(200, testResult.StatusCode);
        }
    }
}
