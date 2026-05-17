import { prisma } from "@repo/db/client";
import { Elysia } from "elysia";
import { UserAuth } from "./module/auth";
import { UserMiddleware } from "./config/middleware";
import { project } from "./module/project";
import { video } from "./module/video";
import { subtitle } from "./module/subtitle-track";
import { segments } from "./module/subtitle-segments";
import { renderJob } from "./module/render";


const app = new Elysia({prefix : "/api/v1"})
  .use(UserAuth)
  .use(project)
  .use(video)
  .use(subtitle)
  .use(segments)
  .use(renderJob)
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
