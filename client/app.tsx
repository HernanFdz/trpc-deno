import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  httpBatchLink,
  loggerLink,
  splitLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";

import { trpc } from "./trpc";

import { View } from "./view";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink(),

        splitLink({
          // uses the httpSubscriptionLink for subscriptions
          condition: (op) => op.type === "subscription",

          true: unstable_httpSubscriptionLink({
            url: "http://localhost:3001",
          }),

          false: httpBatchLink({
            url: `http://localhost:3001`,
          }),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <View />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
