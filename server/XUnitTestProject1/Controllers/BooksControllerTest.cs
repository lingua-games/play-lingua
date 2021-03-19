using Microsoft.AspNetCore.Mvc;
using Moq;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using PlayLingua.Host.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace PlayLingua.Unit.Test.Controllers
{
    public class BooksControllerTest
    {
        private readonly List<Book> _fakeBookList = new List<Book>();
        private readonly List<BookViewModel> _fakeBookListViewModel = new List<BookViewModel>();
        private readonly Mock<IBookRepository> _mockRepo;
        private readonly BooksController _mockController;

        public BooksControllerTest()
        {
            _fakeBookList.Add(new Book { Id = 1, TargetLanguageId = 1, SourceLanguageId = 1 });
            _fakeBookList.Add(new Book { Id = 2, TargetLanguageId = 1, SourceLanguageId = 2 });
            _fakeBookListViewModel.Add(new BookViewModel { Id = 1, TargetLanguageId = 1, SourceLanguageId = 1 });
            _fakeBookListViewModel.Add(new BookViewModel { Id = 2, TargetLanguageId = 1, SourceLanguageId = 2 });
            _mockRepo = new Mock<IBookRepository>();
            _mockController = new BooksController(_mockRepo.Object);
        }

        [Fact]
        public void List_Should_Return_List_Of_Books()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.List()).Returns(_fakeBookList);

            // Act
            var methodResult = _mockController.List();

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeBookListViewModel.Count(), (testResult.Value as List<BookViewModel>).Count());
        }

        [Fact]
        public void GetByLanguageId_Should_Return_Books_By_Language()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetByLanguage(1)).Returns(_fakeBookList.Where(x => x.TargetLanguageId == 1).ToList());

            // Act
            var methodResult = _mockController.GetByLanguageId(1);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeBookListViewModel.Where(x => x.TargetLanguageId == 1).Count(), (testResult.Value as List<BookViewModel>).Count());
        }

        [Fact]
        public void GetBySourceAndTargetLanguageId_Should_Get_Books_By_Their_SourceTargets()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetBySourceAndTargetLanguageId(1, 1)).Returns(_fakeBookList.Where(x => x.TargetLanguageId == 1 && x.SourceLanguageId == 1).ToList());

            // Act
            var methodResult = _mockController.GetBySourceAndTargetLanguageId(1, 1);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeBookList.Where(x => x.TargetLanguageId == 1 && x.SourceLanguageId == 1).Count(), (testResult.Value as List<BookViewModel>).Count());
        }

        [Fact]
        public void Add_Should_Add_A_Book_And_Return_Added_Book()
        {
            // Arrange
            var fakeAddedBook = new Book()
            {
                Id = 1,
                Name = "Fake Book"
            };
            var fakeAddedBookViewModel = new BookViewModel()
            {
                Id = 1,
                Name = "Fake Book"
            };
            _mockRepo.Setup(repo => repo.Add(It.IsAny<Book>(), 0)).Returns(fakeAddedBook);

            // Act
            var methodResult = _mockController.Add(fakeAddedBookViewModel);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(fakeAddedBook, testResult.Value);
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
        public void Update_Should_Call_Update_Method_And_Return_Updated_Book()
        {
            // Arrange
            var fakeUpdatedBook = new Book()
            {
                Id = 1,
                Name = "Fake Book"
            };
            var fakeUpdatedBookViewModel = new BookViewModel()
            {
                Id = 1,
                Name = "Fake Book"
            };
            _mockRepo.Setup(repo => repo.Update(fakeUpdatedBook));

            // Act
            var methodResult = _mockController.Update(1, fakeUpdatedBookViewModel);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(fakeUpdatedBookViewModel, testResult.Value);
        }
    }
}
