# Welcome to Playinglingua <sup><sup>[Live demo](https://playinglingua.com/)</sup></sup> 
PlayingLingua is a free, non-commercial, open source and cross-platform application which is developed to help people to learn new languages.
In PlayingLingua, you play games, earn scores and learn new words. You can either play your own words or other players words.
You can also contribute in the word pool or even project code.

### Table of content
* [Builds](#Builds)
* [Setup front-end](#front-end)
* [Setup back-end](#back-end)
* [Pipelines](#Pipelines)
* [Donate](#Donate)

## Builds
| Production        | Canary           | Backend  | Front-end  |
| ------------- | ------------- | ----- | ----- | 
| [![Deploy to production](https://github.com/lingua-games/play-lingua/actions/workflows/deploy-eu.yml/badge.svg)](https://github.com/lingua-games/play-lingua/actions/workflows/deploy-eu.yml)      | Comming soon | [![.NET Core](https://github.com/lingua-games/play-lingua/actions/workflows/dotnet-core.yml/badge.svg)](https://github.com/lingua-games/play-lingua/actions/workflows/dotnet-core.yml) | [![Angular](https://github.com/lingua-games/play-lingua/actions/workflows/Angular.yml/badge.svg)](https://github.com/lingua-games/play-lingua/actions/workflows/Angular.yml) | 

## Front-end
#### Run and serve
1. Install the [latest node version](https://nodejs.org/en/)
2. Open `cmd` and navigate to [client](./client) directory
3. Execute `npm install` and then `npm start`
4. Browse to [localhost:4000](http://localhost:4000/)

#### Run end-to-end tests

End-to-End testing is a methodology used to test an application from a user's perspective. The tests ensure the application performs as expected from start to finish. As the tests run, you will see the browser interaction just as a user would use your application. Angular end to end tests are powered by a framework called Protractor.

Note. The End-to-End test for this project has not implemented yet.

## Back-end

Install ``Dotnet core SDK > 3`` and ``Dotnet core runtime > 3``\

Navigate to ``./server``

Run ``dotnet restore`` and ``dotnet run``

## Pipelines

There are 4 pipelines

1. **Front-end** responsible to build front-end part (Angular) and trigger only when any change push into ``./client`` directory. [The config file](./.github/workflows/Angular.yml)
2. **Backend** responsible to build backend part (.Net core) and trigger only when any change push into ``./server`` directory. [The config file](./.github/workflows/dotnet-core.yml)
3. **Canary** responsible to build develop branch on push/merge action and deploy integration of front-end and backend into [Canary](https://canary.playinglingua.com) environment. [The config file](./.github/workflows/canary.yml)
4. **Production** responsible to build and deploy [Canary](https://canary.playinglingua.com) version into [Production](https://playinglingua.com/). [The config file](./.github/workflows/deploy-eu.yml)

 
## Donate
As well as we are paying a lot of expenses for managing our servers, backup, domain and etc , your donation is so valuable for us :)


My crypto wallet: 

![alt text](./client/src/assets/about-us/crypto-wallet.png)

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

Crypto wallet: **3M6w19ctFyuQGyppX7j7ouqZM96ze3ZEma**

