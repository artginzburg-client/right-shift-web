'use client';

export const fetchRoute = ((input, init) => fetch(`${window.location.origin}${input}`, init)) as (
  // Plain string: the API routes live in private folders in the static snapshot,
  // so they are absent from the generated route types.
  input: string,
  init: Parameters<typeof fetch>[1],
) => ReturnType<typeof fetch>;
