FROM alpine:latest

WORKDIR $HOME

RUN apk add --no-cache gcc musl-dev

CMD gcc -o solution solution.c; ./solution