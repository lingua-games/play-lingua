## How pipelines are working

### We have 3 different pipelines

#### [Frontend](./angular.yml)

Runs only if any change apply to `./client` folder in a feature branch.

#### [Backend](./dotnet-core.yml)

Runs only if any change apply to `./server` folder in a feature branch.

#### Master (Not created yet)

Runs when any branch merge to `Master` branch. This pipeline is responsible to

1. Integrate both front-end and backend and run e2e and integration tests
2. Build both front-end and backend and make a container with the result (Create a deployable container)
3. deploye the container into production/canary/etc

#### Merge rules

Front-end and backend pipelines runs only of the branch name start with `feature/` prefix, Ex `feature/improvement-in-foo-and-baar`
Each merge to `Master` branch needs at least one success build.
