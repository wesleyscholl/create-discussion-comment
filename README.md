# Create Discussion Comment ⌨️💬✅

Create Comments on Exsiting GitHub Discussions using GitHub Actions

 [![Tests](https://img.shields.io/badge/Tests-Pass-gree.svg?logo=github&colorA=24292e)](https://github.com/wesleyscholl/create-discussion-comment) 
 
 [![Code Style: prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg?logo=prettier&colorA=24292e&logoColor=white)](https://github.com/prettier/prettier) 
 
 [![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Create%20Discussion%20Comment-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=github)](https://github.com/marketplace/actions/)




## About

This action allows you to add comments to GitHub Discussions using GitHub Actions.

## Usage

In your workflow, to create a new comment on a discussion topic, include a step like this:


```yaml
    - name: Run create-discussion-comment
      uses: wesleyscholl/create-discussion-comment@v1.0.x
      id: create-comment
      with:
        token: ${{ secrets.DISCUSS_TOKEN }}
        body: "This is a test comment from a GitHub action"          
        discussion-id: 'D_kwdje64ife75s9o'
        client-mutation-id: '1234'
```
*Ensure you provide the discussion ID, this can be found using the GitHub GraphQL Explorer. (See below)*


## Action Inputs

| Name | Description | Requried? | Default |
| --- | --- | --- | --- |
| `token` | A GitHub PAT is required. Ensure the PAT has `discussion: write` and `public_repo: read` for public repos and `repo: write` for private repositories. See more details about tokens here [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). | **Yes** | N/A | 
| `body` | The contents of the comment in string format. | **No** | "Comment provided by GitHub Action create-discussion-comment" |
| `discussion-id` | The node ID of the discussion to comment on. This can be found using the GitHub GraphQL explorer, more details below. | **Yes** | N/A |
| `client-mutation-id` | A unique identifier for the client performing the mutation. | **No** | "1234" |
|`replyToId` | The node ID of the discussion comment to reply to. If absent, the created comment will be a top-level comment. | **No** | N/A |


## Action Outputs

| Name | Description | Data Model |
| --- | --- | --- |
| `clientMutationId` | The unique identifier provided as an input. | See below |
| `comment` | The discussion comment that was created. | See below |

### Response

```json
{"data":
{"addDiscussionComment":
{"clientMutationId":"1234",
"comment":{
    "id":"DC_kwdje64ife75s9o",
    "body":"This is a test comment from a GitHub action"
    }}}}
```

## Obtaining the `discussion-id`

You can find your `discussion-id` and using [GitHub's GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer). Replace `<REPO_NAME>` and `<REPO_OWNER>` to find the discussion id you wish to comment on.
### GraphQL Query
```graphql
query {
  repository(owner: "<REPO_OWNER>`", name: "cohere") {
    discussions(first: 5) {
      edges {
        node {
          # The value below is the discussion-id
          id
          title
          category {
            id
            name
          }
          body
          id
        }
      }
    }
  }
}
```

### GraphQL Output

```json
{
  "data": {
    "repository": {
      "discussions": {
        "edges": [
          {
            "node": {
              // This is the discussion-id  
              "id": "D_kwdje64ife75s9o",
              "title": "Test Topic Title - Insert Question Here",
              "category": {
                "id": "DIC_kwSWEbhiT23EW-rr",
                "name": "Q&A"
              },
              "body": "This is the body of the discussion topic"
            }
          }
        ]
      }
    }
  }
}
```

## Example

Example [workflow](https://github.com/wesleyscholl/create-discussion-comment/blob/main/.github/workflows/create-comment.yml) can be found here.

## Credits

### Inspired by:
- [peter-evans/create-or-update-comment](https://github.com/peter-evans/create-or-update-comment)
- [abirismyname/create-discussion](https://github.com/abirismyname/create-discussion)
