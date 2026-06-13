import { prisma } from "@repo/db/client";
import { Elysia } from "elysia";
import { UserAuth } from "./module/auth";
import { UserMiddleware } from "./config/middleware";
import { project } from "./module/project";
import { video } from "./module/video";
import { subtitle } from "./module/subtitle-track";
import { segments } from "./module/subtitle-segments";
import { renderJob } from "./module/render";
import { videoUpload } from "./module/upload-video";
import { cors } from '@elysiajs/cors'

export const app = new Elysia({prefix : "/api/v1"})
  .use(cors({
    origin : ["http://localhost:3000"]
  }))
  .use(UserAuth)
  .use(project)
  .use(video)
  .use(subtitle)
  .use(segments)
  .use(renderJob)
  .use(videoUpload)
  .listen(8000);

export type App = typeof app
