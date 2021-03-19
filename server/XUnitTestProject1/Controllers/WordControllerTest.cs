using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using Xunit;

namespace PlayLingua.Unit.Test.Controllers
{
    public class WordControllerTest
    {
        private readonly Mock<IWordRepository> _mockWordRepo;
        private readonly Mock<IBookRepository> _mockBookRepo;
        private readonly Mock<IChapterRepository> _mockChapterRepo;
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
            var fakeViewModel = new SelectedLanguageViewModel
            {
                Target = 1
            };
            _mockWordRepo.Setup(repo => repo.InquiryAboutSelectedLanguages(It.IsAny<SelectedLanguageModel>())).Returns(true);

            // Act
            var methodResult = _mockController.InquiryAboutSelectedLanguages(fakeViewModel);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(true, testResult.Value);
        }
    }
}
