FROM node:20-alpine

COPY Dockerfiles/killer.sh $HOME
WORKDIR $HOME
RUN npm install -g typescript

CMD tsc solution.ts; sh kill.sh node solution.js