FROM node:14-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY frontend/package.json ./package.json
COPY frontend/package-lock.json ./package-lock.json
RUN npm install -g npm && npm install --production

COPY frontend .

RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000
