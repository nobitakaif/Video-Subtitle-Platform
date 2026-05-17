import { t } from "elysia";

export namespace SegmentsModel {
    export const createSegmentsSchema = t.Object({
        trackId : t.String(),
        startTime : t.Number(),
        endTime : t.Numeric(),
        text : t.String()
    })
    export type CreateSegmentsSchema = typeof createSegmentsSchema.static
}