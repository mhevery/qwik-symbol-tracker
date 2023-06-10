# TODO

- [ ] Have service worker fire an event every time there is a cache miss.
- [ ] Send cache miss events to the qwiksand server.
- [ ] Can the QSymbol event to have requesting Symbol, so that we can create chains of requests?

# Thoughts

- For a given route (not URL) we should have the same set of symbols.
  - The implication is that we need to send route regexp to the client so that we can correctly corelate the symbols with route.

# Open Questions

- How do we decide which symbol is part of route and which is part of layout?
