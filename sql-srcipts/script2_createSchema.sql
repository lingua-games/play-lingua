CREATE TABLE [PlayLingua].[dbo].[Book] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]   [varchar](100) NOT NULL,
	[TargetLanguage]   [varchar](100) NOT NULL,
)
GO

CREATE TABLE [PlayLingua].[dbo].[Chapter] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]        [varchar](50) NOT NULL,
    [Description] [varchar](200),
	[BookId]        int NOT NULL,
)
ALTER TABLE [PlayLingua].[dbo].[Chapter] ADD CONSTRAINT [FK_Chapter_BookId]
FOREIGN KEY ([BookId]) REFERENCES [PlayLingua].[dbo].[Book] ([Id])
GO

CREATE TABLE [PlayLingua].[dbo].[Word] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguage]   [varchar](5)       NOT NULL,
    [BaseWord]       [varchar](100)     NOT NULL,
    [TargetLanguage] [varchar](5)       NOT NULL,
    [Translate]      [varchar](100)     NOT NULL,
	[BookId]         int				NOT NULL,
	[ChapterId]      int				NOT NULL,
)
ALTER TABLE [PlayLingua].[dbo].[Word] ADD CONSTRAINT [FK_Word_BookId]
FOREIGN KEY ([BookId]) REFERENCES [PlayLingua].[dbo].[Book] ([Id])
GO
ALTER TABLE [PlayLingua].[dbo].[Word] ADD CONSTRAINT [FK_Word_ChapterId]
FOREIGN KEY ([ChapterId]) REFERENCES [PlayLingua].[dbo].[Chapter] ([Id])
GO

