import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ColorModeScript, UIProvider, VStack } from "@yamada-ui/react";
import { defaultConfig, defaultTheme } from "theme";
import Loader from "@/components/loader";
import Header from "../components/header";

export interface RouterAppContext {
  queryClient: QueryClient;
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

  component: RootDocument,
});

function RootDocument() {
  const isFetching = useRouterState({ select: (s) => s.isLoading });

  return (
    <html className="dark" lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ColorModeScript initialColorMode="dark" />
        <UIProvider config={defaultConfig} theme={defaultTheme}>
          <VStack>
            <Header />
            {isFetching ? <Loader /> : <Outlet />}
          </VStack>
        </UIProvider>
        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
