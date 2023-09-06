import { getInput } from '@actions/core';
import { request, gql, GraphQLClient } from 'graphql-request'

const token = getInput('token');
const body = getInput('body');
const discussionId = getInput('discussion-id');
const gqlClientMutationId = getInput('gql-client-mutation-id');
    
console.log(`Token: ${token}`);
console.log(`Comment Body: "${body}"`);
console.log(`Discussion Topic ID: "${discussionId}"`);
console.log(`GraphQL Client Mutation ID: "${gqlClientMutationId}"`);

const endpoint = 'https://api.github.com/graphql'

const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
})

const mutation = gql`mutation addDiscussionComment { addDiscussionComment( input: { body: ${body}, discussionId: ${discussionId}, clientMutationId: ${gqlClientMutationId} }) { clientMutationId comment { id body } } }`

const data = async() => {
   const res = await client.request(mutation, {}, {})
   console.log(res)
   return res
} 

data();