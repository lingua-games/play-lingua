use [PlayLingua]

CREATE TABLE [dbo].[Language] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Code]   nvarchar(10) NOT NULL,
	[Name]   nvarchar(200) NOT NULL,
	[NativeName]   nvarchar(200) NOT NULL,
)
GO

CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Email]   nvarchar(100) NOT NULL,
	[DisplayName] nvarchar(200) NOT NULL,
	[Password]   nvarchar(200),
	[DefaultTargetLanguageId]   int,
	[DefaultBaseLanguageId]   int,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
	[TotalScore] float,
	[EmailVerificationCode] UNIQUEIDENTIFIER,
	[IsEmailVerified] BIT,
	[EmailVerifiedDate] datetime,
	NeedsResetPassword BIT
)
GO
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [FK_User_DefaultTargetLanguage]
FOREIGN KEY ([DefaultTargetLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [FK_User_DefaultBaseLanguage]
FOREIGN KEY ([DefaultBaseLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO

CREATE TABLE [dbo].[Book] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]   nvarchar(100) NOT NULL,
	[TargetLanguageId]   int NOT NULL,
	[BaseLanguageId]   int NOT NULL,
	[AddedBy]   int NOT NULL,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
)
GO
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [FK_Book_TargetLanguageId]
FOREIGN KEY ([TargetLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [FK_Book_BaseLanguageId]
FOREIGN KEY ([BaseLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Book] ADD CONSTRAINT [FK_Book_AddedBy]
FOREIGN KEY ([AddedBy]) REFERENCES [dbo].[Users] ([Id])
GO


CREATE TABLE [dbo].[Chapter] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Name]        nvarchar(50) NOT NULL,
    [Description] nvarchar(200),
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

create table [dbo].[words] (
	[Id] int IDENTITY(1,1) PRIMARY KEY,
	[LanguageId]   int                NOT NULL,
	[Word]         nvarchar(100)     NOT NULL,
	[AddedBy]   int NOT NULL,
	[AddedDate] datetime NOT NULL,
	[SpeechId] int,
)
ALTER TABLE [dbo].[Words] ADD CONSTRAINT [FK_Words_SpeechId]
FOREIGN KEY ([SpeechId]) REFERENCES [dbo].[Speech] ([Id])
GO
ALTER TABLE [dbo].[Words] ADD CONSTRAINT [FK_Words_LanguageId]
FOREIGN KEY ([LanguageId]) REFERENCES [dbo].[Language] ([Id])
GO

create table [dbo].[WordsToWords] (
	[Id] int IDENTITY(1,1) PRIMARY KEY,
	[BaseWordId]			int                NOT NULL,
	[TargetWordId]          int      		   NOT NULL,
	[AddedBy]				int				   NOT NULL,
	[AddedDate]				datetime		   NOT NULL,
	[BookId]				int,                
	[ChapterId]				int				   
)
ALTER TABLE [dbo].[wordsToWords] ADD CONSTRAINT [FK_WordsToWords_BookId]
FOREIGN KEY (BookId) REFERENCES [dbo].Book ([Id])
GO
ALTER TABLE [dbo].[wordsToWords] ADD CONSTRAINT [FK_WordsToWords_ChapterId]
FOREIGN KEY (ChapterId) REFERENCES [dbo].Chapter ([Id])
GO
ALTER TABLE [dbo].[wordsToWords] ADD CONSTRAINT [FK_WordsToWords_BaseWordId]
FOREIGN KEY ([BaseWordId]) REFERENCES [dbo].[Words] ([Id])
GO
ALTER TABLE [dbo].[wordsToWords] ADD CONSTRAINT [FK_WordsToWords_TargetWordId]
FOREIGN KEY ([TargetWordId]) REFERENCES [dbo].[Words] ([Id])
GO


--CREATE TABLE [dbo].[Word_v1] (
--    [Id] int IDENTITY(1,1) PRIMARY KEY,
--    [BaseLanguageId]   int                NOT NULL,
--    [BaseWord]         nvarchar(100)     NOT NULL,
--    [TargetLanguageId] int                NOT NULL,
--    [Translate]        nvarchar(100)     NOT NULL,
--	[BookId]           int			          NULL,
--	[ChapterId]        int					  NULL,
--	[AddedBy]   int NOT NULL,
--	[AddedDate] datetime NOT NULL,
--	[LastUpdateDate] datetime,
--	[BaseSpeechId] int,
--	[TargetSpeechId] int
--)
--ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_BookId]
--FOREIGN KEY ([BookId]) REFERENCES [dbo].[Book] ([Id])
--GO
--ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_ChapterId]
--FOREIGN KEY ([ChapterId]) REFERENCES [dbo].[Chapter] ([Id])
--GO
--ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_BaseLanguageId]
--FOREIGN KEY ([BaseLanguageId]) REFERENCES [dbo].[Language] ([Id])
--GO
--ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_TargetLanguageId]
--FOREIGN KEY ([TargetLanguageId]) REFERENCES [dbo].[Language] ([Id])
--GO
--ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_AddedBy]
--FOREIGN KEY ([AddedBy]) REFERENCES [dbo].[Users] ([Id])
--GO
--ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_Base_SpeechId]
--FOREIGN KEY ([BaseSpeechId]) REFERENCES [dbo].[Speech] ([Id])
--GO
--ALTER TABLE [dbo].[Word] ADD CONSTRAINT [FK_Word_Target_SpeechId]
--FOREIGN KEY ([TargetSpeechId]) REFERENCES [dbo].[Speech] ([Id])
--GO

