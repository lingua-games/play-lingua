﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlayLingua.Contract.ViewModels;
using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;
using PlayLingua.Domain.Ports;
using System.Security.Claims;

namespace PlayLingua.Host.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SelectedLanguagesController : BaseController
    {
        private readonly ISelectedLanguagesRepository _selectedLanguagesRepository;

        public SelectedLanguagesController(ISelectedLanguagesRepository selectedLanguages)
        {
            _selectedLanguagesRepository = selectedLanguages;
        }

        [HttpPost]
        [Authorize]
        public ActionResult<SelectedLanguagesViewModel> Add([FromBody] SelectedLanguagesViewModel model)
        {
            var addedSelection = new SelectedLanguages();
            var selectedLanguageByUserId = _selectedLanguagesRepository.GetByUserId(GetUser().Id);
            if (selectedLanguageByUserId == null)
            {
                addedSelection = _selectedLanguagesRepository.Add(new SelectedLanguages
                {
                    BaseLanguages = model.BaseLanguages,
                    TargetLanguages = model.TargetLanguages,
                    UserId = model.UserId
                });
            }
            else
            {
                _selectedLanguagesRepository.Update(new SelectedLanguages
                {
                    Id = selectedLanguageByUserId.Id,
                    BaseLanguages = model.BaseLanguages,
                    TargetLanguages = model.TargetLanguages
                });
            }
            return Ok(addedSelection);
        }

        [HttpPost("setDefaultSelection")]
        public ActionResult SetDefaultSelection([FromBody] SelectDefaultLanguageViewModel model)
        {
            var userId = GetUser().Id;
            _selectedLanguagesRepository.SetDefaultLanguages(new SelectDefaultLanguageModel
            {
                DefaultBaseLanguage = model.DefaultBaseLanguage,
                DefaultTargetLanguage = model.DefaultTargetLanguage
            }, userId);
            return Ok();
        }
    }
}
