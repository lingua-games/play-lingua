use [DB_A6A40C_playlingua]

CREATE TABLE [dbo].[Language] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Code]   [varchar](10) NOT NULL,
	[Name]   [varchar](200) NOT NULL,
	[NativeName]   [nvarchar](200) NOT NULL,
)
GO

CREATE TABLE [dbo].[Book] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]   [varchar](100) NOT NULL,
	[TargetLanguage]   [varchar](100) NOT NULL,
)
GO

CREATE TABLE [dbo].[Chapter] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]        [varchar](50) NOT NULL,
    [Description] [varchar](200),
	[BookId]        int NOT NULL,
)
ALTER TABLE [dbo].[Chapter] ADD CONSTRAINT [FK_Chapter_BookId]
FOREIGN KEY ([BookId]) REFERENCES [dbo].[Book] ([Id])
GO

CREATE TABLE [dbo].[Word] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguage]   [varchar](5)       NOT NULL,
    [BaseWord]       [varchar](100)     NOT NULL,
    [TargetLanguage] [varchar](5)       NOT NULL,
    [Translate]      [varchar](100)     NOT NULL,
	[BookId]         int				NOT NULL,
	[ChapterId]      int				NOT NULL,
)
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_BookId]
FOREIGN KEY ([BookId]) REFERENCES [dbo].[Book] ([Id])
GO
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_ChapterId]
FOREIGN KEY ([ChapterId]) REFERENCES [dbo].[Chapter] ([Id])
GO