CREATE TABLE [dbo].[BaseLanguageToTargetLanguage] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [BaseLanguageId]   int                NOT NULL,
    [TargetLanguageId] int                NOT NULL,
	[AddedDate] datetime NOT NULL,
	[LastUpdateDate] datetime,
)
Go

CREATE TABLE [dbo].[Speech] (
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [Code]   int                NOT NULL,
	[AddedDate] datetime NOT NULL,
	[Status] int NOT NULL,
	[ErrorMessage] nvarchar(max)
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
		[FeedbackUniqueKey] uniqueidentifier,
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



CREATE TABLE [dbo].[Invitations] (
		[Id] int IDENTITY(1,1) PRIMARY KEY,
		[Email] nvarchar(200) NOT NULL,
		[BaseLanguageId]   int NOT NULL,
		[TargetLanguageId] int NOT NULL,
		[Bookid] int,
		[ChapterId] int,
		GeneratedLink nvarchar(Max) NOT NULL,
		Count int,
		PlayerName nvarchar(200) NOT NULL,
		Game nvarchar(200) NOT NULL,
		HtmlText nvarchar(Max) NOT NULL,
		IsOpened bit,
		OpenedDate datetime,
		[AddedBy]   int NOT NULL,
		[AddedDate] datetime NOT NULL,
		[LastUpdateDate] datetime,
		UniqueKey uniqueidentifier NOT NULL,
		IsEmailSent bit NOT NULL,
		EmailErrorMessage nvarchar(max),
		Visible bit,
		Title nvarchar(max),
)
ALTER TABLE [dbo].[Invitations] ADD CONSTRAINT [FK_Invitations_BaseLanguageId]
FOREIGN KEY ([BaseLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Invitations] ADD CONSTRAINT [FK_Invitations_TargetLanguageId]
FOREIGN KEY ([TargetLanguageId]) REFERENCES [dbo].[Language] ([Id])
GO
ALTER TABLE [dbo].[Invitations] ADD CONSTRAINT [FK_Invitations_Bookid]
FOREIGN KEY ([BookId]) REFERENCES [dbo].[Book] ([Id])
GO
ALTER TABLE [dbo].[Invitations] ADD CONSTRAINT [FK_Invitations_ChapterId]
FOREIGN KEY ([ChapterId]) REFERENCES [dbo].[Chapter] ([Id])
GO
ALTER TABLE [dbo].[Invitations] ADD CONSTRAINT [FK_Invitations_AddedBy]
FOREIGN KEY ([AddedBy]) REFERENCES [dbo].[Users] ([Id])
GO
