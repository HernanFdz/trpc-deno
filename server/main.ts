import cors from "cors";
import EventEmitter, { on } from "node:events";

import { initTRPC } from "@trpc/server";

const t = initTRPC.create({});

const ee = new EventEmitter();

const eventName = "event-name";

export const appRouter = t.router({
    test: t.procedure.mutation(() => {
        console.log("test mutation running...");
        ee.emit(eventName, Math.random().toString());
    }),

    onTest: t.procedure.subscription(async function* (opts) {
        for await (
            const [data] of on(ee, eventName, {
                signal: opts.signal,
            })
        ) {
            console.log("test subscription listener received:", data);

            yield data;
        }
    }),
});

export type AppRouter = typeof appRouter;

import { createHTTPHandler } from "@trpc/server/adapters/standalone";

import { createServer } from "node:http";

const handler = createHTTPHandler({
    router: appRouter,
    middleware: cors(),
});

const server = createServer(handler);

server.listen(3001);
