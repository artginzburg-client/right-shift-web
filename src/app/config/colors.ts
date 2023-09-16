export const colors = {
  /** Remember to fallback (to e.g. `rgb(255, 0, 0)`) */
  rainbow: `linear-gradient(
    ${0.25 + 0.08}turn,
    rgba(255, 0, 0, 1),
    rgba(201, 193, 0, 1),
    rgba(0, 255, 240, 1),
    rgba(5, 0, 255, 1)
  )`,
} as const;
