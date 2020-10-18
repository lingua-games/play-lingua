CREATE TABLE [Book] (
    [BookId] [uniqueidentifier] NOT NULL,
    [Name]   [varchar](50) NOT NULL,
    CONSTRAINT [PK_Book] PRIMARY KEY (BookId)
)
GO

CREATE TABLE [Chapter] (
    [ChapterId]   [uniqueidentifier] NOT NULL,
    [Name]        [varchar](50) NOT NULL,
    [Description] [varchar](200),
    CONSTRAINT [PK_Chapter] PRIMARY KEY (ChapterId)
)
GO

CREATE TABLE [Word] (
    [WordId]         [uniqueidentifier] NOT NULL,
    [BaseLanguage]   [varchar](5) NOT NULL,
    [BaseWord]       [varchar](100) NOT NULL,
    [TargetLanguage] [varchar](5) NOT NULL,
    [Translate]      [varchar](100) NOT NULL,
    CONSTRAINT [PK_Book] PRIMARY KEY (WordId)
)
GO


CREATE TABLE [BookChapters] (
    [BookChapterId] [uniqueidentifier] NOT NULL,
    [BookId]        [uniqueidentifier] NOT NULL,
    [ChapterId]     [uniqueidentifier] NOT NULL,
    CONSTRAINT [PK_BookChapter] PRIMARY KEY (BookChapterId)
)

CREATE TABLE [ChapterWords] (
    [ChapterWordId] [uniqueidentifier] NOT NULL,
    [ChapterId]     [uniqueidentifier] NOT NULL,
    [WordId]        [uniqueidentifier] NOT NULL,
    CONSTRAINT [PK_ChapterWord] PRIMARY KEY (ChapterWordId)
)