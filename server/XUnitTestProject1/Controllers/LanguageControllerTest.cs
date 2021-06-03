using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace PlayLingua.Unit.Test.Controllers
{
    public class LanguageControllerTest
    {
        private readonly List<Language> _fakeLanguageList = new List<Language>();
        private readonly List<LanguageViewModel> _fakeLanguageListViewModel = new List<LanguageViewModel>();
        private readonly Mock<ILanguageRepository> _mockRepo;
        private readonly LanguageController _mockController;

        public LanguageControllerTest()
        {
            _fakeLanguageList.Add(new Language { Id = 1 });
            _fakeLanguageList.Add(new Language { Id = 2 });
            _fakeLanguageListViewModel.Add(new LanguageViewModel { Id = 1 });
            _fakeLanguageListViewModel.Add(new LanguageViewModel { Id = 2 });
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
            Assert.Equal(_fakeLanguageListViewModel.Count, (testResult.Value as List<LanguageViewModel>).Count);
        }
    }
}
