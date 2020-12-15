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
	[TargetLanguageId]   int NOT NULL,
)
GO
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [FK_Book_TargetLanguageId]
FOREIGN KEY ([TargetLanguageId]) REFERENCES [dbo].[Language] ([Id])
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
    [BaseLanguageId]   int                NOT NULL,
    [BaseWord]         [varchar](100)     NOT NULL,
    [TargetLanguageId] int                NOT NULL,
    [Translate]        [varchar](100)     NOT NULL,
	[BookId]           int			      NOT NULL,
	[ChapterId]        int				  NOT NULL,
)
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_BookId]
FOREIGN KEY ([BookId]) REFERENCES [dbo].[Book] ([Id])
GO
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_ChapterId]
FOREIGN KEY ([ChapterId]) REFERENCES [dbo].[Chapter] ([Id])
GO
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_BaseLanguageId]
FOREIGN KEY ([BaseLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_TargetLanguageId]
FOREIGN KEY ([TargetLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO

CREATE TABLE [dbo].[BaseLanguageToTargetLanguage] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguageId]   int                NOT NULL,
    [TargetLanguageId] int                NOT NULL,
)
Go

CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Email]   [varchar](100) NOT NULL,
	[Password]   [varchar](200) NOT NULL,
	[DefaultTargetLanguage]   int,
	[DefaultBaseLanguage]   int,
)
GO
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [FK_User_DefaultTargetLanguage]
FOREIGN KEY ([DefaultTargetLanguage]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [FK_User_DefaultBaseLanguage]
FOREIGN KEY ([DefaultBaseLanguage]) REFERENCES [dbo].[Language] ([Id])
GO



CREATE TABLE [dbo].[SelectedLanguages] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguages]   [nvarchar](500) NOT NULL,
	[TargetLanguages]   [nvarchar](500) NOT NULL,
	[UserId]   int NOT NULL,
)
ALTER TABLE [dbo].[SelectedLanguages] ADD CONSTRAINT [FK_SelectedLanguages_UserId]
FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])
GO


