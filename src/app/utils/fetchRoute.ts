'use client';

export const fetchRoute = ((input, init) => fetch(`${window.location.origin}${input}`, init)) as (
  input: __next_route_internal_types__.StaticRoutes,
  init: Parameters<typeof fetch>[1],
) => ReturnType<typeof fetch>;
