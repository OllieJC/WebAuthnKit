# Yubico WebAuthn Starter Kit

The WebAuthn Starter Kit is an Authentication and Authorization turnkey solution applying the best practices for strong authentication while providing ways to automate deployment of a serverless cloud-first solution that is repeatable, modularized, and scalable. 
 
![WebAuthn Kit Architecture Diagram](./assets/architectural-diagram.svg)

## How it works 🔧 ##   

The starter kit solution utilizes Amazon Cognito User Pools as an identity provider with a custom User Pool Workflow consisting of four AWS Lambda functions, a WebAuthn Lambda function, and an Amazon API Gateway endpoint, providing registration, authentication, and authorization for an identifier-first type flow.

## Deliverable 📬 ##

The solution will be provided as an Amazon SAM template that includes the creation of a Amazon Cognito User Pool, coded AWS Lambda functions, an Amazon Aurora database, an Amazon API Gateway endpoint, and necessary permissions to create, execute, and delete these resources in your own AWS account.

## Backend Resources ##

These resources will be created, configured, and deployed in your own AWS environment using the provided [SAM template](https://github.com/Yubico/WebAuthnKit/blob/master/backend/template.yaml). These services provide registration, authentication, WebAuthn Relying Party, and OPEN ID Connect provider solutions.

✅  One Amazon Cognito User Pool.
<details><summary>Cognito User Pools as an Identity Provider</summary><p>

## About Cognito User Pools ##

Amazon Cognito User Pools is a full-featured user directory managed AWS service that handles user registration, authentication, and account recovery. Amazon Cognito user pools implements ID, Access, and Refresh Tokens as defined by the OpenID Connect (OIDC) open standard.

Note :book: : User Pools provided tokens can be used to obtain temporary AWS credentials—with permissions you define—to access other AWS services directly or resources through Amazon API Gateway using Amazon Cognito Federated Identities (Identity Pool). 

The WebAuthn Starter Kit relies on Cognito User Pools to store user information and handle the custom registration and authentication flow. The kit can be used to leverage Cognito Federated Identities (identity pool) for fine-grain user access to other AWS resources.
</p>
</details>
</p>

✅  Four AWS Lambda Functions used as custom triggers with Cognito User Pool.

✅  One AWS Lambda Function (Java) as the WebAuthn Relying Party library - (IN DEVELOPMENT).

✅  One Amazon RDS Database - Aurora Serverless (MySQL compatible database used to store user credential attributes.

✅  One Amazon API Gateway as our RESTful API regional endpoint.

## Backend

Deploy the backend as outlined in [backend](./backend/README.md).

Once you deploy the backend, you can setup one of the provided clients below.

## Clients ##

Once you build and deploy the backend, you can use one of the clients below to connect into the backend.

[Web Client (React)](https://github.com/yubico/WebAuthnKit/tree/master/clients/web/react)

[iOS Client (Swift)](https://github.com/Yubico/WebAuthnKit/tree/master/clients/iOS)

### License Summary

This projects has not been licensed yet.