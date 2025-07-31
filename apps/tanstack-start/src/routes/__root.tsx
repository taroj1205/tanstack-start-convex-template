import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouteContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getWebRequest } from "@tanstack/react-start/server";
import { ColorModeScript, UIProvider } from "@yamada-ui/react";
import type { ConvexReactClient } from "convex/react";
import { defaultConfig, defaultTheme } from "theme";
import Loader from "@/components/loader";
import { authClient } from "@/lib/auth-client";
import { fetchSession, getCookieName } from "@/lib/server-auth-utils";
import Header from "../components/header";

const fetchAuth = createServerFn({ method: "GET" }).handler(async () => {
  const sessionCookieName = await getCookieName();
  const token = getCookie(sessionCookieName);
  const request = getWebRequest();
  const { session } = await fetchSession(request);
  return {
    userId: session?.user.id,
    token,
  };
});

export interface RouterAppContext {
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "My App",
      },
    ],
  }),
  beforeLoad: async (ctx) => {
    const auth = await fetchAuth();
    const { userId, token } = auth;

    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return { userId, token };
  },
  component: RootDocument,
});

function RootDocument() {
  const context = useRouteContext({ from: Route.id });
  const isFetching = useRouterState({ select: (s) => s.isLoading });

  return (
    <ConvexBetterAuthProvider
      authClient={authClient}
      client={context.convexClient}
    >
      <html className="dark" lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <ColorModeScript initialColorMode="dark" />
          <UIProvider config={defaultConfig} theme={defaultTheme}>
            <Header />
            {isFetching ? <Loader /> : <Outlet />}
          </UIProvider>
          <TanStackRouterDevtools position="bottom-left" />
          <Scripts />
        </body>
      </html>
    </ConvexBetterAuthProvider>
  );
}
