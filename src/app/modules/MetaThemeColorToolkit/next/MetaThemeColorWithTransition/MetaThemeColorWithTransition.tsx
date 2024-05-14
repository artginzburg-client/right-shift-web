'use client';
import Head from 'next/head';
import { memo } from 'react';

import { useSetMetaThemeColorWithTransition } from '../../hooks/useSetMetaThemeColorWithTransition';
import dynamic from 'next/dynamic';

type UseSetMetaThemeColorWithTransitionParams = Parameters<
  typeof useSetMetaThemeColorWithTransition
>;

/** {@link useSetMetaThemeColorWithTransition} wrapped into `React.memo` to prevent re-renders of the parent component. */
// export const MetaThemeColorWithTransition = memo(MetaThemeColorWithTransitionComponent);

export default function MetaThemeColorWithTransitionComponent({
  colors,
  trigger,
  transitionDuration,
  transitionResolution,
}: {
  colors: UseSetMetaThemeColorWithTransitionParams[0];
  trigger: UseSetMetaThemeColorWithTransitionParams[1];
  transitionDuration: UseSetMetaThemeColorWithTransitionParams[2];
  transitionResolution?: UseSetMetaThemeColorWithTransitionParams[3];
}) {
  const metaThemeColor = useSetMetaThemeColorWithTransition(
    colors,
    trigger,
    transitionDuration,
    transitionResolution,
  );

  return (
    <head>
      <meta key={'meta-theme-lol'} name="theme-color" content={metaThemeColor} />
    </head>
  );
}
