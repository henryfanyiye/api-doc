FROM node:12

WORKDIR /app

# 将项目添加到 docker容器中
COPY src ./src
COPY package.json .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN npm install --verbose --no-shrinkwrap --no-lockfile --registry=https://registry.npm.taobao.org
RUN npm install -g pm2@4.3.1 --verbose --no-shrinkwrap --no-lockfile --registry=https://registry.npm.taobao.org
RUN pm2 install typescript

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

EXPOSE 3000
CMD NODE_ENV=production pm2-runtime start src/main.ts
