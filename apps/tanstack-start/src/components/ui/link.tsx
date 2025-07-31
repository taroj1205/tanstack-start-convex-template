import { Link as TanstackLink } from "@tanstack/react-router";
import { Link as YamadaLink } from "@yamada-ui/react";
import type { FC } from "react";
import type { FileRouteTypes } from "@/routeTree.gen";

export type LinkProps = Omit<React.ComponentProps<typeof YamadaLink>, "href"> &
  React.ComponentProps<typeof TanstackLink> & {
    to: FileRouteTypes["to"];
  };

export const Link: FC<LinkProps> = ({ children, ...props }) => {
  return (
    <YamadaLink as={TanstackLink} {...props}>
      {children}
    </YamadaLink>
  );
};
