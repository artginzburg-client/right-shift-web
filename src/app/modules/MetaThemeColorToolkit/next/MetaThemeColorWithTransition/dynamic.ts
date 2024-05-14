import dynamic from 'next/dynamic';

export const DynamicMetaThemeColorTransition = dynamic(
  () => import('./MetaThemeColorWithTransition'),
);
