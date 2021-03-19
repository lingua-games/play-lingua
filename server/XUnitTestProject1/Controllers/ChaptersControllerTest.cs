using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using PlayLingua.WebApi.Controllers;
using System.Collections.Generic;
using Xunit;

namespace PlayLingua.Unit.Test.Controllers
{
    public class ChaptersControllerTest
    {
        private readonly List<Chapter> _fakeChapterList = new List<Chapter>();
        private readonly List<ChapterViewModel> _fakeChapterListViewModel = new List<ChapterViewModel>();
        private readonly Mock<IChapterRepository> _mockRepo;
        private readonly ChaptersController _mockController;

        public ChaptersControllerTest()
        {
            _fakeChapterList.Add(new Chapter { Id = 1 });
            _fakeChapterList.Add(new Chapter { Id = 2 });
            _fakeChapterListViewModel.Add(new ChapterViewModel { Id = 1 });
            _fakeChapterListViewModel.Add(new ChapterViewModel { Id = 2 });
            _mockRepo = new Mock<IChapterRepository>();
            _mockController = new ChaptersController(_mockRepo.Object);
        }

        [Fact]
        public void GetByLanguageId_Should_Get_Chapters_By_Language()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetByBookId(1)).Returns(_fakeChapterList);

            // Act
            var methodResult = _mockController.GetByLanguageId(1);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeChapterListViewModel.Count, (testResult.Value as List<ChapterViewModel>).Count);
        }
    }
}
