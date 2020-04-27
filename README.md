# Road Planning functions
A number of shared functions between the Road Planning tools. Initially developed for the Haiti project.

## Dependencies
Since this project is meant to be installed as a [git submodule](https://www.atlassian.com/git/tutorials/git-submodule) dependencies will have to be installed on a need basis depending on the files being used.

`instance/improvements.js`
`instance/meta.js`
- lodash

`utils/s3.js`
`utils/sqs.js`
- aws-sdk

### Development Data
Most of the functions in this repo are agnostic and can be used by different Road Planning tools.
However the model configurations/data contained in the `instance` folder is specific to the Haiti case.

With the production data changing frequently (as new indicators become available) it is hard to keep tests consistent and data reasonably manageable (production data can get quite large). Therefore the instance files may export different values for production and development environment.
Production data is used whenever on of the following is valid:
- Env variable `NODE_ENV` is set to `production`
- Env variable `USE_PROD_DATA` is set to `true`. This is used to test production data in a development environment.
