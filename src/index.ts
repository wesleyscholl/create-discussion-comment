import { getInput } from '@actions/core';

const token = getInput('token');
const graphqlUrl = getInput('graphql-url');
const body = getInput('body');
const discussionId = getInput('discussion-id');
const gqlClientMutationId = getInput('gql-client-mutation-id');
    
console.log(`Token: ${token}!`);
console.log(`GraphQL URL: ${graphqlUrl}!`);
console.log(`Comment Body: ${body}!`);
console.log(`Discussion Topic ID: ${discussionId}!`);
console.log(`GraphQL Client Mutation ID: ${gqlClientMutationId}!`);