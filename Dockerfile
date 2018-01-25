# Use node/nginx image
FROM smebberson/alpine-nginx-nodejs

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

RUN apk update
RUN apk add yarn

# Install dependencies
RUN yarn install

# Build application
RUN ember build --environment=production
# Move app
RUN cp dist/* /usr/html/

EXPOSE 80
