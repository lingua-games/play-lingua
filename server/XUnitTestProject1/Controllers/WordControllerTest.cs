using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
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
    public class WordControllerTest
    {
        private Mock<IWordRepository> _mockWordRepo;
        private Mock<IBookRepository> _mockBookRepo;
        private Mock<IChapterRepository> _mockChapterRepo;
        private readonly WordController _mockController;

        public WordControllerTest()
        {
            _mockWordRepo = new Mock<IWordRepository>();
            _mockBookRepo = new Mock<IBookRepository>();
            _mockChapterRepo = new Mock<IChapterRepository>();
            _mockController = new WordController(_mockWordRepo.Object, _mockBookRepo.Object, _mockChapterRepo.Object);
        }

        [Fact]
        public void InquiryAboutSelectedLanguages_Should_Return_Inquiry_Result()
        {
            // Arrange
            var fakeModel = new SelectedLanguageModel
            {
                Target = 1
            };
            _mockWordRepo.Setup(repo => repo.InquiryAboutSelectedLanguages(fakeModel)).Returns(true);

            // Act
            var methodResult = _mockController.InquiryAboutSelectedLanguages(fakeModel);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(true, testResult.Value);
        }
    }
}
