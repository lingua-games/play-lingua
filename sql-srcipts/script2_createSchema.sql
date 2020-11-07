CREATE TABLE [PlayLingua].[dbo].[Book] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]   [varchar](100) NOT NULL,
)
GO

CREATE TABLE [PlayLingua].[dbo].[Chapter] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]        [varchar](50) NOT NULL,
    [Description] [varchar](200),
)
GO

CREATE TABLE [PlayLingua].[dbo].[Word] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguage]   [varchar](5)       NOT NULL,
    [BaseWord]       [varchar](100)     NOT NULL,
    [TargetLanguage] [varchar](5)       NOT NULL,
    [Translate]      [varchar](100) NOT NULL,
)
GO


CREATE TABLE [PlayLingua].[dbo].[BookChapters] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BookId]        int NOT NULL,
    [ChapterId]     int NOT NULL,
)

ALTER TABLE [PlayLingua].[dbo].[BookChapters] ADD CONSTRAINT [FK_BookChapter_BookId]
FOREIGN KEY ([BookId]) REFERENCES [PlayLingua].[dbo].[Book] ([Id])
GO
ALTER TABLE [PlayLingua].[dbo].[BookChapters] ADD CONSTRAINT [FK_BookChapter_ChapterId]
FOREIGN KEY ([ChapterId]) REFERENCES [PlayLingua].[dbo].[Chapter] ([Id])
GO

-- Lets talk about this table 

--CREATE TABLE [PlayLingua].[dbo].[ChapterWords] (
--    [ChapterWordId] [uniqueidentifier] NOT NULL,
--    [ChapterId]     [uniqueidentifier] NOT NULL,
--    [WordId]        [uniqueidentifier] NOT NULL,
--    CONSTRAINT [PK_ChapterWord] PRIMARY KEY (ChapterWordId)
--)

--ALTER TABLE [PlayLingua].[dbo].[ChapterWords] ADD CONSTRAINT [FK_ChapterWord_ChapterId]
--FOREIGN KEY ([ChapterId]) REFERENCES [PlayLingua].[dbo].[Chapter] ([ChapterId])
--GO
--ALTER TABLE [PlayLingua].[dbo].[ChapterWords] ADD CONSTRAINT [FK_ChapterWord_BookId]
--FOREIGN KEY ([WordId]) REFERENCES [PlayLingua].[dbo].[Word] ([WordId])
--GO


