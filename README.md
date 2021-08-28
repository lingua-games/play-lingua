# Welcome to Playinglingua <sup><sup>[Live demo](https://playinglingua.com/)</sup></sup> 
Want to see the un-released features? <sup><sup>[Visit canary version](http://canary.playinglingua.com/)</sup></sup>

PlayingLingua is a free, non-commercial, open source and cross-platform application which is developed to help people to learn new languages.
In PlayingLingua, you play games, earn scores and learn new words. You can either play your own words or other players words.
You can also contribute in the word pool or even project code.

### Table of content
* [Builds](#Builds)
* [Setup front-end](#front-end)
* [Setup back-end](#back-end)
* [Pipelines](#Pipelines)
* [Branching strategy](#Branching-strategy)
* [More](#More)
* [Donate](#Donate)

## Builds
| Production        | Canary           | Backend  | Front-end  |
| ------------- | ------------- | ----- | ----- | 
| [![Deploy to production](https://github.com/lingua-games/play-lingua/actions/workflows/deploy-eu.yml/badge.svg)](https://github.com/lingua-games/play-lingua/actions/workflows/deploy-eu.yml)      | [![Deploy to Canary](https://github.com/lingua-games/play-lingua/actions/workflows/deploy-canary.yml/badge.svg)](https://github.com/lingua-games/play-lingua/actions/workflows/deploy-canary.yml) | [![.NET Core](https://github.com/lingua-games/play-lingua/actions/workflows/dotnet-core.yml/badge.svg)](https://github.com/lingua-games/play-lingua/actions/workflows/dotnet-core.yml) | [![Angular](https://github.com/lingua-games/play-lingua/actions/workflows/Angular.yml/badge.svg)](https://github.com/lingua-games/play-lingua/actions/workflows/Angular.yml) | 

## Front-end
#### Run and serve 
1. Install the [latest node version](https://nodejs.org/en/)
2. Open `cmd` and navigate to `./client` directory
3. Run `npm install`
4. Run `npm start`
5. Browse to [localhost:4000](http://localhost:4000/)

#### Unit tests
run ``npm run test``
#### Integration tests
Not implemented yet.
#### End-to-end tests
1. make sure app is running i.e ``npm start``
2. run ``npm run e2e`` 

**note: Running e2e does not need any backend run.** 


## Back-end

1. Install ``Dotnet core SDK > 3`` and ``Dotnet core runtime > 3``
2. Setup environments, the structure of secret.json file is as below, please fill the values if you want to use that service otherwise just leave it empty

```json
{
   "ConnectionStrings:playLinguaConnection": "Server=play-lingua.database.windows.net;Database=play-lingua;User Id=SQL SERVER USERNAME;password=SQL SERVER PASSWORD;",
   "secret": "",
   "hashKey": "FOR HASHING PASSWORDS, CAN BE ANY STRING",
   "email:username": "EMAIL USERNAME IN CASE OF SENDING INVITATION EMAIL",
   "email:password": "EMAIL PASSWORD IN CASE OF SENDING INVITATION EMAIL",
   "googleApiKey": "GOOGLE API KEY IN CASE OF DOWNLOADING SPEECHS"
   }
   ```
3. Navigate to ``./server``
4. Run ``dotnet restore`` and ``dotnet run``

## Database
The database of this project is SQL-Server, to set up and build database locally
1. Create a Database and name it `play-lingua`
2. Run [This query](./sql-srcipts/script2_createSchema.sql)
3. Setup connection string into ``secret.json`` of ``PlayLingua.Host`` project

## Pipelines

There are 4 pipelines

1. **Front-end** responsible to build front-end part (Angular) and trigger only when any change push into ``./client`` directory. [The config file](./.github/workflows/Angular.yml)
2. **Backend** responsible to build backend part (.Net core) and trigger only when any change push into ``./server`` directory. [The config file](./.github/workflows/dotnet-core.yml)
3. **Canary** responsible to build develop branch on push/merge action and deploy integration of front-end and backend into [Canary](https://canary.playinglingua.com) environment. [The config file](./.github/workflows/canary.yml)
4. **Production** responsible to build and deploy [Canary](https://canary.playinglingua.com) version into [Production](https://playinglingua.com/). [The config file](./.github/workflows/deploy-eu.yml)

## Branching-strategy
We organise branches with feature branch pattern i.e. 
1. **Master :** Production branch, always ready to deploy and having the latest stable changes which passed all the pipelines 
2. **Canary :** Canary branch, always ready to deploy on canary server. Same as production but in different url and always one version ahead of master
3. **feature/STORY NAME** normal branches which should always start with ``feature/`` keyword. 
## More
[Youtube channel](https://www.youtube.com/user/vbhostir/videos)
 
## Donate
As well as we are paying a lot of expenses for managing our servers, backup, domain and etc , your donation is so valuable for us :)


My crypto wallet: 

![alt text](./client/src/assets/about-us/crypto-wallet.png)


[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

Crypto wallet: **3M6w19ctFyuQGyppX7j7ouqZM96ze3ZEma**

