##### Build container webstore START

# Lightweight environment with node pre-installed
FROM arm64v8/node AS builder

# Directory to work in the container
WORKDIR /app

# Copy package.json to the root of the WORKDIR
COPY package.json ./

# Copy all files different to local machine to container
# The way caching works, any changes to any files will force everything under it to
#   rebuild all subsequent steps
COPY . .

# Run npm install inside container
# --legacy-peer-deps This line is currently required for the dependencies to install
# Should be tested once in a while and removed when possible, as package maintainers
#   updated their dependencies to the new automated system.
RUN if [[ $ENV == "prod" ]] ;                                                    \
    then npm install --legacy-peer-deps --loglevel ${LOG_LEVEL} --only=prod;    \
    else npm install --legacy-peer-deps --loglevel ${LOG_LEVEL};                \
    fi

# Execute this command in the docker container
RUN npm run build

###### Build container END

###### runtime environment START

# Lightweight environment with node nginx-installed
FROM arm64v8/node AS runner

# Directory to work in the container
WORKDIR /app

# Copy build files to nginx container
COPY --from=builder /app/build/ /app/src
COPY package.json ./
COPY ./docs/population-script.sql /app/docs/population-script.sql
# https://pumpingco.de/blog/environment-variables-angular-docker/
# When the container starts, replace the env.js with values from environment variables via package.json scripts
RUN npm install
RUN ls -a
# Execute nginx on container to launch application after setting angular ENVs
CMD ["node", "/app/src/app.js"]

# Old: had some problems with the typescript compiler using the following:
# FROM arm64v8/node

# # Create app directory
# WORKDIR /app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./
# COPY tsconfig*.json ./
# copy docker-compile-fix.ts ./

# RUN npm install
# RUN npm install typescript -g
# RUN tsc
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# EXPOSE 4200
# CMD [ "npx", "ts-node", "./src/app.ts" ]
