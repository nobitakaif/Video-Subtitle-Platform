
import { treaty } from "@elysiajs/eden"
import { App } from "@repo/http-elysia/app"

export const client = treaty<App>("localhost:8000", {
  fetch : {
    credentials : "include"
  }
})