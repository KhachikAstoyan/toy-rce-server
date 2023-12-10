FROM alpine:latest
WORKDIR $HOME
RUN apk add --no-cache g++ musl-dev
CMD g++ -o solution solution.cpp; ./solution