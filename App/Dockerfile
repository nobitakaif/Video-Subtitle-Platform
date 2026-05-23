FROM oven/bun:1

WORKDIR /usr/src/app


COPY ./packages ./packages
COPY ./bun.lock /usr/src/app/
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./apps/http-elysia ./apps/http-elysia

RUN bun install
RUN bun run db:generate

EXPOSE 8000

CMD [ "bun", "run", "start:http" ]