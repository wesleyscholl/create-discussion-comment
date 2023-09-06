import { getInput } from '@actions/core';
// @ts-expect-error
import { request, gql } from 'graphql-request'

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

const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  
  const mutation =  gql`mutation addDiscussionComment {
    addDiscussionComment(
      input: {body: ${body}, discussionId: ${discussionId}, clientMutationId: ${gqlClientMutationId}}
    ) {
      clientMutationId
      comment {
        id
        body
      }
    }
  }`

const data = async(params: any) => {
    await request({
        graphqlUrl,
        mutation,
        headers,
      })
}


console.log(data)