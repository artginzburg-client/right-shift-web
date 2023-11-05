export const navigationSections = ['work', 'calc', 'contact', 'about'] as const;
export type NavigationSection = (typeof navigationSections)[number];
