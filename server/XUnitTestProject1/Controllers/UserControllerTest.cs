﻿using Microsoft.AspNetCore.Mvc;
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
    public class UserControllerTest
    {
        private readonly List<User> _fakeUserList = new List<User>();
        private readonly List<UserViewModel> _fakeUserListViewModel = new List<UserViewModel>();
        private readonly Mock<IUserRepository> _mockUserRepo;
        private readonly Mock<IAuthRepository> _mockAuthRepo;
        private readonly UserController _mockController;

        public UserControllerTest()
        {
            _fakeUserList.Add(new User { Id = 1 });
            _fakeUserList.Add(new User { Id = 2 });
            _fakeUserListViewModel.Add(new UserViewModel { Id = 1 });
            _fakeUserListViewModel.Add(new UserViewModel { Id = 2 });
            _mockUserRepo = new Mock<IUserRepository>();
            _mockAuthRepo = new Mock<IAuthRepository>();
            _mockController = new UserController(_mockUserRepo.Object, _mockAuthRepo.Object);
        }

        [Fact]
        public void List_Should_Return_List_Of_Users()
        {
            // Arrange
            _mockUserRepo.Setup(repo => repo.List()).Returns(_fakeUserList);

            // Act
            var methodResult = _mockController.List();

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(_fakeUserListViewModel.Count, (testResult.Value as List<UserViewModel>).Count);
        }

        //[Fact]
        //public void GetUserInformation_Should_Get_User_Information()
        //{
        //    // Arrange
        //    var expectedResult = _fakeUserListViewModel.SingleOrDefault(x => x.Id == 1);
        //    _mockUserRepo.Setup(repo => repo.GetUserInformation(0)).Returns(_fakeUserList.SingleOrDefault(x => x.Id == 1));

        //    // Act
        //    var methodResult = _mockController.GetUserInformation();

        //    // Assert
        //    var testResult = methodResult.Result as OkObjectResult;
        //    Assert.Equal(expectedResult.Id, (testResult.Value as UserViewModel).Id);
        //}

          [Fact]
        public void Add_Should_Return_EmailSent_Status_User_If_Email_Is_Not_Exist()
        {
            // Arrange
            var fakeAddedUserViewModel = new UserViewModel()
            {
                Id = 1,
            };

            var fakeAddedUser = new User()
            {
                Id = 1,
            };
            _mockUserRepo.Setup(repo => repo.List()).Returns(new List<User>());
            _mockUserRepo.Setup(repo => repo.Add(It.IsAny<User>()));

            // Act
            var methodResult = _mockController.Add(fakeAddedUserViewModel);

            // Assert
            var testResult = methodResult.Result as OkObjectResult;
            Assert.Equal(RegisterStatus.EmailSent, (testResult.Value as RegisterUserViewModel).Status);
        }

        [Fact]
        public void Delete_Should_Call_Delete_Method()
        {
            // Arrange
            _mockUserRepo.Setup(repo => repo.Delete("1"));

            // Act
            var methodResult = _mockController.Delete("1");

            // Assert
            var testResult = methodResult as OkResult;
            Assert.Equal(200, testResult.StatusCode);
        }

        //[Fact]
        //public void Update_Should_Return_406_If_IsChangingPassword_And_Current_Password_Is_Incorrect()
        //{
        //    // Arrange
        //    var fakeUpdatedUser = new EditUserModel()
        //    {
        //        Id = 1,
        //        IsChangingPassword = true,
        //        CurrentPassword = "Fake password"
        //    };
        //    _mockAuthRepo.Setup(repo => repo.Login(new User { Password = fakeUpdatedUser.CurrentPassword })).Returns(new LoginResult { IsLogin = false, User = new User() });

        //    // Act
        //    var methodResult = _mockController.Update(fakeUpdatedUser);

        //    // Assert
        //    var testResult = methodResult.Result as ObjectResult;
        //    Assert.Equal(406, testResult.StatusCode);
        //}

        //[Fact]
        //public void Update_Should_Set_New_Token_For_User()
        //{
        //    // Arrange
        //    var fakeUpdatedUser = new EditUserModel()
        //    {
        //        Id = 1,
        //        IsChangingPassword = false,
        //        CurrentPassword = "Fake password"
        //    };
        //    _mockUserRepo.Setup(repo => repo.Update(fakeUpdatedUser));
        //    _mockAuthRepo.Setup(repo => repo.Login(new User { Password = fakeUpdatedUser.CurrentPassword })).Returns(new LoginResult { IsLogin = false, User = new User() });
        //    _mockAuthRepo.Setup(repo => repo.GenerateToken(new User
        //    {
        //        Password = fakeUpdatedUser.CurrentPassword,
        //        Id = fakeUpdatedUser.Id
        //    })).Returns("Fake Token");
        //    // Act
        //    var methodResult = _mockController.Update(fakeUpdatedUser);

        //    // Assert
        //    var testResult = methodResult.Result as ObjectResult;
        //    Assert.Equal(406, testResult.StatusCode);
        //}
    }
}
