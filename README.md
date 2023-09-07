# Create Discussion Comment

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
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      id: create-comment
      with:
        discussion-id: 'D_kwdje64ife75s9o'
        client-mutation-id: '1234'
        token: ${{ GITHUB_TOKEN }}
        body: "This is a test comment from a GitHub action"          
```

## Inputs

The following inputs are _required_:

- `title`: The title of the discussion
- `body`: The body of the discussion
- `body-filepath`: The path to a file containing the body of the new discussion (takes precedence over `body`).**
- `repository-id`: The ID of the repository for the new discussion
- `category-id`: The ID of the category for the new discussion. 


## Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` (`issues: write`, `pull-requests: write`) or a `repo` scoped [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `repository` | The full name of the repository in which to create or update a comment. | Current repository |
| `issue-number` | The number of the issue or pull request in which to create a comment. | |
| `comment-id` | The id of the comment to update. | |
| `body` | The comment body. Cannot be used in conjunction with `body-path`. | |
| `body-path` | The path to a file containing the comment body. Cannot be used in conjunction with `body`. | |
| `edit-mode` | The mode when updating a comment, `replace` or `append`. | `append` |
| `append-separator` | The separator to use when appending to an existing comment. (`newline`, `space`, `none`) | `newline` |
| `reactions` | A comma or newline separated list of reactions to add to the comment. (`+1`, `-1`, `laugh`, `confused`, `heart`, `hooray`, `rocket`, `eyes`) | |
| `reactions-edit-mode` | The mode when updating comment reactions, `replace` or `append`. | `append` |


** If you are using `body-filepath` be sure to add a `actions/checkout` action before this action in the workflow to make sure the file exists in the action workspace.

### Obtaining the `repository-id` and `category-id`
You can find `repository-id` and `category-id` using [GitHub's GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer). Replace `<REPO_NAME>` and `<REPO_OWNER>` with the repo you want to update.
```graphql
query MyQuery {
  repository(name: "<REPO_NAME>", owner: "<REPO_OWNER>") {
    id
    discussionCategories(first: 10) {
      edges {
        node {
          id
          name
        }
        cursor
      }
    }
  }
}
```

## Outputs

This action provides the following outputs:

- `discussion-id`: ID of created discussion
- `discussion-url`: URL of created discussion

## Example

This repo contains an example [workflow](https://github.com/abirismyname/create-discussion/blob/main/.github/workflows/example.yml) that contains this action.

## Credits

### Inspired by:
- [peter-evans/create-or-update-comment](https://github.com/peter-evans/create-or-update-comment)
- [abirismyname/create-discussion](https://github.com/abirismyname/create-discussion)