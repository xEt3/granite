# Use node/nginx image
FROM smebberson/alpine-nginx:3.0.0

ENV NODE_VERSION=v8.9.4 NPM_VERSION=5.6

RUN echo "http://dl-4.alpinelinux.org/alpine/v3.2/main" >> /etc/apk/repositories && \
    apk add --update git curl make gcc g++ python linux-headers libgcc libstdc++ binutils-gold && \
    curl -sSL https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}.tar.gz | tar -xz && \
    cd /node-${NODE_VERSION} && \
    ./configure --prefix=/usr --without-snapshot && \
    make -j$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) && \
    make install && \
    cd / && \
    npm install -g npm@${NPM_VERSION} && \
    apk del gcc g++ linux-headers binutils-gold && \
    rm -rf /node-${NODE_VERSION} /usr/include \
    /usr/share/man /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp \
    /usr/lib/node_modules/npm/man /usr/lib/node_modules/npm/doc /usr/lib/node_modules/npm/html

RUN apk add --update alpine-sdk

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app
RUN npm --version
RUN node --version

# Using your ex-girlfriend to hook you up with this hot mama
RUN npm install -g yarn bower

# Install dependencies
RUN yarn install
RUN bower install --allow-root
RUN yarn global add ember-cli

# Build application
RUN node_modules/ember-cli/bin/ember build --environment=production
# Move app
RUN cp dist/* /usr/html/

EXPOSE 80
