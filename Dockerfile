FROM alpine

LABEL "com.github.actions.name"="Create Discussion Comment Github Action"
LABEL "com.github.actions.description"="Create Comments on Exsiting GitHub Discussions using GitHub Actions"
LABEL "com.github.actions.icon"="message-square"
LABEL "com.github.actions.color"="green"

LABEL "repository"="https://github.com/wesleyscholl/create-discussion-comment"
LABEL "homepage"="https://github.com/wesleyscholl/create-discussion-comment"
LABEL "maintainer"="Wesley Scholl <wscholl@totalwine.com>"

RUN apk update && apk add --no-cache curl ca-certificates
RUN chmod +x entrypoint.sh
ADD *.sh /
ENTRYPOINT ["/entrypoint.sh"]
CMD ["--help"]