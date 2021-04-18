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

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
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
                TargetLanguageId = model.TargetLanguage.Id
            }));
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
                Book = new BookViewModel { Id = result.BookId != null ? (int)result.BookId : 0 },
                IsOpened = result.IsOpened,
                OpenedDate = result.OpenedDate,
                PlayerName = result.PlayerName,
                Chapter = new ChapterViewModel { Id = result.ChapterId != null ? (int)result.ChapterId : 0 },
                TargetLanguage = new LanguageViewModel { Id = result.TargetLanguageId },
            });
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

    }
}
