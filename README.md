# TypeScript LocalStack Lambda Sample Project

## Introduction

This is a sample project to show how to integrate TypeScript, Jest, Localstack, Serverless Framework, and CircleCI together to achieve a relatively seamless AWS lambda development workflow locally.  

## Stacks Used

### Development

- TypeScript: To write the code more fluently.
- Webpack: To bundle third-party libraries and transpile TypeScript to JavaScript for Node.js 10.X support.
- ESLint + Prettier: To check and format code for avoiding careless mistakes.

### Test

- Jest: To write, run test code and collect results.
- Localstack: To emulate AWS services i.e. S3, IAM, CloudFront locally.
- Docker: To provide an environment with Localstack prepared.
- Serverless: To deploy code onto Localstack.
- CircleCI: To perform online CI.

## Note

- Babel is not introduced since tools such as ts-node and ts-jest have already covered many features of Babel.
- The deployment to staging or production environment is not covered in this sample project. People can consider [Terraform](https://www.terraform.io/) or [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html) for such purpose.

## LICENSE

Apache License 2.0
