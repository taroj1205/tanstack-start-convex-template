import { Link } from "@tanstack/react-router";
import {
  Container,
  HStack,
  List,
  ListItem,
  Separator,
  VStack,
} from "@yamada-ui/react";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/todos", label: "Todos" },
  ];

  return (
    <VStack
      as="header"
      backdropBlur="sm"
      bg={["whiteAlpha.50", "blackAlpha.50"]}
      gap="0"
      position="fixed"
      top="0"
    >
      <Container as="nav" gap="0">
        <HStack as={List}>
          {links.map(({ to, label }) => {
            return (
              <ListItem key={to}>
                <Link to={to}>{label}</Link>
              </ListItem>
            );
          })}
        </HStack>
      </Container>
      <Separator />
    </VStack>
  );
}
