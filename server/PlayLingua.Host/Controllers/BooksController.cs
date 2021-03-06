﻿using Microsoft.AspNetCore.Authorization;
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
    public class BooksController : BaseController
    {
        private readonly IBookRepository _bookRepository;
        // private readonly IChapterRepository _chapterRepository;

        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public ActionResult<List<BookViewModel>> List()
        {
            return Ok(_bookRepository.List().Select(x => new BookViewModel
            {
                Id = x.Id,
                Name = x.Name,
                BaseLanguageId = x.BaseLanguageId,
                TargetLanguageId = x.TargetLanguageId
            }).ToList());
        }

        [HttpGet("by-language/{targetLanguageId}/{baseLanguageId}")]
        public ActionResult<List<BookViewModel>> GetByLanguageId(int targetLanguageId, int baseLanguageId)
        {
            return Ok(_bookRepository.GetByLanguage(targetLanguageId, baseLanguageId).Select(x => new BookViewModel
            {
                Id = x.Id,
                Name = x.Name,
                BaseLanguageId = x.BaseLanguageId,
                TargetLanguageId = x.TargetLanguageId
            }).ToList());
        }

        [HttpGet("by-source-and-target-language/{baseLanguageId}/{targetLanguageId}")]
        public ActionResult<List<BookViewModel>> GetBySourceAndTargetLanguageId(int baseLanguageId, int targetLanguageId)
        {
            return Ok(_bookRepository.GetBySourceAndTargetLanguageId(baseLanguageId, targetLanguageId).Select(x => new BookViewModel
            {
                Id = x.Id,
                Name = x.Name,
                BaseLanguageId = x.BaseLanguageId,
                TargetLanguageId = x.TargetLanguageId
            }).ToList());
        }

        [Authorize]
        [HttpPost]
        public ActionResult<BookViewModel> Add([FromBody] BookViewModel model)
        {
            var addedBook = _bookRepository.Add(new Book
            {
                Name = model.Name,
                BaseLanguageId = model.BaseLanguageId,
                TargetLanguageId = model.TargetLanguageId
            }, GetUser().Id);
            return Ok(addedBook);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _bookRepository.Delete(id);
            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public ActionResult<BookViewModel> Update(int id, BookViewModel model)
        {
            _bookRepository.Update(new Book
            {
                Id = id,
                Name = model.Name,
                BaseLanguageId = model.BaseLanguageId,
                TargetLanguageId = model.TargetLanguageId
            });
            return Ok(model);
        }

    }
}
