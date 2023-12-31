## What's this?

So I've been thinking about building a toy RCE since august. I experimented with different things here and there, and this is
what I'm building right now. This repo contains the API, and I moved the code execution engine to another repo and rewrote it in rust. You can check out the code [here](https://github.com/KhachikAstoyan/toy-rce-executor).

TODO

- [x] Possible rewrite the code execution part in rust and leverage multithreading
- [ ] Add db stuff (in progress)
- [ ] Implement basic auth
- [ ] Add more robust error handling
- [ ] Add the ability to add coding problems and check user input against pre-made test cases

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

### 4. Clone the executor's repo

You can skip this step for now because the api doesn't implement anything related to code execution yet. However, the executor's code is [here](https://github.com/KhachikAstoyan/toy-rce-executor). You can find detailed instructions on how to set it up there.

### 4. Run the server and enjoy!

```
npm run dev
```
