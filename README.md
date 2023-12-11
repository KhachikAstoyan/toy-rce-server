## What's this?

So I've been thinking about building a toy RCE since august. I experimented with different things here and there, and this is
what I'm building right now

TODO

- [x] Make it run in docker containers
- [x] Use alpine images for smaller size
- [ ] Possibly stream the output?
- [x] Kill the container if it's running for more than 10 seconds. Right now you're only killing the process that's creating the container, not the container itself

## How to run?

### 1. Clone the repo

```
git@github.com:KhachikAstoyan/toy-rce-server.git
```

### 2. Install dependencies

You can use any package manager for this

```
npm install
```

### 3. Install docker

You can follow [this](https://docs.docker.com/engine/install/) guide if you don't already have it installed

### 3. Create docker images

Run the following script, which creates the docker images for different languages automatically. (The ouput might not be pretty, still working on this)

```
npm run build-images
```

### 4. Run the server and enjoy!

```
npm run dev
```
