# Change Log
All notable changes to this project will be documented in this file.

## 0.0.1 - 2015-10-05
### Added
- Add the `/schema` middleware to get the GraphQL schema
- Add the GraphiQL web interface in the `ql` subdirectory of the server
- Add gulp tasks to clean and to prepare the build directory

### Changed
- Remove webpack to generate the server code and replace with babel to generate es5 code
- Rename gulp tasks to follow a naming convention "system:function"

## Initial import in master - 2015-10-04
### Added
- Skeleton project using the [fortruce/relay-skeleton](https://github.com/fortruce/relay-skeleton) project
- README.md file to describe the project and prepare a credit page
- prepare CHANGELOG.md file following the format described [here](http://keepachangelog.com/)
- .gitignore file for this file organization
