#addin "Cake.Omnia.BuildMetadata&version=1.0.10"
#addin "Cake.Git&version=0.18.0"
#addin "Cake.Docker&version=0.11.0"

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////
var target        = Argument<string>("target", "Default");
var configuration = Argument<string>("configuration", "Debug");
var name          = Argument<string>("name", "PlayLingua.Server");
var verbosity     = Argument<string>("verbosity", "Minimal");

// MSBuild settings
var msBuildVerbosity = Verbosity.Minimal;
var targetPlatform   = PlatformTarget.x64;

//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////

// Define directories.
var _solutionDir  = Directory(".");
var _solutionFile = _solutionDir + File($"{name}.sln");
var _mainProjDir  = _solutionDir + Directory ("PlayLingua.WebApi");
var _artifactDir  = _solutionDir + Directory("artifact");
var version       = EnvironmentVariable("build_number");

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() =>
{
    var objDirs = GetDirectories($"{_solutionDir}/**/obj/**/{configuration}");
    var binDirs = GetDirectories($"{_solutionDir}/**/bin/**/{configuration}");

    var directories = binDirs + objDirs;
    CleanDirectory(_artifactDir);
    CleanDirectories(directories);
});

Task("Restore-NuGet-Packages")
    .Does(() =>
{
    NuGetRestore(_solutionFile);
});


Task("Build")
    .IsDependentOn("Restore-NuGet-Packages")
    .Does(() =>
{
    var settings = new DotNetCoreBuildSettings
    {
        Configuration = configuration,
    };

    DotNetCoreBuild(_solutionFile, settings);
});

Task("Run-Unit-Tests")
    .Does(() =>
{
    var testAssemblies = GetFiles($"{_solutionDir}/tests/**/*.Tests.Unit.csproj");
    if(testAssemblies.Count == 0)
    {
        Information("No tests found");
        return;
    }

    var settings = new DotNetCoreTestSettings()
    {
        Configuration = configuration,
        NoBuild = true,
        Logger = "console;verbosity=normal"
    };

    foreach(var project in testAssemblies)
    {
        DotNetCoreTest(project.FullPath, settings);
    }
});

Task("Run-Integration-Tests")
    .Does(() =>
{
    var testAssemblies = GetFiles($"{_solutionDir}/tests/**/*.Tests.Integration.csproj");
    if(testAssemblies.Count == 0)
    {
        Information("No tests found");
        return;
    }

    var settings = new DotNetCoreTestSettings()
    {
        Configuration = configuration,
        NoBuild = true,
        Logger = "console;verbosity=normal"
    };

    foreach(var project in testAssemblies)
    {
        DotNetCoreTest(project.FullPath, settings);
    }
});


Task("Publish")
    .Does(() => 
{
    var outputArtifactDir = _artifactDir + Directory("PlayLingua.WebApi");

    EnsureDirectoryExists(outputArtifactDir);
    CleanDirectory(outputArtifactDir);

    var settings = new DotNetCorePublishSettings
                       {
                           Configuration   = configuration,
                           OutputDirectory = outputArtifactDir
                       };

    DotNetCorePublish(_mainProjDir, settings);
});

Task("Docker-Build")
    .IsDependentOn("Publish")
    .Does(() => {

    string containerTag = "playlingua-api";

    string datePart = DateTime.Now.ToString("yyyMMddHHmmss");
    Console.WriteLine(datePart);
    containerTag = $"playlingua-api:0.0.{datePart}";
    
    DockerBuild(new DockerImageBuildSettings(){
        File = "./PlayLingua.WebApi/Dockerfile",
        Tag = new [] { 
            "playlingua-api",
            containerTag 
        }
    }, "./artifact/PlayLingua.WebApi" );

});

Task("Docker-Compose-Up")
    .Does(() => 
{
    DockerComposeUp(new DockerComposeUpSettings() 
    {
        Files = new [] { "docker-compose.yml"},
        DetachedMode = true
    });
});

//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("Default")
    .IsDependentOn("Build")
    .IsDependentOn("Run-Unit-Tests")
    .IsDependentOn("Publish");

Task("bd")
    .IsDependentOn("Build")
    .IsDependentOn("Run-Unit-Tests")
    .IsDependentOn("Run-Integration-Tests")
    .IsDependentOn("Publish")
    .IsDependentOn("Docker-Build")
    .IsDependentOn("Docker-Compose-Up");

Task("bdq")
    .IsDependentOn("Build")
    .IsDependentOn("Publish")
    .IsDependentOn("Docker-Build")
    .IsDependentOn("Docker-Compose-Up");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);