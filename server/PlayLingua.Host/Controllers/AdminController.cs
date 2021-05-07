using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : BaseController
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IChapterRepository _chapterReposotory;
        private readonly ILanguageRepository _languageRepository;

        public AdminController(
            IAdminRepository adminRepository,
            IBookRepository bookRepository,
            IChapterRepository chapterRepository,
            ILanguageRepository languageRepository
            )
        {
            _adminRepository = adminRepository;
            _bookRepository = bookRepository;
            _chapterReposotory = chapterRepository;
            _languageRepository = languageRepository;
        }

        [HttpPost("send-invitation")]
        public ActionResult<InvitationViewModel> AddInvitation(InvitationViewModel model)
        {
            return Ok(_adminRepository.AddInvitation(new Invitation
            {
                AddedBy = GetUser().Id,
                AddedDate = DateTime.Now,
                BaseLanguageId = model.BaseLanguage.Id,
                BookId = model.Book?.Id,
                ChapterId = model.Chapter?.Id,
                Count = model.Count,
                Email = model.Email,
                Game = model.Game,
                UniqueKey = model.UniqueKey,
                GeneratedLink = model.GeneratedLink,
                HtmlText = model.HtmlText,
                IsOpened = false,
                OpenedDate = null,
                PlayerName = model.PlayerName,
                LastUpdateDate = DateTime.Now,
                TargetLanguageId = model.TargetLanguage.Id,
                Title = model.Title
            }));
        }

        [HttpPost("change-invitation-visibility")]
        public ActionResult<InvitationViewModel> ChangeInvitationVisibility(InvitationViewModel model)
        {
            _adminRepository.ChangeInvitationVisibility(new Invitation
            {
                UniqueKey = model.UniqueKey,
                Visible = model.Visible
            });
            return Ok();
        }

        [HttpGet("get-invitation-by-unique-key/{uniqueCode}")]
        public ActionResult<InvitationViewModel> GetInvitationByUniqueKey(string uniqueCode)
        {
            var result = _adminRepository.GetInvitationByUniqueKey(uniqueCode);

            return Ok(new InvitationViewModel
            {
                UniqueKey = result.UniqueKey,
                BaseLanguage = new LanguageViewModel { Id = result.BaseLanguageId },
                Email = result.Email,
                Count = result.Count,
                Game = result.Game,
                Book = new BookViewModel
                {
                    Id = result.BookId != null ? (int)result.BookId : 0,
                },
                Chapter = new ChapterViewModel { Id = result.ChapterId != null ? (int)result.ChapterId : 0 },
                IsOpened = result.IsOpened,
                OpenedDate = result.OpenedDate,
                PlayerName = result.PlayerName,
                TargetLanguage = new LanguageViewModel { Id = result.TargetLanguageId },
                Score = result.Score,
                NumberOfPlayed = result.NumberOfPlayed
            });
        }

        [HttpGet("get-invitations")]
        public ActionResult<InvitationViewModel> GetVisibleInvitations()
        {
            var books = _bookRepository.List();
            var chapter = _chapterReposotory.List();
            var languages = _languageRepository.List();

            return Ok(_adminRepository.GetVisibleInvitations().Select(x => new InvitationViewModel
            {
                UniqueKey = x.UniqueKey,
                Email = x.Email,
                Count = x.Count,
                Game = x.Game,
                Book = new BookViewModel
                {
                    Id = x.BookId != null ? (int)x.BookId : 0,
                    Name = x.BookId != null ? books.Find(b => b.Id == (int)x.BookId).Name : ""
                },
                Chapter = new ChapterViewModel
                {
                    Id = x.ChapterId != null ? (int)x.ChapterId : 0,
                    Name = x.ChapterId != null ? chapter.Find(b => b.Id == (int)x.ChapterId).Name : ""
                },
                IsOpened = x.IsOpened,
                OpenedDate = x.OpenedDate,
                PlayerName = x.PlayerName,
                TargetLanguage = new LanguageViewModel
                {
                    Id = x.TargetLanguageId,
                    FullName = languages.Find(l => l.Id == x.TargetLanguageId).FullName
                },
                BaseLanguage = new LanguageViewModel
                {
                    Id = x.BaseLanguageId,
                    FullName = languages.Find(l => l.Id == x.BaseLanguageId).FullName
                },
                AddedDate = x.AddedDate,
                Id = x.Id,
                IsEmailSent = x.IsEmailSent,
                EmailErrorMessage = x.EmailErrorMessage,
                GeneratedLink = x.GeneratedLink,
                Score = x.Score,
                NumberOfPlayed = x.NumberOfPlayed
            }).ToList());
        }

        [HttpGet("resend-invitation-email/{uniqueCode}")]
        public ActionResult ResendInvitationEmail(string uniqueCode)
        {
            var invitation = _adminRepository.GetInvitationByUniqueKey(uniqueCode);

            var sendMailResult = _adminRepository.SendFeedbackMail(invitation);

            invitation.IsEmailSent = sendMailResult.IsEmailSent;
            invitation.EmailErrorMessage = sendMailResult.EmailErrorMessage;

            _adminRepository.UpdateInvitation(invitation);

            return Ok();

        }

        [HttpPost("edit-invitation")]
        public ActionResult<InvitationViewModel> EditInvitation(InvitationViewModel model)
        {
            _adminRepository.UpdateInvitation(new Invitation
            {
                AddedBy = GetUser().Id,
                AddedDate = DateTime.Now,
                BaseLanguageId = model.BaseLanguage.Id,
                BookId = model.Book.Id,
                ChapterId = model.Chapter.Id,
                Count = model.Count,
                Email = model.Email,
                Game = model.Game,
                GeneratedLink = model.GeneratedLink,
                HtmlText = model.HtmlText,
                IsOpened = false,
                OpenedDate = null,
                PlayerName = model.PlayerName,
                LastUpdateDate = DateTime.Now,
                TargetLanguageId = model.TargetLanguage.Id
            });

            return Ok();
        }

        [HttpPost("set-invitation-open")]
        public ActionResult<InvitationViewModel> SetInvitationToOpen(InvitationViewModel model)
        {
            if (!model.IsOpened)
            {
                _adminRepository.SetInvitationToOpen(new Invitation
                {
                    UniqueKey = model.UniqueKey
                });
            }
            return Ok();
        }

        [HttpGet("get-user-list-for-invitations")]
        public ActionResult<List<UserListForInvitationViewModel>> GetUserListForInvitation()
        {
            return _adminRepository.GetUserListForInvitation().Select(x => new UserListForInvitationViewModel
            {
                DisplayName = x.DisplayName,
                Email = x.Email
            }).ToList();
        }
    }
}
