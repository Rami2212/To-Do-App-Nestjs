FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package.json bun.lockb ./

RUN bun install --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["bun", "run", "dist/main.js"]