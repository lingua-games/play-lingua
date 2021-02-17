use [PlayLingua]

CREATE TABLE [dbo].[Language] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Code]   varchar(10) NOT NULL,
	[Name]   varchar(200) NOT NULL,
	[NativeName]   nvarchar(200) NOT NULL,
)
GO

CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Email]   varchar(100) NOT NULL,
	[Password]   varchar(200) NOT NULL,
	[DefaultTargetLanguage]   int,
	[DefaultBaseLanguage]   int,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
)
GO
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [FK_User_DefaultTargetLanguage]
FOREIGN KEY ([DefaultTargetLanguage]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [FK_User_DefaultBaseLanguage]
FOREIGN KEY ([DefaultBaseLanguage]) REFERENCES [dbo].[Language] ([Id])
GO

CREATE TABLE [dbo].[Book] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]   varchar(100) NOT NULL,
	[TargetLanguageId]   int NOT NULL,
	[SourceLanguageId]   int NOT NULL,
	[AddedBy]   int NOT NULL,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
)
GO
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [FK_Book_TargetLanguageId]
FOREIGN KEY ([TargetLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [FK_Book_SourceLanguageId]
FOREIGN KEY ([SourceLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [FK_Book_AddedBy]
FOREIGN KEY ([AddedBy]) REFERENCES [dbo].[Users] ([Id])
GO


CREATE TABLE [dbo].[Chapter] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]        varchar(50) NOT NULL,
    [Description] varchar(200),
	[BookId]        int NOT NULL,
	[AddedBy]   int NOT NULL,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
)
ALTER TABLE [dbo].[Chapter] ADD CONSTRAINT [FK_Chapter_BookId]
FOREIGN KEY ([BookId]) REFERENCES [dbo].[Book] ([Id])
GO
ALTER TABLE [dbo].[Chapter] ADD CONSTRAINT [FK_Chapter_AddedBy]
FOREIGN KEY ([AddedBy]) REFERENCES [dbo].[Users] ([Id])
GO

CREATE TABLE [dbo].[Word] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguageId]   int                NOT NULL,
    [BaseWord]         varchar(100)     NOT NULL,
    [TargetLanguageId] int                NOT NULL,
    [Translate]        varchar(100)     NOT NULL,
	[BookId]           int			          NULL,
	[ChapterId]        int					  NULL,
	[AddedBy]   int NOT NULL,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
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
ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_AddedBy]
FOREIGN KEY ([AddedBy]) REFERENCES [dbo].[Users] ([Id])
GO

CREATE TABLE [dbo].[BaseLanguageToTargetLanguage] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguageId]   int                NOT NULL,
    [TargetLanguageId] int                NOT NULL,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
)
Go

CREATE TABLE [dbo].[SelectedLanguages] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguages]   nvarchar(500) NOT NULL,
	[TargetLanguages]   nvarchar(500) NOT NULL,
	[UserId]   int NOT NULL,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
)
ALTER TABLE [dbo].[SelectedLanguages] ADD CONSTRAINT [FK_SelectedLanguages_UserId]
FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])
GO

CREATE TABLE [dbo].[RequestLogs] (
		[Id] int IDENTITY(1,1) PRIMARY KEY,
		[StartTime] datetime,
		[UserId] int,
		[Path] nvarchar(500) NOT NULL,
		[Method] nvarchar(500),
		[Body] nvarchar(500),
		[RequestSize] int,
		[IpAddress] nvarchar(50) NOT NULL,
		[ProcessDuration] float,
		[Failed] Bit,
		[HadException] Bit,
		[Response] nvarchar(Max),
		[ResponseStatusCode] int,
		[ResponseSize] int,
		[ExceptionTitle] nvarchar(500),
		[ExceptionMessage] nvarchar(500),
)
ALTER TABLE [dbo].[RequestLogs] ADD CONSTRAINT [FK_RequestLogs_UserId]
FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])
GO


CREATE TABLE [dbo].[GameScores] (
		[Id] int IDENTITY(1,1) PRIMARY KEY,
		[UserId] int,
		[GuestCode] nvarchar(100),
		[GameName] nvarchar(100),
		[Bookid] int,
		[ChapterId] int,
		[AddedDate] datetime,
		[LastUpdateDate] datetime,
		[Score] float,
)
ALTER TABLE [dbo].[GameScores] ADD CONSTRAINT [FK_GameScores_UserId]
FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[GameScores] ADD CONSTRAINT [FK_GameScores_Bookid]
FOREIGN KEY ([BookId]) REFERENCES [dbo].[Book] ([Id])
GO
ALTER TABLE [dbo].[GameScores] ADD CONSTRAINT [FK_GameScores_ChapterId]
FOREIGN KEY ([ChapterId]) REFERENCES [dbo].[Chapter] ([Id])
GO