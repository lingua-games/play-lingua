CREATE TABLE [PlayLingua].[dbo].[Book] (
    [BookId] [uniqueidentifier] NOT NULL,
    [Name]   [varchar](50) NOT NULL,
    CONSTRAINT [PK_Book] PRIMARY KEY (BookId)
)
GO

CREATE TABLE [PlayLingua].[dbo].[Chapter] (
    [ChapterId]   [uniqueidentifier] NOT NULL,
    [Name]        [varchar](50) NOT NULL,
    [Description] [varchar](200),
    CONSTRAINT [PK_Chapter] PRIMARY KEY (ChapterId)
)
GO

CREATE TABLE [PlayLingua].[dbo].[Word] (
    [WordId]         [uniqueidentifier] NOT NULL,
    [BaseLanguage]   [varchar](5) NOT NULL,
    [BaseWord]       [varchar](100) NOT NULL,
    [TargetLanguage] [varchar](5) NOT NULL,
    [Translate]      [varchar](100) NOT NULL,
    CONSTRAINT [PK_Word] PRIMARY KEY (WordId)
)
GO


CREATE TABLE [PlayLingua].[dbo].[BookChapters] (
    [BookChapterId] [uniqueidentifier] NOT NULL,
    [BookId]        [uniqueidentifier] NOT NULL,
    [ChapterId]     [uniqueidentifier] NOT NULL,
    CONSTRAINT [PK_BookChapter] PRIMARY KEY (BookChapterId)
)

ALTER TABLE [PlayLingua].[dbo].[BookChapters] ADD CONSTRAINT [FK_BookChapter_BookId]
FOREIGN KEY ([BookId]) REFERENCES [PlayLingua].[dbo].[Book] ([BookId])
GO
ALTER TABLE [PlayLingua].[dbo].[BookChapters] ADD CONSTRAINT [FK_BookChapter_ChapterId]
FOREIGN KEY ([ChapterId]) REFERENCES [PlayLingua].[dbo].[Chapter] ([ChapterId])
GO

CREATE TABLE [PlayLingua].[dbo].[ChapterWords] (
    [ChapterWordId] [uniqueidentifier] NOT NULL,
    [ChapterId]     [uniqueidentifier] NOT NULL,
    [WordId]        [uniqueidentifier] NOT NULL,
    CONSTRAINT [PK_ChapterWord] PRIMARY KEY (ChapterWordId)
)

ALTER TABLE [PlayLingua].[dbo].[ChapterWords] ADD CONSTRAINT [FK_ChapterWord_ChapterId]
FOREIGN KEY ([ChapterId]) REFERENCES [PlayLingua].[dbo].[Chapter] ([ChapterId])
GO
ALTER TABLE [PlayLingua].[dbo].[ChapterWords] ADD CONSTRAINT [FK_ChapterWord_BookId]
FOREIGN KEY ([WordId]) REFERENCES [PlayLingua].[dbo].[Word] ([WordId])
GO
